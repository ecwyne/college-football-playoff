import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Template} from 'meteor/templating';
import {Router} from 'meteor/iron:router';
import {Session} from 'meteor/session';
import {Bowls} from '/imports/api/bowls/Bowls.js';
import _ from 'underscore';
import moment from 'moment';
import R from 'ramda';

const formatDateDep = new Tracker.Dependency();
Meteor.setInterval(() => formatDateDep.changed(), 1000 * 60);

Template.registerHelper('formatDate', function(){
	formatDateDep.depend();
	const date = _.find(arguments, _.isDate);
	const format = _.find(arguments, _.isString) || 'M/D/YY';
	const showFromNow = _.find(arguments, _.isBoolean) || false;
	let out = moment(date).format(format);
	if (showFromNow) {
		out += ' - ' + moment(date).fromNow();
	}
	return out;
});

Template.registerHelper('getStateVar', function(arg){
	const key = R.join.apply(R, ['', R.filter(R.is(String,), _.toArray(arguments))]);
	return Router.current().state.get(key);
});

Template.registerHelper('getSessionVar', function(arg){
	const key = R.join.apply(R, ['', R.filter(R.is(String,), _.toArray(arguments))]);
	return Session.get(key);
});

Template.registerHelper('toPairs', R.toPairs);

Template.registerHelper('getUsername', id => {
	const u = Meteor.users.findOne(id);
	return R.path(['profile', 'name'], u) || R.prop('username', u);
});

Template.registerHelper('scoreFor', (bowl, id) => {
	return bowl.scoreFor(id);
});

Template.registerHelper('getRankProp', (id, prop) => {
	return R.path(['rank', prop], Meteor.users.findOne(id));
});

Template.registerHelper('incompletePicks', () => {
	return Bowls.find().count() - R.pipe(
		R.map(R.pathOr(['nope'],['picks', Meteor.userId()])),
		R.filter(R.all(R.is(Number))),
		R.length
		)(Bowls.find().fetch()
	);
});

Template.registerHelper('pastDeadline', () => {
	return (new Date()) > (new Date(Meteor.settings.public.cutoff));
});

Template.registerHelper('getUser', id => {
	return Meteor.users.findOne(id);
});

Template.registerHelper('completeCount', id => {
	return R.pipe(
		R.map(R.pathOr(['nope'],['picks', id])),
		R.filter(R.all(R.is(Number))),
		R.length)(Bowls.find().fetch()
	);
});

Template.registerHelper('missingPicks', id => {
	const pipe = R.pipe(
		R.filter(e => R.complement(R.all(R.is(Number)))(e.picks[id] || ['none'])),
		R.map(R.prop('name')),
		R.join(',\n'));

	return pipe(Bowls.find().fetch());
})
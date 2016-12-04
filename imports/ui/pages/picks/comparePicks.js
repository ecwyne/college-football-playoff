import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {$} from 'meteor/jquery';
import R from 'ramda';

import './comparePicks.html';

Template.comparePicks.onRendered(() => {
	Session.setDefault('compare1', Meteor.userId());
	Session.setDefault('compare2', Meteor.users.findOne({'profile.done': true}, {sort: {'rank.rank': 1}})._id);
	const c1 = $('#compare1').select2({width: '250px'});
	const c2 = $('#compare2').select2({width: '250px'});
	c1.val(get('compare1')).trigger('change');
	c2.val(get('compare2')).trigger('change');
	c1.on('change', e => e.target.value && Session.set(e.currentTarget.id, e.target.value));
	c2.on('change', e => e.target.value && Session.set(e.currentTarget.id, e.target.value));
});

const get = key => Session.get(key);
const allNumbers = R.all(R.is(Number));
const gt = (arr = []) => R.gt(...arr);

Template.comparePicks.helpers({
	compareClass: function(){
		return gt(this.picks[get('compare1')]) == gt(this.picks[get('compare2')]) ? '' : 'info';
	},
	winnerName: function(id){
		if (!allNumbers(R.pathOr(['nope'], ['picks', id], this))) {
			return '';
		}
		return gt(this.picks[id]) ? this.teams[0].name : this.teams[1].name;
	},
	correctWinnerClass: function(id){
		if (!this.finished) {
			return 'label-default';
		}
		return gt(R.map(R.prop('score'), this.teams)) == gt(this.picks[id]) ? 'label-success' : 'label-danger';
	}
});

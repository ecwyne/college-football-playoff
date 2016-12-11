import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Bowls} from '/imports/api/bowls/Bowls.js';
import R from 'ramda';

import './viewGame.html';

Template.viewGame.helpers({
	neighborBowl: function(offset){
		const bowls = Bowls.find({}, {sort: {date: 1, name: 1}}).fetch();
		const index = bowls.map(R.prop('_id')).indexOf(this._id) + Number(offset);
		console.log(offset, index);
		return R.propOr(null, index, bowls);
	},
	pickCount: function(index){
		var compare = index == 0 ? R.gt : R.lt;
		var arr = [];
		Meteor.users.find({'profile.done': true}).forEach(u => arr.push(this.picks[u._id]));
		return arr.filter(e => compare.apply(R, e)).length;
	},
	avgScore: function(index){
		var sum = R.pipe(
			R.map(R.prop(index)),
			R.reduce(R.add, 0)
		);
		var arr = [];
		Meteor.users.find({'profile.done': true}).forEach(u => arr.push(this.picks[u._id]));
		return (sum(arr) / (Meteor.users.find({'profile.done': true}).count())).toFixed(1);
	},
	winningClass: function(userId){
		return R.path(['rank', 'rank'], Meteor.users.findOne(userId)) == 1 ? 'success' : '';
	}
});
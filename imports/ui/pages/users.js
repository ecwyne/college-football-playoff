import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import R from 'ramda';
import {Bowls} from '/imports/api/bowls/Bowls.js';

import './users.html';

Template.users.helpers({
	completeCount: id => {
		return R.pipe(
			R.map(R.pathOr(['nope'],['picks', id])),
			R.filter(R.all(R.is(Number))),
			R.length
		)(Bowls.find().fetch());
	}
});

Template.users.events({
	'click .glyphicon': function(e) {
		const {field} = e.currentTarget.dataset;
		Meteor.users.update(this._id, R.assocPath(['$set', 'profile.' + field], !this.profile[field], {}));
	}
});
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import moment from 'moment';

var dateDep = new Tracker.Dependency();

import './countdown.html';

Template.registerHelper('fromNow', () => {
	dateDep.depend();
	const {cutoff} = Meteor.settings.public;
	return moment(new Date(cutoff)).fromNow();
});

Meteor.setInterval(() => dateDep.changed(), 1000 * 60);
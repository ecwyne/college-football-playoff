import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import R from 'ramda';

import './barGraph.html';

Template.barGraph.helpers({
	topGenresChart: () => ({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: 'Points from First'
		},
		xAxis: {
			categories: R.map(R.path(['profile', 'name']), Meteor.users.find({'profile.done': true, 'rank.fromFirst': {$exists: true}}).fetch()),
			labels: {
				rotation: -45
			}
		},
		tooltip: {
			pointFormat: '<b>{point.y} pts</b>'
		},
		plotOptions: {

		},
		series: [{
			type: 'column',
			name: 'Points from First',
			data: R.map(e => [e.profile.name, e.rank.fromFirst], Meteor.users.find({'profile.done': true, 'rank.fromFirst': {$exists: true}}).fetch()),
			dataLabels: {
				enabled: true
			}
		}]
	})
});

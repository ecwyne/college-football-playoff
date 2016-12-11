import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Bowls} from '/imports/api/bowls/Bowls.js';
import {Router} from 'meteor/iron:router';
import R from 'ramda';

import './graphs.html';

Template.barGraph.helpers({
	barGraphData: () => ({
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

Template.rollingTotals.onCreated(() => {
	Router.current().state.setDefault('metric', 'Points Away From First Place');
	Meteor.call('rollingTotals', (err, data) => {
		Router.current().state.set('rollingTotalsData', data);
	});
});

const mapRanks = obj => {
	const rankedScores = R.sortBy(R.identity, R.values(obj));
	return R.map(val => rankedScores.indexOf(val) + 1, obj);
};

const mapFromFirst = obj => {
	const min = R.reduce(R.min, Infinity, R.values(obj));
	return R.map(val => val - min, obj);
};

const mappers = {
	'Points Away From First Place': mapFromFirst,
	Rank: mapRanks
};

Template.rollingTotals.events({
	'click .metricBtn': e => Router.current().state.set('metric', e.currentTarget.textContent)
});

Template.rollingTotals.helpers({
	activeMetric: metric => Router.current().state.equals('metric', metric) ? 'active' : '',
	rollingTotalsData: () => {
		const mapper = R.propOr(R.identity, Router.current().state.get('metric'), mappers);
		const data = R.map(mapper, Router.current().state.get('rollingTotalsData') || []);
		const categories = Bowls.find({}, {sort: {date: 1, name: 1}}).map(R.prop('name'));
		const series = R.sortBy(R.prop('name'), Meteor.users.find({'profile.done': true}).map(({_id, profile}) => {
			return {
				name: profile.name,
				data: data.map(R.prop(_id))
			};
		}));
		return {
			title: {
				text: 'Select a Metric Above',
				x: -20
			},
			xAxis: {
				categories
			},
			yAxis: {
				allowDecimals: false,
				title: {
					text: `${Router.current().state.get('metric')} (Lower is better)`
				},
				min: 0
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series
		};
	}
});
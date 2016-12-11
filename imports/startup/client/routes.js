import {Router} from 'meteor/iron:router';
import {Meteor} from 'meteor/meteor';
import {Bowls} from '/imports/api/bowls/Bowls.js';
import moment from 'moment';

Router.configure({layoutTemplate: 'layoutTemplate'});

Router.onBeforeAction(function(){
	Meteor.subscribe('incomplete-counts');
	this.next();
});

// Rules
Router.route('/', {
	name: 'home',
	template: 'home',
	waitOn: () => Meteor.subscribe('all-bowls'),
	data: () => ({
		users: Meteor.users.find({}, {sort: {'profile.name': 1}})
	})
});

Router.route('/general-rules', {
	name: 'generalRules',
	template: 'generalRules'
});

Router.route('/playoff-rules', {
	name: 'playoffRules',
	template: 'playoffRules'
});

Router.route('/scoring', function(){
	this.render('scoringRules');
});

Router.route('/contact', {
	name: 'contact',
	template: 'contact'
});

// Admin
Router.route('/admin/users', {
	name: 'users',
	template: 'users',
	waitOn: function(){
		Meteor.subscribe('all-bowls');
	},
	data: function(){
		return {
			users: Meteor.users.find({}, {sort: {username: 1}}),
			bowls: Bowls.find()
		};
	}
});

// Accounts
Router.route('/signup', function(){
	this.render('signup');
});

Router.route('my-profile', {
	name: 'my-profile',
	template: 'viewProfile',
	data: function(){
		return Meteor.user();
	}
});

Router.route('forgot-password', {
	name: 'forgotPassword',
	template: 'forgotPassword'
});

Router.route('reset-password/:token', {
	name: 'resetPassword',
	template: 'resetPassword',
	data: function(){
		return {
			token: this.params.token
		};
	}
});

Router.onBeforeAction(function(){
	if (!Meteor.user()) {
		this.render('login');
	} else {
		this.next();
	}
}, {only: ['my-profile', 'myPicks']});

// Picks
Router.route('/my-picks', {
	name: 'myPicks',
	template: 'pickTable',
	waitOn: () => Meteor.subscribe('my-picks'),
	data: () => Bowls.find({}, {sort: {date: 1, gameId: 1, 'teams.[0].name': 1}})
});

Router.route('/picks/:id', {
	name: 'userPicks',
	template: 'pickTable',
	waitOn: () => Meteor.subscribe('all-bowls'),
	data: () =>	Bowls.find()
});

Router.route('/compare-picks', {
	name: 'comparePicks',
	template: 'comparePicks',
	waitOn: function(){
		return Meteor.subscribe('all-bowls');
	},
	data: function(){
		return {
			bowls: Bowls.find({}, {sort: {date: 1}}),
			users: Meteor.users.find({'profile.done': true}, {sort: {'rank.rank': 1}})
		};
	}
});

Router.route('/bar-graph', {
	name: 'barGraph',
	template: 'barGraph'
});

Router.route('/rolling-totals', {
	name: 'rollingTotals',
	template: 'rollingTotals',
	waitOn: () => Meteor.subscribe('all-bowls')
});

// Games
Router.route('/game/:gameId', {
	name: 'viewGame',
	template: 'viewGame',
	waitOn: function(){
		return Meteor.subscribe('all-bowls');
	},
	data: function(){
		return Bowls.find({$or: [{gameId: this.params.gameId}, {_id: this.params.gameId}]});
	}
});

Router.route('/edit-game/:gameId', {
	name: 'editGame',
	template: 'editGame',
	waitOn: function() {
		return Meteor.subscribe('bowl-by-id', this.params.gameId);
	},
	data: function(){
		return Bowls.find({$or: [{gameId: this.params.gameId}, {_id: this.params.gameId}]});
	}
});

Router.route('/todays-games', {
	name: 'todaysGames',
	template: 'todaysGames',
	waitOn: function(){
		return Meteor.subscribe('all-bowls');
	},
	data: function(){
		return Bowls.find({date: {$gt: moment().startOf('day').toDate(), $lt: moment().endOf('day').toDate()}}, {sort: {date: 1}});
	}
});
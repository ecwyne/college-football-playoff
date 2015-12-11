Meteor.subs = Meteor.subs || new SubsManager();

Router.route('/my-picks', {
	name: 'myPicks',
	template: 'pickTable',
	waitOn: () => Meteor.subscribe('my-picks'),
	data: () => Bowls.find({}, {sort: {date: 1}})
});

Router.route('/reveal', {
	name: 'reveal',
	layoutTemplate: 'revealLayout',
	data: function(){
		return {
			games: ['a', 'b', 'c', 'd']
		};
	}
});

Router.route('/compare-picks', {
	name: 'comparePicks',
	template: 'comparePicks',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
	},
	data: function(){
		return {
			games: Games.find({}, {sort: {gametime: 1}}),
			users: Meteor.users.find({}, {sort: {username: 1}})
		}
	}
});

Router.route('/bar-graph', {
	name: 'barGraph',
	template: 'barGraph',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
	},
	data: function(){
		
	}
})
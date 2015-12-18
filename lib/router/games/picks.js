Router.route('/my-picks', {
	name: 'myPicks',
	template: 'pickTable',
	waitOn: () => Meteor.subscribe('my-picks'),
	data: () => Bowls.find({}, {sort: {date: 1, gameId: 1, 'teams.[0].name': 1}})
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
		}
	}
});

Router.route('/bar-graph', {
	name: 'barGraph',
	template: 'barGraph',
	waitOn: function(){
		
	},
	data: function(){
		
	}
})
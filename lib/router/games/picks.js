Meteor.subs = Meteor.subs || new SubsManager();

Router.route('/my-picks', {
	name: 'myPicks',
	template: 'pickTable',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
	},
	data: function(){
		if (Meteor.user())
			return {games: Games.find({username: Meteor.user().username}, {sort: {gameId: 1}})}
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
			games: Games.find({}, {sort: {gametime: 1, gameId: 1}}),
			users: Meteor.users.find({}, {sort: {username: 1}})
		}
	}
})
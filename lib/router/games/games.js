Meteor.subs = Meteor.subs || new SubsManager();

Router.onBeforeAction(function(){
	Meteor.subs.subscribe('all-games');
	this.next();
});

Router.route('/game/:gameId', {
	name: 'viewGame',
	template: 'viewGame',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
	},
	data: function(){
		return {
			master: Games.find({username: 'actual', gameId: parseInt(this.params.gameId)}),
			picks: Games.find({username: {$ne: 'actual'}, gameId: parseInt(this.params.gameId)})
		}
	}
});

Router.route('/edit-game/:gameId', {
	name: 'editGame',
	template: 'editGame',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
	},
	data: function(){
		return {game: Games.find({username: 'actual', gameId: parseInt(this.params.gameId)})};
	}
});

Router.route('/todays-games', {
	name: 'todaysGames',
	template: 'todaysGames',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
	},
	data: function(){
		return {games: Games.find({username: 'actual'}, {sort: {gametime: 1}})}
	}
})
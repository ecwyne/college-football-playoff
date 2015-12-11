Meteor.subs = Meteor.subs || new SubsManager();

Router.onBeforeAction(function(){
	Meteor.subs.subscribe('all-games');
	this.next();
});

Router.route('/game/:gameId', {
	name: 'viewGame',
	template: 'viewGame',
	waitOn: function(){
		return Meteor.subscribe('bowl-by-id', this.params.gameId);
	},
	data: function(){
		return Bowls.find({$or: [{gameId: this.params.gameId}, {_id: this.params.gameId}]})
	}
});

Router.route('/edit-game/:gameId', {
	name: 'editGame',
	template: 'editGame',
	waitOn: function () {
		return Meteor.subscribe('bowl-by-id', this.params.gameId)
	},
	data: function(){
		return Bowls.find({$or: [{gameId: this.params.gameId}, {_id: this.params.gameId}]});
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
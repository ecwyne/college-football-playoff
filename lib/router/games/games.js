Router.route('/game/:gameId', {
	name: 'viewGame',
	template: 'viewGame',
	// waitOn: function(){
	// 	return Meteor.subscribe('all-games');
	// },
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
	// waitOn: function(){
	// 	return Meteor.subscribe('game-by-id', this.params.gameId);
	// },
	data: function(){
		return {game: Games.find({username: 'actual', gameId: parseInt(this.params.gameId)})};
	}
})
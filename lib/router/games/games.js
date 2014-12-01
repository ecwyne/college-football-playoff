Router.route('/game/:gameId', {
	name: 'viewGame',
	template: 'viewGame',
	waitOn: function(){
		return Meteor.subscribe('all-games');
	},
	data: function(){
		return {
			master: Games.find({username: 'actual', gameId: parseInt(this.params.gameId)}),
			picks: Games.find({username: {$ne: 'actual'}, gameId: parseInt(this.params.gameId)})
		}
	}
});
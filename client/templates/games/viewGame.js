Template.viewGame.helpers({
	pickCount: function(gameId, team){
		var them = team == 1 ? 2 : 1;
		return Games.find({
			gameId: gameId, 
			username: {$ne: 'actual'}, 
			$where: 'this.team' + team + '.score > this.team' + them + '.score'
		}).count();
	},
	avgScore: function(gameId, team){
		var them = team == 1 ? 2 : 1;
		var arr = Games.find({gameId: gameId, username: {$ne: 'actual'}}).map(function(e){return e['team' + team].score})
		return (_.reduce(arr, function(a, b){return a+b}) / _.size(arr)).toFixed(2);
	},
	winningClass: function(username){
		return Blaze._globalHelpers.getRank(username) == 1 ? 'success' : '';
	}
})
Accounts.validateNewUser(function (user) {
	return user.username !== 'actual';
});

Accounts.onCreateUser(function (options, user) {
	Meteor.call('createUserGames', user.username, function(){});
	if (options.profile)
		user.profile = options.profile
	return user;
});

Meteor.methods({
	createUserGames: function (username){
		var games = Games.find({username: 'actual'}).fetch();
		_.each(games, function (game){
			if (Games.findOne({username: username, gameId: game.gameId})){
				
			} else {
				Games.insert({username: username, gameId: game.gameId, gametime: game.gametime, team1: {score: null}, team2: {score: null}});
			}
			
		});
	}
});
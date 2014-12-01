Accounts.validateNewUser(function (user) {
  return user.username !== 'actual';
});

Accounts.onCreateUser(function (options, user) {
	createUserGames(user.username);
	if (options.profile)
		user.profile = options.profile
	return user;
});

function createUserGames(username){
	var games = Games.find({username: 'actual'}).fetch();
	_.each(games, function (game){
		Games.insert({username: username, gameId: game.gameId, gametime: game.gametime, team1: {score: undefined}, team2: {score: undefined}});
	});
}
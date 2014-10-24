function formatGame(game){
	game.gameId = parseInt(game.gameId);
	delete game.url;
	game.team1.rank = game.team1.rank ? parseInt(game.team1.rank) : undefined;
	game.team2.rank = game.team2.rank ? parseInt(game.team2.rank) : undefined;
	if (/ET/.test(game.status)){
		var et = new Date(game.status.replace('ET', ''));
		game.gametime = new Date(et.valueOf() - 1000*60*60*3);
	} else {
		game.gametime = new Date();
	}
	return game;
}

var upsertGames = Meteor.bindEnvironment(function (games){
	_.each(games, Meteor.bindEnvironment(function(game){
		game = formatGame(game);
		Games.update({gameId: game.gameId}, {$set: game}, {upsert: true});
	}));
})

Bottomline.ncaaf(upsertGames);
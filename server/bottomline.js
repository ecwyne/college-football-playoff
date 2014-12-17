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
	game.username = 'actual';
	return game;
}

var upsertGames = Meteor.bindEnvironment(function (err, games){
	_.each(games, Meteor.bindEnvironment(function(game){
		game = formatGame(game);
		Games.update({gameId: game.gameId, username: 'actual'}, {$set: game});
	}));
})

Bottomline.ncaaf(upsertGames);

Meteor.methods({
	'delete-all-games': function(arg){
		if (Meteor.users.findOne({_id: this.userId}).username == 'ecwyne' && arg == 'rEaLlY')
			Games.remove({});
	},
	'delete-non-actual': function(arg){
		if (Meteor.users.findOne({_id: this.userId}).username == 'ecwyne' && arg == 'rEaLlY'){
			Games.remove({username: {$ne: 'actual'}});
		} else {
			console.log('did not work');
		}
			
	},
	'update-game-id': function (oldId, newId){
		Games.update({gameId: oldId}, {$set: {gameId: newId}}, {multi: true});
	},
	getBottomline: function(){
		return Meteor.wrapAsync(Bottomline.ncaaf, Bottomline)()
	}
})
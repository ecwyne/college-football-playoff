// function formatGame(game){
// 	game.gameId = parseInt(game.gameId);
// 	delete game.url;
// 	game.team1.rank = game.team1.rank ? parseInt(game.team1.rank) : undefined;
// 	game.team2.rank = game.team2.rank ? parseInt(game.team2.rank) : undefined;
// 	if (/ET/.test(game.status)){
// 		var et = new Date(game.status.replace('ET', ''));
// 		game.gametime = new Date(et.valueOf() - 1000*60*60*3);
// 	} else {
// 		game.gametime = new Date();
// 	}
// 	game.username = 'actual';
// 	return game;
// }

function formatGame2(game){
	return {
		status: game.status,
		started: game.started,
		finished: game.finished,
		'team1.score': game.team1.score,
		'team2.score': game.team2.score
	}
}


var upsertGames = Meteor.bindEnvironment(function (err, games){
	_.each(games, Meteor.bindEnvironment(function(game){
		var obj = formatGame2(game);
		Games.update({gameId: parseInt(game.gameId), username: 'actual'}, {$set: obj});
	}));
})

Meteor.setInterval(function(){
	Bottomline.ncaaf(upsertGames);
}, 1000*60*2);


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
		if (Games.find({gameId: newId}).count() == 0)
			Games.update({gameId: oldId}, {$set: {gameId: newId}}, {multi: true});
	},
	getBottomline: function(){
		return Meteor.wrapAsync(Bottomline.ncaaf, Bottomline)()
	}
})
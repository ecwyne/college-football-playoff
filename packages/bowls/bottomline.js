function updateGames(){
	Bottomline.ncaaf(Meteor.bindEnvironment(function (err, data){
		if (!err){
			data.forEach(function (game){
				Bowls.update({gameId: game.gameId}, {$set: {
					status: game.status,
					started: game.started,
					finished: game.finished,
					'teams.0.score': game.team1.score,
					'teams.1.score': game.team2.score
				}})
			});
			updateRanks();
		}
	}));
}

function updateRanks(){
	var totals = {};
	Meteor.users.find({'profile.done': true}).forEach(function (user){
		totals[user._id] = 0;
	});
	Bowls.find().forEach(function (bowl){
		for (id in bowl.picks){
			var userLens = R.lensProp(id);
			var score = bowl.scoreFor(id);
			totals = R.ifElse(
			  R.has(id),
			  R.over(R.lensProp(id), R.add(score)),
			  R.always(totals)
			)(totals);
		}
	});
	var min = R.reduce(R.min, 10000, R.values(totals));
	var arr = R.sortBy(R.prop('score'), R.values(R.mapObjIndexed(function (val, key, obj){
		return {
			id: key,
			score: val,
			fromFirst: val - min
		}
	}, totals)))
	var rank = 0;
	//arr = R.map((e) => R.assoc('rank', rank++)(e), arr);
	arr = arr.map(function (e, i, arr){
		rank++;
		e.rank = rank - R.length(R.filter(R.propEq('score', e.score), R.slice(0, i, arr)));
		return e;
	});
	arr.forEach(function (user){
		Meteor.users.update(user.id, {$set: {rank: R.dissoc('id', user)}});
	});
}

Meteor.setInterval(updateGames, 1000*60*2);
updateGames();

Meteor.methods({
	updateRanks: updateRanks
});
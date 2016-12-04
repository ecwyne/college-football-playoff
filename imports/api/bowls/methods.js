import {Meteor} from 'meteor/meteor';
import {Bowls, calculateScore} from './Bowls.js';
import Bottomline from 'bottomline';
import R from 'ramda';

export const updateGames = () => {
	Bottomline.ncaaf(Meteor.bindEnvironment((err, data) => {
		if (!err){
			data.forEach(game => {
				Bowls.update({gameId: game.gameId}, {$set: {
					status: game.status,
					started: game.started,
					finished: game.finished,
					'teams.0.score': game.team1.score,
					'teams.1.score': game.team2.score
				}});
			});
			updateRanks();
		}
	}));
};

export const updateRanks = () => {
	const doneUsers = Meteor.users.find({'profile.done': true}).map(R.prop('_id'));
	const scoreObjects = Bowls.find({finished: true}).map(bowl => {
		const actual = bowl.teams.map(R.prop('score'));
		return R.map(picks => calculateScore(picks, actual), bowl.picks);
	});
	const totalScores = R.pick(doneUsers, R.reduce(R.mergeWith(R.add), {}, scoreObjects));
	const min = R.reduce(R.min, Infinity, R.values(totalScores));
	const sortedScores = R.values(totalScores).sort();
	const mapCalcs = (score, id) => ({id, score, fromFirst: score - min, rank: sortedScores.indexOf(score) + 1});
	const scoreCaluclations = R.sortBy(R.prop('score'), R.values(R.mapObjIndexed(mapCalcs, totalScores)));
	scoreCaluclations.forEach(user => Meteor.users.update(user.id, {$set: {rank: R.dissoc('id', user)}}));
	return scoreCaluclations;
};

Meteor.setInterval(updateGames, 1000 * 60 * 2);
updateGames();

Meteor.methods({updateRanks});
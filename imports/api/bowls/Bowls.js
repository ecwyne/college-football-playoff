import {Mongo} from 'meteor/mongo';
import R from 'ramda';
import _ from 'underscore';


const diff = R.zipWith((x, y) => Math.abs(x - y));
const sum = R.reduce(R.add, 0);

export const Bowls = new Mongo.Collection('bowls', {transform: doc => new Bowl(doc)});

/*
	{
		name: 'Rose Bowl',
		teams: [
			{name: '', rank: '', record: '' score: 0},
			{name: '', rank: '', record: '' score: 0}
		],
		gameId: '12332121312',
		date: new Date('12/31/2015'),
		location: 'Houston, TX',
		status: 'Mon, Dec 31st at 3:30pm ET',
		playoff: false,
		started: false,
		finished: false,
		picks: {
			X32ASz4X8DagpWdPi: [12, 13]
		}
	}
*/
export const calculateScore = (picks, actual) => {
	const correct = !R.equals(...actual) && R.gt(...actual) !== R.gt(...picks) ? 30 : 0;
	return correct + (sum(diff(actual, picks)) || -50);
};

function Bowl(obj){
	_.extend(this, obj);
}

Bowl.prototype.isLive = function(){
	return this.started && !this.finished;
};

Bowl.prototype.scoreFor = function(id){
	if (!this.started){
		return 0;
	}
	const actual = R.map(R.prop('score'),this.teams);
	const picks = R.path(['picks', id], this);
	return calculateScore(picks, actual);
};

Bowl.prototype.picksFor = function(id, index){
	return R.path(['picks', id, index], this);
};

Bowl.prototype.set = function(key, val){
	return Bowls.update(this._id, {$set: R.assoc(key, val, {})});
};
const diff = R.zipWith((x, y) => Math.abs(x - y));
const sum = R.reduce(R.add, 0);

Bowls = new Mongo.Collection('bowls', {
	transform: (doc) => new Bowl(doc)
});

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

function Bowl(obj){
	_.extend(this, obj);
}

Bowl.prototype.isLive = function (){return this.started && !this.finished}

Bowl.prototype.scoreFor = function (id){
	if (!this.started) return 0;
	let actual = R.map(R.prop('score'),this.teams);
	let picks = R.path(['picks', id], this);
	let correct = !R.equals.apply(R, actual) && R.gt.apply(R, actual) !== R.gt.apply(R, picks) ? 30 : 0;
	return correct + (sum(diff(actual, picks)) || -50);
}

Bowl.prototype.set = function (key, val){
	return Bowls.update(this._id, {$set: R.assoc(key, val, {})});
}
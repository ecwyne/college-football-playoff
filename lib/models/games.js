Games = new Mongo.Collection('games');

var teamSchema = new SimpleSchema({
	rank: {
		type: Number,
		optional: true
	},
	name: {
		type: String,
		optional: true
	},
	score: {
		type: Number,
		optional: true
	}
})

Games.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Bowlname (eg. Rose Bowl)',
		optional: true
	},
	username: {
		type: String
	},
	gameId: {
		type: Number,
		label: 'ESPN game id'
	},
	gametime: {
		type: Date,
		label: 'the date of the game start',
		optional: true
	},
	started: {
		type: Boolean,
		optional: true
	},
	finished: {
		type: Boolean,
		optional: true
	},
	status: {
		type: String,
		label: 'current status of the game',
		optional: true
	},
	team1: {
		type: teamSchema
	},
	team2: {
		type: teamSchema
	}
}));

Games.helpers({
	actual: function(){
		return Games.findOne({username: 'actual', gameId: this.gameId});
	},
	score: function(){
		var actual = this.actual();
		if (!actual.started)
			return 0;
		var total = 0;
		total += this.team1.score > this.team2.score !== actual.team1.score > actual.team2.score ? 30 : 0;
		total += Math.abs(this.team1.score - actual.team1.score);
		total += Math.abs(this.team2.score - actual.team2.score);
		total += total == 0 ? -50 : 0;
		return total;
	}
});
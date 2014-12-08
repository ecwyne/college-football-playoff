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
	},
	record: {
		type: String,
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
	usergroup: {
		type: String //family, friends, all
	},
	playoff: {
		type: Boolean,
		optional: true
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
	location: {
		type: String,
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
		type: teamSchema,
		optional: true
	},
	team2: {
		type: teamSchema,
		optional: true
	}
}));

Games.helpers({
	actual: function(){
		return Games.findOne({username: 'actual', gameId: this.gameId});
	},
	score: function(){
		var actual = this.actual();
		if (!actual.started || !this.team1.score || !this.team2.score)
			return 0;
		var total = 0;
		total += this.team1.score > this.team2.score !== actual.team1.score > actual.team2.score ? 30 : 0;
		total += Math.abs(this.team1.score - actual.team1.score);
		total += Math.abs(this.team2.score - actual.team2.score);
		total += total == 0 ? -50 : 0;
		return total;
	}
});
Games = new Mongo.Collection('games');

var teamSchema = new SimpleSchema({
	rank: {
		type: Number,
		optional: true
	},
	name: {
		type: String
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
	gameId: {
		type: Number,
		label: 'ESPN game id'
	},
	gametime: {
		type: Date,
		label: 'the date of the game start'
	},
	started: {
		type: Boolean
	},
	finished: {
		type: Boolean
	},
	status: {
		type: String,
		label: 'current status of the game'
	},
	team1: {
		type: teamSchema
	},
	team2: {
		type: teamSchema
	}
}));
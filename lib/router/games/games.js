Router.route('/game/:gameId', {
	name: 'viewGame',
	template: 'viewGame',
	waitOn: function(){
		return Meteor.subscribe('bowl-by-id', this.params.gameId);
	},
	data: function(){
		return Bowls.find({$or: [{gameId: this.params.gameId}, {_id: this.params.gameId}]})
	}
});

Router.route('/edit-game/:gameId', {
	name: 'editGame',
	template: 'editGame',
	waitOn: function () {
		return Meteor.subscribe('bowl-by-id', this.params.gameId)
	},
	data: function(){
		return Bowls.find({$or: [{gameId: this.params.gameId}, {_id: this.params.gameId}]});
	}
});

Router.route('/todays-games', {
	name: 'todaysGames',
	template: 'todaysGames',
	waitOn: function(){
		return Meteor.subscribe('all-bowls');
	},
	data: function(){
		return Bowls.find({date: {$gt: moment().startOf('day').toDate(), $lt: moment(new Date('12/21/2015')).endOf('day').toDate()}}, {sort: {date: 1}})
	}
})
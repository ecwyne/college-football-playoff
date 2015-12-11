Meteor.publish('my-picks', function(){
	if (this.userId)
		var obj = R.assoc('picks.' + this.userId, 1, {teams: 1, date: 1, name: 1, status: 1, playoff: 1, gameId: 1})
		return Bowls.find({}, {fields: obj});
});

Meteor.publish('bowl-by-id', function (id){
	return Bowls.find({$or: [{gameId: id}, {_id: id}]});
});

Meteor.publish('all-bowls', function (){
	return Bowls.find({}, {sort: {date: 1}});
});
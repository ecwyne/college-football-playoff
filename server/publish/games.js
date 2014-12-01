function getUsername (id){
	return Meteor.users.findOne({_id: id}).username;
}

Meteor.publish('all-games', function(){
	return [Games.find(), Meteor.users.find()];
});

Meteor.publish('my-games', function(){
	if (this.userId)
		return Games.find({$or: [{username: getUsername(this.userId)}, {username: 'actual'}]});
});

Meteor.publish('game-by-id', function (gameId){
	return [Games.find({gameId: parseInt(gameId)}), Meteor.users.find()];
});
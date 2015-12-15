Meteor.publish('my-picks', function(){
	if (this.userId)
		return Bowls.find({hide: {$ne: true}});
});

Meteor.publish('bowl-by-id', function (id){
	return Bowls.find({hide: {$ne: true}, $or: [{gameId: id}, {_id: id}]});
});

Meteor.publish('all-bowls', function (){
	return Bowls.find({hide: {$ne: true}}, {sort: {date: 1}});
});
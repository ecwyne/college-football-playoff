

function getUsername (id){
	return Meteor.users.findOne({_id: id}).username;
}

var usergroup = Meteor.settings.public.usergroup;

Meteor.publish('all-games', function(){ //all-games
	var uNames = _.uniq(Games.find({$or: [{username: 'actual'}, {usergroup: usergroup}, {usergroup: 'all'}]}).map(function (e){return e.username}))
	return [Games.find({$or: [{username: 'actual'}, {usergroup: usergroup}, {usergroup: 'all'}]}), Meteor.users.find({username: {$in: uNames}})];
});

Meteor.publish('my-games', function(){
	if (this.userId)
		return Games.find({$or: [{username: getUsername(this.userId)}, {username: 'actual'}]});
});

Meteor.publish('game-by-id', function (gameId){
	return [Games.find({gameId: parseInt(gameId)}), Meteor.users.find()];
});
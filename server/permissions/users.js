Meteor.publish(null, function (){
	return Meteor.users.find({}, {fields: {profile: 1, rank: 1, username: 1}})
});

Meteor.users.allow({
	update: function(userId, doc){
		return Meteor.users.findOne(userId).username == 'ecwyne';
	}
});
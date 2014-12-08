//allow admin to update or remove
Games.allow({
	update: function(userId, doc){
		return Roles.userIsInRole(userId, 'admin');
	},
	remove: function(){
		return Roles.userIsInRole(userId, 'admin');
	}
});

//alower owners to update their own games
Games.allow({
	update: function(userId, doc){
		return Meteor.users.findOne(userId).username == doc.username;
	}
});

//prevent insertion
Games.deny({
	insert: function(){
		return true;
	}
});

//Prevent users from updating locked fields
Games.deny({
	update: function(userId, doc, modFields, modifier){
		console.log(modFields);
		return _.intersection(modFields, ['gameId', 'username', 'usergroup']).length
	}
});

//prevent updates after the deadline
Games.deny({
	update: function(userId, doc, modFields, modifier){
		if (Roles.userIsInRole(userId, 'admin')){
			return false;
		}
		return moment() > moment('12/20/2014');
	}
});
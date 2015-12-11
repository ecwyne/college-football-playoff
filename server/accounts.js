Meteor.methods({
	sendPasswordResetEmail: function(email){
		var users = Meteor.users.find({$or: [{'profile.email': {$regex: email, $options: 'i'}},{username: {$regex: email, $options: 'i'}}]}).fetch().filter(function (e){return e.username.toLowerCase() == email || e.profile.email.toLowerCase() == email});
		_.each(users, function (e){
			Meteor.users.update({_id: e._id}, {$addToSet: {emails: {address: e.profile.email, verified: true}}});
			Accounts.sendResetPasswordEmail(e._id, e.profile.email);
		});
		return users.length;
	}
});
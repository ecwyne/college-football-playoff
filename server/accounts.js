Accounts.validateNewUser(function (user) {
	return user.username !== 'actual';
});

Accounts.onCreateUser(function (options, user) {
	Meteor.call('createUserGames', user.username, function(){});
	if (options.profile)
		user.profile = options.profile
	return user;
});

Meteor.methods({
	createUserGames: function (username){
		var games = Games.find({username: 'actual'}).fetch();
		_.each(games, function (game){
			if (Games.findOne({username: username, gameId: game.gameId})){
				
			} else {
				var usergroup = Meteor.settings.public.usergroup;
				Games.insert({username: username, usergroup: usergroup, gameId: game.gameId, gametime: game.gametime, team1: {score: null}, team2: {score: null}});
			}
			
		});
	},
	sendPasswordResetEmail: function(email){
		var users = Meteor.users.find({$or: [{'profile.email': {$regex: email, $options: 'i'}},{username: {$regex: email, $options: 'i'}}]}).fetch().filter(function (e){return e.username.toLowerCase() == email || e.profile.email.toLowerCase() == email});
		_.each(users, function (e){
			Meteor.users.update({_id: e._id}, {$addToSet: {emails: {address: e.profile.email, verified: true}}});
			Accounts.sendResetPasswordEmail(e._id, e.profile.email);
		});
		return users.length;
	}
});
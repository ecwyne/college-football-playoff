import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

Meteor.methods({
	sendPasswordResetEmail: function(email){
		const users = Meteor.users.find({$or: [{'profile.email': {$regex: email, $options: 'i'}},{username: {$regex: email, $options: 'i'}}]})
			.fetch()
			.filter(({username, profile}) => username.toLowerCase() == email || profile.email.toLowerCase() == email);
		users.forEach(e => {
			Meteor.users.update({_id: e._id}, {$addToSet: {emails: {address: e.profile.email, verified: true}}});
			Accounts.sendResetPasswordEmail(e._id, e.profile.email);
		});
		return users.length;
	}
});
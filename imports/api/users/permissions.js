import {Meteor} from 'meteor/meteor';

Meteor.users.allow({
	update: function(userId, doc){
		return Meteor.users.findOne(userId).username == 'ecwyne';
	}
});
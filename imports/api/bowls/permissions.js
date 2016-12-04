import {Meteor} from 'meteor/meteor';
import {Bowls} from './Bowls.js';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';

Bowls.allow({
	update: function(userId, doc, fieldNames, modifier){
		return R.equals(['picks.' + userId], R.keys(R.prop('$set', modifier)));
	}
});

Bowls.allow({
	update: function(userId, doc, fieldNames, modifier){
		return Roles.userIsInRole(userId, 'admin');
	}
});

Bowls.deny({
	insert: R.T,
	remove: R.T
});

Bowls.deny({
	update: function(userId, doc, fieldNames, modifier){
		return !R.equals(fieldNames, ['picks']);
	}
});

Bowls.deny({
	update: function(){
		return (new Date()) > (new Date(Meteor.settings.public.cutoff));
	}
});
import {Meteor} from 'meteor/meteor';
import {Bowls} from '../../api/bowls/Bowls.js';

Meteor.publish(null, () => Meteor.users.find({}, {fields: {profile: 1, rank: 1, username: 1}}));

Meteor.publish('my-picks', function(){
	if (this.userId){
		return Bowls.find({hide: {$ne: true}});
	} else {
		return Bowls.find({doIExist: true});
	}
});

Meteor.publish('bowl-by-id', id => Bowls.find({hide: {$ne: true}, $or: [{gameId: id}, {_id: id}]}));
Meteor.publish('all-bowls', () => Bowls.find({hide: {$ne: true}}, {sort: {date: 1}}));
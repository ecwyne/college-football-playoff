import {Meteor} from 'meteor/meteor';

Meteor.publish(null, () => Meteor.users.find({}, {fields: {profile: 1, rank: 1, username: 1}}));


if (Meteor.isServer){
	var subs = {};
	Meteor.publish(null, function (){
		var subscription = this;
		subs = R.assoc(subscription._session.id, subscription, subs);

		subscription.added('ranks', 'a_random_id', {date: new Date()});

		subscription.onStop(function (){
			delete subs[subscription._session.id];
		});
	});
}

if (Meteor.isClient){
	Ranks = new Mongo.Collection('ranks');
}
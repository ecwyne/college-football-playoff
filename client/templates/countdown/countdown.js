var dateDep = new Tracker.Dependency()

Template.registerHelper('fromNow', function(){
	dateDep.depend();
	return moment(new Date('2015-12-19T08:00:00.000Z')).fromNow();
});

Meteor.setInterval(function(){
	dateDep.changed();
}, 1000*60)
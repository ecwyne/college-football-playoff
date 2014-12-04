var dateDep = new Tracker.Dependency()

Template.registerHelper('fromNow', function(){
	dateDep.depend();
	return moment('12/20/2014').fromNow();
})

Meteor.setInterval(function(){
	dateDep.changed();
}, 1000*60)
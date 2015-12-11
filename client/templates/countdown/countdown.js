var dateDep = new Tracker.Dependency()

Template.registerHelper('fromNow', function(){
	dateDep.depend();
	return moment(new Date('12/20/2015')).fromNow();
})

Meteor.setInterval(function(){
	dateDep.changed();
}, 1000*60)
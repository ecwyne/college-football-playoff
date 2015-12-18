Router.route('/', {
	name: 'home',
	template: 'home',
	waitOn: function (){
		return Meteor.subscribe('all-bowls');
	},
	data: function (){
		return {
			users: Meteor.users.find({}, {sort: {'profile.name': 1}})
		}
	}
});

Router.route('/general-rules', {
	name: 'generalRules',
	template: 'generalRules'
})

Router.route('/playoff-rules', {
	name: 'playoffRules',
	template: 'playoffRules'
})

Router.route('/scoring', function(){
	this.render('scoringRules');
})

Router.route('/contact', {
	name: 'contact',
	template: 'contact'
});
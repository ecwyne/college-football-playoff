Meteor.subs = Meteor.subs || new SubsManager();

Router.route('/', {
	name: 'home',
	template: 'home',
	waitOn: function(){
		return Meteor.subs.subscribe('all-games');
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
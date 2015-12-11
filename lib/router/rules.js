Router.route('/', {
	name: 'home',
	template: 'home'
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
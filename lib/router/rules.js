Router.route('/', function(){
	this.render('home');
});

Router.route('/general-rules', function(){
	this.render('generalRules');
})

Router.route('/playoff-rules', function(){
	this.render('playoffRules');
})

Router.route('/scoring', function(){
	this.render('scoringRules');
})
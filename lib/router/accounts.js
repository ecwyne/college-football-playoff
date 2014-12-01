Router.route('/signup', function(){
	this.render('signup');
})

Router.route('my-profile', {
	name: 'my-profile',
	template: 'viewProfile',
	data: function(){
		return Meteor.user()
	}
})
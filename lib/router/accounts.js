Router.route('/signup', function(){
	this.render('signup');
})

Router.route('my-profile', {
	name: 'my-profile',
	template: 'viewProfile',
	data: function(){
		return Meteor.user()
	}
});

Router.route('forgot-password', {
	name: 'forgotPassword',
	template: 'forgotPassword'
});

Router.route('reset-password/:token', {
	name: 'resetPassword',
	template: 'resetPassword',
	data: function (){
		return {
			token: this.params.token
		}
	}
});

Router.onBeforeAction(function(){
	if (!Meteor.user()) {
		this.render('login');
	} else {
		this.next();
	}
}, {only: ['my-profile', 'myPicks']});
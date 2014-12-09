Accounts.onResetPasswordLink(function (token, done){
	Meteor.setTimeout(function(){
		Router.go('resetPassword', {token: token});
	}, 2000);
});

Template.resetPassword.events({
	'submit form': function (e){
		e.preventDefault();
		$('.spinnerDiv').css('visibility', 'visible');
		var password = $('#inputPassword').val()
		var token = Router.current().data().token;
		Accounts.resetPassword(token, password, function (err, data){
			if (err){
				swal('Error', 'An error occurred. Please try again later', 'error');
				console.log(err);
			} else {
				swal('Success', data, 'success');
				Router.go('my-profile');
			}
			$('.spinnerDiv').css('visibility', 'hidden');
		})

	}
})
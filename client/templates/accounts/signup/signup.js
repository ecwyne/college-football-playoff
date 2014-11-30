Template.signup.events({
	'submit form': function(e){
		e.preventDefault()
		var username = $('#inputUsername').val();
		var email = $('#inputEmail').val();
		var password = $('#inputPassword').val();
		if (username && email && password){
			Accounts.createUser({username: username, profile: {email: email}, password: password}, function (err){
				if (err){
					console.log(err);
					swal('Error', 'An error occurred signing up. Please try again\n' + err.reason, 'error');
				}
			})
		} else {
			swal('Incomplete Sign Up', 'Please include ALL fields to sign up.', 'warning');
		}
	}
});
Template.forgotPassword.events({
	'submit form': function(e){
		e.preventDefault();
		$('.spinnerDiv').css('visibility', 'visible');
		var email = $('#inputEmail').val();
		if (email == '')
			swal('No Info', 'Please enter either a username or email address', 'warning');
		if (Meteor.users.find({$or: [{'profile.email': {$regex: email, $options: 'i'}},{username: {$regex: email, $options: 'i'}}]}).fetch().filter(function (e){return e.username.toLowerCase() == email || e.profile.email.toLowerCase() == email}).length == 0){
			swal('None Found', 'No users match that username or email, please try again', 'warning');
			$('.spinnerDiv').css('visibility', 'hidden');
		} else {
			Meteor.call('sendPasswordResetEmail', email, function (err, data){
				if (err){
					swal('Error', 'An error occurred. Please try again later', 'error');
					console.log(err);
				} else {
					swal('Sent', data.toString() + ' email has been sent to ' + email, 'success');
				}
				$('.spinnerDiv').css('visibility', 'hidden');
			})
		}
	}
})
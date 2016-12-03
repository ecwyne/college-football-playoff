import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {$} from 'meteor/jquery';
import swal from 'sweetalert';

import './forgotPassword.html';

Template.forgotPassword.events({
	'submit form': e => {
		e.preventDefault();
		$('.spinnerDiv').css('visibility', 'visible');
		const email = $('#inputEmail').val();
		if (email == ''){
			swal('No Info', 'Please enter either a username or email address', 'warning');
		} else if (Meteor.users.find({$or: [{'profile.email': {$regex: email, $options: 'i'}},{username: {$regex: email, $options: 'i'}}]}).fetch().filter(({username, profile}) => username.toLowerCase() == email || profile.email.toLowerCase() == email).length == 0){
			swal('None Found', 'No users match that username or email, please try again', 'warning');
			$('.spinnerDiv').css('visibility', 'hidden');
		} else {
			Meteor.call('sendPasswordResetEmail', email, (err, data) => {
				if (err){
					swal('Error', 'An error occurred. Please try again later', 'error');
					console.log(err);
				} else {
					swal('Sent', data.toString() + ' email has been sent to ' + email, 'success');
				}
				$('.spinnerDiv').css('visibility', 'hidden');
			});
		}
	}
});
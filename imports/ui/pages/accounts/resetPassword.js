import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Router} from 'meteor/iron:router';
import {Accounts} from 'meteor/accounts-base';
import {$} from 'meteor/jquery';
import swal from 'sweetalert';

import './resetPassword.html';

Accounts.onResetPasswordLink((token, done) => {
	Meteor.setTimeout(() => Router.go('resetPassword', {token}), 2000);
});

Template.resetPassword.events({
	'submit form': e => {
		e.preventDefault();
		$('.spinnerDiv').css('visibility', 'visible');
		var password = $('#inputPassword').val();
		var token = Router.current().data().token;
		Accounts.resetPassword(token, password, (err, data) => {
			if (err){
				swal('Error', 'An error occurred. Please try again later', 'error');
				console.log(err);
			} else {
				swal('Success', data, 'success');
				Router.go('my-profile');
			}
			$('.spinnerDiv').css('visibility', 'hidden');
		});
	}
});
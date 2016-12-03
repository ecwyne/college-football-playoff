import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {$} from 'meteor/jquery';
import swal from 'sweetalert';

import './login.html';

Template.login.events({
	'submit .loginForm': function(e){
		e.preventDefault();
		var username = $('#inputUsername').val();
		var password = $('#inputPassword').val();
		if (username && password){
			Meteor.loginWithPassword(username, password, err => {
				if (err){
					console.log(err);
					swal('Unable to login', 'Incorrect Username or Password.\nPlease try again.', 'warning');
				}
			});
		} else {
			swal('Incomplete Login', 'Please include BOTH username and password to login', 'warning');
		}
	}
});
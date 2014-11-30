Template.navbar.events({
	'click .logoutBtn': function(){
		Meteor.logout();
	},
	'submit .loginForm': function(e){
		e.preventDefault();
		var username = $('input[placeholder="username"]').val();
		var password = $('input[placeholder="password"]').val();
		if (username && password){
			Meteor.loginWithPassword(username, password, function (err){
				if (err){
					console.log(err);
					swal('Unable to login', 'Incorrect Username or Password.\nPlease try again.', 'warning');
				}
			})
		} else {
			swal('Incomplete Login', 'Please include BOTH username and password to login', 'warning');
		}
		
	}
});
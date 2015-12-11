Router.route('/admin/users', {
	name: 'users',
	template: 'users',
	waitOn: function(){
		Meteor.subscribe('all-bowls');
	},
	data: function(){
		return {
			users: Meteor.users.find({}, {sort: {username: 1}}),
			bowls: Bowls.find()
		}
	}
});
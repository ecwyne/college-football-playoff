Router.route('/my-picks', {
	name: 'myPicks',
	template: 'pickTable',
	waitOn: function(){
		return Meteor.subscribe('my-games');
	},
	data: function(){
		if (Meteor.user())
			return {games: Games.find({username: Meteor.user().username}, {sort: {gametime: 1}})}
	}
})
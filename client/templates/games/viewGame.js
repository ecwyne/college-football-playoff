Template.viewGame.helpers({
	pickCount: function(index){
		var compare = index == 0 ? R.gt : R.lt;
		var arr = [];
		Meteor.users.find({'profile.done': true}).forEach((u) => arr.push(this.picks[u._id]));
		return arr.filter((e) => compare.apply(R, e)).length
	},
	avgScore: function(index){
		var sum = R.pipe(
			R.map(R.prop(index)),
			R.reduce(R.add, 0)
		);
		var arr = [];
		Meteor.users.find({'profile.done': true}).forEach((u) => arr.push(this.picks[u._id]));
		return (sum(arr)/(Meteor.users.find({'profile.done': true}).count())).toFixed(1);
	},
	winningClass: function(userId){
		return R.path(['rank', 'rank'], Meteor.users.findOne(userId)) == 1 ? 'success' : '';
	}
});
Template.viewGame.helpers({
	pickCount: function(index){
		var compare = index == 0 ? R.gt : R.lt;
		return R.values(this.picks).filter((e) => compare.apply(R, e)).length
	},
	avgScore: function(index){
		var sum = R.pipe(
			R.prop('picks'),
			R.values,
			R.map(R.prop(index)),
			R.reduce(R.add, 0)
		);
		return (sum(this)/(R.keys(this.picks).length)).toFixed(1);
	},
	winningClass: function(userId){
		return R.path(['rank', 'rank'], Meteor.users.findOne(userId)) == 1 ? 'success' : '';
	}
});
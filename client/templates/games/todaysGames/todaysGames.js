Template.bowlCard.helpers({
	bowlCardColor: function (){
		if (this.started){
			let actual = R.map(R.prop('score'),this.teams);
			let picks = R.path(['picks', Meteor.userId()], this);
			let correct = R.gt.apply(R, actual) == R.gt.apply(R, picks);
			if (!R.equals.apply(R, actual)){
				return correct ? 'lightgreen' : 'lightpink';
			}
		}
	},
	bowlCardRank: function (){
		let bowl = this;
		let myScore = bowl.scoreFor(Meteor.userId());
		let allScores = Meteor.users.find({'profile.done': true}).map(function (e){
			return bowl.scoreFor(e._id)
		}).sort();
		return allScores.indexOf(myScore) + 1;
	}
});
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import R from 'ramda';

import './todaysGames.html';
import './todaysGames.css';

Template.bowlCard.helpers({
	bowlCardColor: function(){
		if (this.started){
			const actual = R.map(R.prop('score'),this.teams);
			const picks = R.path(['picks', Meteor.userId()], this);
			const correct = R.gt.apply(R, actual) == R.gt.apply(R, picks);
			if (!R.equals.apply(R, actual)){
				return correct ? 'lightgreen' : 'lightpink';
			}
		}
	},
	bowlCardRank: function(){
		const bowl = this;
		const myScore = bowl.scoreFor(Meteor.userId());
		const allScores = Meteor.users.find({'profile.done': true})
			.map(({_id}) => bowl.scoreFor(_id))
			.sort((a, b) => a - b);
		console.log(allScores);
		return allScores.indexOf(myScore) + 1;
	}
});
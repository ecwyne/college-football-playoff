Template.pickTableDetails.helpers({
	myPicks: function (index){
		return R.path(['picks', Meteor.userId(), index], this);
	},
	isPlayoff: function(bool){
		console.log(this, bool);
		return this.playoff == bool;
	}
});

Template.pickTable.events({
	'change .pickInput': function(e){
		var bowl = this;
		var {index} = e.currentTarget.dataset;
		var newScore = Number(e.currentTarget.value);
		var oldScore = R.pathOr(null, ['picks', Meteor.userId(), index], bowl);
		var opponentScore = R.pathOr(null, ['picks', Meteor.userId(), Math.abs(index - 1)], bowl);

		if (R.equals(newScore, opponentScore)){
			swal('TIE', 'Game cannot be recorded as a tie', 'warning');
			e.currentTarget.value = oldScore;
			return;
		}

		var arr = index == 0 ? [newScore, opponentScore] : [opponentScore, newScore];
		var obj = R.assocPath(['$set', 'picks.' + Meteor.userId()], arr, {})
		Router.current().state.set('saving' + bowl.gameId, {class: 'label label-warning', text: 'Saving...'});
		Bowls.update(bowl._id, obj, function (err, data){
			if (err){
				console.log(err);
				Router.current().state.set('saving' + bowl.gameId, {class: 'label label-danger', text: 'ERROR'});
			} else {
				Router.current().state.set('saving' + bowl.gameId, {class: 'label label-success', text: 'Saved'});
			}
		});
	},
	'keypress .pickInput': function(e){
		if (!_.contains(_.range(48,58), e.which))
			e.preventDefault();
	},
	'click .saveScoresBtn': function(){
		return;
		var out = [['Bowl Name', 'Team 1', 'Team 2', 'Score 1', 'Score 2', '\n']];
		var games = Games.find({username: Meteor.user().username}, {sort: {gametime: 1}}).fetch();
		_.each(games, function (e){
			out.push([e.actual().name, e.actual().team1.name, e.actual().team2.name, e.team1.score, e.team2.score, '\n']);
		});
		saveAs(new Blob(out, { type: 'text/csv;charset=utf-8;'}), Meteor.user().username + '-scores.csv');
	}
});
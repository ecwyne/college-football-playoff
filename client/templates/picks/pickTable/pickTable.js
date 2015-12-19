Template.pickTableDetails.helpers({
	myPicks: function (index){
		return R.path(['picks', Router.current().params.id || Meteor.userId(), index], this);
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
		var oldScore = R.pathOr(null, ['picks', Router.current().params.id || Meteor.userId(), index], bowl);
		var opponentScore = R.pathOr(null, ['picks', Router.current().params.id || Meteor.userId(), Math.abs(index - 1)], bowl);

		if (R.equals(newScore, opponentScore)){
			swal('TIE', 'Game cannot be recorded as a tie', 'warning');
			e.currentTarget.value = oldScore;
			return;
		}

		var arr = index == 0 ? [newScore, opponentScore] : [opponentScore, newScore];
		var obj = R.assocPath(['$set', 'picks.' + (Router.current().params.id || Meteor.userId())], arr, {})
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
		var out = [['Bowl Name', 'Team 1', 'Team 2', 'Score 1', 'Score 2', '\n']];
		var games = Bowls.find({}, {sort: {date: 1}}).fetch();
		_.each(games, function (e){
			out.push([e.name, e.teams[0].name, e.teams[1].name, R.pathOr(0, ['picks', Router.current().params.id || Meteor.userId(), 0], e), R.pathOr(0, ['picks', Router.current().params.id || Meteor.userId(), 1], e), '\n']);
		});
		saveAs(new Blob(out, { type: 'text/csv;charset=utf-8;'}), Meteor.user().username + '-scores.csv');
	}
});
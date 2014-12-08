var inputDep = new Tracker.Dependency()

Template.pickTable.helpers({
	dirtyInput: function(game){
		inputDep.depend();
		var t1 = game.team1.score
		var t2 = game.team2.score
		var i1 = parseInt($('#team1'+game.gameId).val())
		var i2 = parseInt($('#team2'+game.gameId).val())
		if (t1 === i1 && t2 === i2)
			return {class: 'success', text: 'Saved'}
		if (_.isNaN(i1) && _.isNaN(i2) && !t1 && !t2)
			return {class: 'primary', text: ''}
		if ((_.isNaN(i1) || _.isNaN(i2)) && (!t1 || !t2))
			return {class: 'warning', text: 'Incomplete'}
		return {class: 'danger', text: 'Other'}

	}
})

Template.pickTable.events({
	'change .pickInput': function(e){
		inputDep.changed();
		var game = Blaze.getData(e.currentTarget);
		if (game[e.currentTarget.dataset.team == 'team1' ? 'team2' : 'team1'].score == parseInt(e.currentTarget.value)){
			swal('TIE', 'Game cannot be recorded as a tie', 'warning');
			return;
		}
		var obj = {$set: {}};
		obj.$set[e.currentTarget.dataset.team] = {score: e.currentTarget.value};
		Games.update(game._id, obj, function(){
			inputDep.changed();
		});
	},
	'keypress .pickInput': function(e){
		if (!_.contains(_.range(48,58), e.which))
			e.preventDefault();
	},
	'click .saveScoresBtn': function(){
		var out = [['Bowl Name', 'Team 1', 'Team 2', 'Score 1', 'Score 2', '\n']];
		var games = Games.find({username: Meteor.user().username}, {sort: {gametime: 1}}).fetch();
		_.each(games, function (e){
			out.push([e.actual().name, e.actual().team1.name, e.actual().team2.name, e.team1.score, e.team2.score, '\n']);
		});
		saveAs(new Blob(out, { type: 'text/csv;charset=utf-8;'}), Meteor.user().username + '-scores.csv');
	}
});

Template.pickTable.rendered = function(){
	var arr = Router.current().data().games.fetch();
	_.each(arr, function (game){
		if (_.isNumber(game.team1.score))
			$('#team1'+game.gameId).val(game.team1.score)
		if (_.isNumber(game.team2.score))
			$('#team2'+game.gameId).val(game.team2.score)
	});
	inputDep.changed();
}
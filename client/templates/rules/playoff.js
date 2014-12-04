function testMatch(match, matchup, a, b){
	return (match.match(a) && matchup.match(b)) || (match.match(b) && matchup.match(a));
}

Template.playoffRules.helpers({
	randomScore: function(){
		return Math.floor(Random.fraction() * 50) + 1;
	},
	possibleClass: function(match){
		var matchup = Router.current().state.get('matchup');
		if (!matchup)
			return '';
		if (matchup == match)
			return 'success';
		if (testMatch(match, matchup, 'a', 'b') || testMatch(match, matchup, 'c', 'd'))
			return 'danger line-through';
	},
	winnerSelected: function(match){
		if (Router.current().state.get('matchup'))
			return Router.current().state.get('matchup').match(match) ? 'success' : '';
	}
});

Template.playoffRules.events({
	'click .semifinalGame': function(e){
		var team = e.currentTarget.dataset.team;
		if (team == 'a')
			var notTeam = 'b';
		if (team == 'b')
			var notTeam = 'a';
		if (team == 'c')
			var notTeam = 'd';
		if (team == 'd')
			var notTeam = 'c';
		var matchup = Router.current().state.get('matchup') || '';
		matchup = matchup.match(/\D/g) || [];
		matchup = matchup.filter(function (e){return e != notTeam && e != team});
		if (!_.contains(e.currentTarget.classList, 'success'))
			matchup.push(team)
		Router.current().state.set('matchup', matchup.sort().join(''));
	}
});

Template.playoffRules.rendered = function(){
	Router.current().state.set('matchup', 'a');
}
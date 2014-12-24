Template.comparePicks.rendered = function(){
	Session.setDefault('compare1', Meteor.user().username);
	try	{
		Session.setDefault('compare2', Blaze._globalHelpers.getSortedList()[0].username);
	} catch (e){
		Session.setDefault('compare2', 'ecwyne');
	}
	$('.select2').select2({width: '250px'}).on('change', function (e){
		Session.set(e.currentTarget.id, e.val);
	});
	$('#compare1').select2('val', Session.get('compare1'));
	$('#compare2').select2('val', Session.get('compare2'));
}

Template.comparePicks.helpers({
	compareGames: function(username){
		var grouped = _.groupBy(Router.current().data().games.fetch(), 'gameId');
		var out = [];
		_.each(grouped, function (val, key){
			out.push({
				compare1: _.findWhere(val, {username: Session.get('compare1')}),
				actual: _.findWhere(val, {username: 'actual'}),
				compare2: _.findWhere(val, {username: Session.get('compare2')})
			})
		})
		return _.sortBy(out, function (e){return e.actual.gametime.valueOf()});
	},
	compareClass: function(games){
		if (games){
			return (games.compare1.team1.score > games.compare1.team2.score) == (games.compare2.team1.score > games.compare2.team2.score) ? '' : 'info';
		}
	},
	winnerName: function(game){
		if (game){
			if (!_.isNumber(game.team1.score) || !_.isNumber(game.team2.score)) return 'incomplete';
			return game.team1.score > game.team2.score ? game.actual().team1.name : game.actual().team2.name;
		}
	},
	correctWinnerClass: function(game){
		if (game){
			if (!game.actual().finished) return 'label-default';
			return (game.team1.score > game.team2.score) == (game.actual().team1.score > game.actual().team2.score) ? 'label-success' : 'label-danger';
		}
	}
});
import {Template} from 'meteor/templating';
import {Router} from 'meteor/iron:router';
import {Random} from 'meteor/random';
import _ from 'underscore';

import './playoff.html';

function testMatch(match, matchup, a, b){
	return (match.match(a) && matchup.match(b)) || (match.match(b) && matchup.match(a));
}

Template.playoffRules.helpers({
	randomScore: function(){
		return Math.floor(Random.fraction() * 50) + 1;
	},
	possibleClass: function(match){
		const matchup = Router.current().state.get('matchup');
		if (!matchup){
			return '';
		} else if (matchup == match){
			return 'success';
		} else if (testMatch(match, matchup, 'a', 'b') || testMatch(match, matchup, 'c', 'd')){
			return 'danger line-through';
		}
	},
	winnerSelected: function(match){
		if (Router.current().state.get('matchup')){
			return Router.current().state.get('matchup').match(match) ? 'success' : '';
		}
	}
});

Template.playoffRules.events({
	'click .semifinalGame': function(e){
		const team = e.currentTarget.dataset.team;
		let notTeam;
		if (team == 'a'){
			notTeam = 'b';
		}
		if (team == 'b'){
			notTeam = 'a';
		}
		if (team == 'c'){
			notTeam = 'd';
		}
		if (team == 'd'){
			notTeam = 'c';
		}
		let matchup = Router.current().state.get('matchup') || '';
		matchup = matchup.match(/\D/g) || [];
		matchup = matchup.filter(el => el != notTeam && el != team);
		if (!_.contains(e.currentTarget.classList, 'success')){
			matchup.push(team);
		}
		Router.current().state.set('matchup', matchup.sort().join(''));
	}
});

Template.playoffRules.rendered = function(){
	Router.current().state.set('matchup', 'a');
};
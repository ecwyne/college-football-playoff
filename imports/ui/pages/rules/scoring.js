import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {$} from 'meteor/jquery';

var diffDef = new Tracker.Dependency();

import './scoring.html';

Template.scoringRules.events({
	'change input': function(e){
		diffDef.changed();
	}
});

Template.scoringRules.helpers({
	pointDiff: function(team){
		diffDef.depend();
		return Math.abs(parseInt($('#' + team + '1').val()) - $('#' + team + '2').val());
	},
	pointWrong: function(){
		diffDef.depend();
		var a1 = Number($('#a1').val());
		var b1 = Number($('#b1').val());
		var a2 = Number($('#a2').val());
		var b2 = Number($('#b2').val());
		if (a1 == b1 || a2 == b2){
			return 'Cannot result in tie';
		}
		return a1 > b1 == a2 > b2 || a1 < b1 == a2 < b2 ? 0 : 30;
	},
	pointTotal: function(){
		if (Template.scoringRules.__helpers[' pointWrong']() == 'Cannot result in tie'){
			return 'Error';
		}
		return Template.scoringRules.__helpers[' pointDiff']('a') + Template.scoringRules.__helpers[' pointDiff']('b') + Template.scoringRules.__helpers[' pointWrong']() || -50;
	}
});

Template.scoringRules.rendered = function(){
	$('#a1').val(21);
	$('#b1').val(14);
	$('#a2').val(17);
	$('#b2').val(35);
	diffDef.changed();
};
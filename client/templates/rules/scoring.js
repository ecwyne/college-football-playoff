var diffDef = new Tracker.Dependency()

Template.scoringRules.events({
	'change input': function(e){
		diffDef.changed();
	}
});

Template.scoringRules.helpers({
	pointDiff: function(team){
		diffDef.depend()
		return Math.abs(parseInt($('#' + team + '1').val()) - $('#' + team + '2').val());
	}
});

Template.scoringRules.rendered = function(){
	$('#a1').val(21);
	$('#b1').val(14);
	$('#a2').val(17);
	$('#b2').val(35);
	diffDef.changed();
}
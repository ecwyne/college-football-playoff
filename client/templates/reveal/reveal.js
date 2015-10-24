Template.reveal.onRendered(function (){
	console.log('created');
	$('.dial').knob({
		fgColor: "#66CC66",
		angleOffset: -125,
		angleArc: 250,
		max: 50,
		release: function (v){
			console.log(v);
		}
	})
	Reveal.initialize();
	Reveal.slide();
});

Template.reveal.onCreated(function (){
	$('#theme').attr('disabled', false);
	$('#reveal-css').attr('disabled', false);
});

Template.reveal.onDestroyed(function (){
	$('#theme').attr('disabled', true);
	$('#reveal-css').attr('disabled', true);
});

Template.reveal.events({
	'click .btn': function (){
		alert('frick yes');
	}
});
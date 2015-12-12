Template.comparePicks.rendered = function(){
	Router.current().state.setDefault('compare1', Meteor.user()._id);
	Router.current().state.setDefault('compare2', Meteor.users.findOne({}, {sort: {'rank.rank': 1}})._id);
	$('.select2').select2({width: '250px'}).on('change', function (e){
		Router.current().state.set(e.currentTarget.id, e.target.value);
	});
	$('#compare1').select2('val', get('compare1'));
	$('#compare2').select2('val', get('compare2'));
}

Template.comparePicks.helpers({
	compareClass: function(){
		return R.gt.apply(R, this.picks[get('compare1')]) == R.gt.apply(R, this.picks[get('compare2')]) ? '' : 'info';
	},
	winnerName: function(id){
		if (!allNumbers(R.pathOr(['nope'], ['picks', id], this))) return '';
		return R.gt.apply(R, this.picks[id]) ? this.teams[0].name : this.teams[1].name;
	},
	correctWinnerClass: function(id){
		if (!this.finished) return 'label-default';
		return R.gt.apply(R, R.map(R.prop('score'), this.teams)) == R.gt.apply(R, this.picks[id]) ? 'label-success' : 'label-danger';
	}
});

function get(key){
	return Router.current().state.get(key);
}

var allNumbers = R.all(R.is(Number))
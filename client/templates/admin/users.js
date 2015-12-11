Template.users.helpers({
	completeCount: function (id){
		return R.pipe(
			R.map(R.pathOr(['nope'],['picks', id])),
			R.filter(R.all(R.is(Number))),
			R.length
		)(Bowls.find().fetch());
	}
});

Template.users.events({
	'click .glyphicon': function (){
		Meteor.users.update(this._id, {$set: {'profile.paid': !this.profile.paid}});
	}
});
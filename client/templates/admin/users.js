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
	'click .glyphicon': function (e){
		var {field} = e.currentTarget.dataset;
		Meteor.users.update(this._id, R.assocPath(['$set', 'profile.' + field], !this.profile[field], {}))
	}
});
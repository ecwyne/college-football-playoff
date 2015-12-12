Bowls.allow({
	update: function (userId, doc, fieldNames, modifier){
		return R.equals(['picks.' + userId], R.keys(R.prop('$set', modifier)));
	}
});

Bowls.deny({
	insert: R.T,
	remove: R.T
});

Bowls.deny({
	update: function (userId, doc, fieldNames, modifier){
		return !R.equals(fieldNames, ['picks']);
	}
});

Bowls.deny({
	update: function(){
		return (new Date()) > (new Date(Meteor.settings.cutoff));
	}
});
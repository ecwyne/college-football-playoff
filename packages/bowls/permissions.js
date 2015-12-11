Bowls.allow({
	update: function (userId, doc, fieldNames, modifier){
		return R.path(['$set', 'picks.' + userId], modifier);
	}
});
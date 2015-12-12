var formatDateDep = new Tracker.Dependency;
Meteor.setInterval(function(){
	formatDateDep.changed();
}, 1000*60);

Template.registerHelper('formatDate', function (){
	formatDateDep.depend()
	var date = _.find(arguments, _.isDate);
	var format = _.find(arguments, _.isString) || 'M/D/YY';
	var showFromNow = _.find(arguments, _.isBoolean) || false;
	var out = moment(date).format(format);
	if (showFromNow) out += ' - ' + moment(date).fromNow();
	return out;
});

Template.registerHelper('getStateVar', function (arg){
	var key = R.join.apply(R, ['', R.filter(R.is(String,), _.toArray(arguments))]);
	return Router.current().state.get(key);
});

Template.registerHelper('toPairs', function (obj){
	return R.toPairs(obj);
});

Template.registerHelper('getUsername', function (id){
	return R.prop('username', Meteor.users.findOne(id))
});

Template.registerHelper('scoreFor', function (bowl, id){
	return bowl.scoreFor(id);
});

Template.registerHelper('getRankProp', function (id, prop){
	return R.path(['rank', prop], Meteor.users.findOne(id));
});

Template.registerHelper('incompletePicks', function (){
	return Bowls.find().count() - R.pipe(
		R.map(R.pathOr(['nope'],['picks', Meteor.userId()])),
		R.filter(R.all(R.is(Number))),
		R.length
	)(Bowls.find().fetch());
});
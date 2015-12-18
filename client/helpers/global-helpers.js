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
	var u = Meteor.users.findOne(id);
	return R.path(['profile', 'name'], u) || R.prop('username', u);
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

Template.registerHelper('pastDeadline', function(){
	return (new Date()) > (new Date(Meteor.settings.cutoff));
});

Template.registerHelper('getUser', function (id){
	return Meteor.users.findOne(id);
});

Template.registerHelper('completeCount', function (id){
	return R.pipe(
		R.map(R.pathOr(['nope'],['picks', id])),
		R.filter(R.all(R.is(Number))),
		R.length)(Bowls.find().fetch());
});

Template.registerHelper('missingPicks', function (id){
	var pipe = R.pipe(
		R.filter((e) => R.complement(R.all(R.is(Number)))(e.picks[id] || ['none'])),
		R.map(R.prop('name')),
		R.join(',\n'));

	return pipe(Bowls.find().fetch());
})
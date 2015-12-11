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

Template.registerHelper('totalPoints', function (username){
	return Games.find({username: username}).map(function (e){return e.score()}).reduce(function (a, b){return a+b});
});

var sortedListDep = new Tracker.Dependency
var sortedList = [];
Games.find({}).observeChanges({
	changed: function(id, fields){
		if (fields.team1 || fields.team2 || fields.started || fields.finished){
			sortedList = [];
			sortedListDep.changed();
		}
	}
})

function getSortedList(){
	sortedListDep.depend();
	if (sortedList.length)
		return sortedList;
	var collection = Games.find({username: {$ne: 'actual'}}).map(function (e){return {username: e.username, score: e.score()}})
	var object = _.groupBy(collection, function (e){return e.username});
	var out = []
	_.each(object, function (val, key){out.push({username: key, score: _.reduce(_.pluck(val, 'score'), function (a, b){return a + b})})})
	sortedList = _.sortBy(out, function (e){return e.score});
	sortedList = sortedList.filter(function (e){return e.score != 0});
	return sortedList;
}

Template.registerHelper('getSortedList', function(){
	return getSortedList();
})

Template.registerHelper('pointsFrom1st', function (username){
	var arr = getSortedList();
	if (arr.length)
		return _.findWhere(arr, {username: username}).score - _.min(_.pluck(arr, 'score'));
});

Template.registerHelper('getRank', function (username){
	var arr = getSortedList();
	if (arr.length)
		return _.indexOf(_.pluck(arr, 'username'), username) + 1;
});

Template.registerHelper('getStateVar', function (key){
	return Router.current().state.get(R.join.apply(R, ['', R.filter(R.is(String,), _.toArray(arguments))]));
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
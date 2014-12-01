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

function getSortedList(){
	var collection = Games.find({username: {$ne: 'actual'}}).map(function (e){return {username: e.username, score: e.score()}})
	var object = _.groupBy(collection, function (e){return e.username});
	var out = []
	_.each(object, function (val, key){out.push({username: key, score: _.reduce(_.pluck(val, 'score'), function (a, b){return a + b})})})
	return _.sortBy(out, function (e){return e.score});
}

Template.registerHelper('pointsFrom1st', function (username){
	var arr = getSortedList();
	return _.findWhere(arr, {username: username}).score - _.min(_.pluck(arr, 'score'));
});

Template.registerHelper('getRank', function (username){
	var arr = getSortedList();
	return _.indexOf(_.pluck(arr, 'username'), username) + 1;
});
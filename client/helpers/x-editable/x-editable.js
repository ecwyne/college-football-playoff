var defaults = {
	mode: 'inline'
}
function traverse(context, field){
	var arr = field.split('.');
	while(arr.length && (context = context[arr.shift()]));
	return context;
}
function makeAttrs(attrs){
	attrs = _.extend(_.clone(defaults), attrs);
	var doc = attrs.doc;
	var obj = {"data-id": doc._id, "data-value": traverse(doc, attrs.field)};
	_.each(_.omit(attrs, 'doc', 'source'), function (val, name){
		obj['data-' + name] = val;
	});
	return obj;
}

function renderedCallback(){
	var instance = this;
	this.autorun(function(){
		var options = {
			success: function(response, newValue) {
				newValue = parseInt(newValue).toString() === newValue ? parseInt(newValue) : newValue;
				var obj = {};
				obj[this.dataset.field] = newValue;
				var collection = traverse(window, this.dataset.collection);
				collection.update(this.dataset.id, {$set: obj});
			}
		}
		options = _.extend(options, Blaze.getData());
		var val = traverse(Blaze.getData().doc, Blaze.getData().field);
		instance.$('.editable').editable(options).editable('setValue', val);
	});
}

Template.editableSpan.rendered = renderedCallback;

Template.editableSpan.helpers({
	attrs: function(){
		return makeAttrs(this);
	}
});

Template.editableDiv.events({
	'click': function(e){
		$('.editable-input textarea').on('contextmenu', function(e){
			e.preventDefault();
			var start = e.target.selectionStart;
			var text = Meteor.user().profile.initials + ' - ' + moment().format('M/D/YYYY@h:mm A') + ' - ';
			e.target.value = e.target.value.substring(0, e.target.selectionStart) + text + e.target.value.substring(e.target.selectionEnd, e.target.value.length);
			e.target.selectionStart = e.target.selectionEnd = start + text.length;
		});
	}
});

Template.editableDiv.rendered = renderedCallback;

Template.editableDiv.helpers({
	attrs: function(){
		return makeAttrs(this);
	}
});

Template.editableBtn.rendered = renderedCallback;

Template.editableBtn.helpers({
	attrs: function(){
		return makeAttrs(this);
	},
	btnClass: function(){
		return this.inputclass;
	}
});

Template.editableCheckbox.helpers({
	attrs: function(){
		return makeAttrs(this);
	},
	val: function(){
		return traverse(this.doc, this.field);
	}
});

Template.editableCheckbox.events({
	'click .glyphicon-unchecked': function(e){
		var dataset = e.currentTarget.dataset;
		var collection = traverse(window, dataset.collection);
		var obj = {};
		obj[dataset.field] = true;
		collection.update(dataset.id, {$set: obj});
	},
	'click .glyphicon-check': function(e){
		var dataset = e.currentTarget.dataset;
		var collection = traverse(window, dataset.collection);
		var obj = {};
		obj[dataset.field] = false;
		collection.update(dataset.id, {$set: obj});
	}
});

Template.editableBtnGroup.helpers({
	attrs: function(){

	},
	activeClass: function(doc, field){
		return traverse(doc, field) == this.value ? 'btn-success' : 'btn-primary';
	}
});

Template.editableBtnGroup.events({
	'click .btn': function(e){
		var doc = Blaze.getData(e.currentTarget.parentElement).doc;
		var collection = traverse(window, Blaze.getData(e.currentTarget.parentElement).collection);
		var obj = {};
		obj[Blaze.getData(e.currentTarget.parentElement).field] = e.currentTarget.dataset.value;
		collection.update(doc._id, {$set: obj});
	}
});

Template.editableDatepicker.rendered = function(){
	var instance = this;
	var data = Blaze.getData();
	var val = traverse(data.doc, data.field);
	var options = {
	    daysOfWeekDisabled: "0,6",
	    autoclose: true,
	    todayHighlight: true
	}
	instance.$('.datepicker').datepicker('remove').datepicker(options).on('changeDate', function (e){
		var obj = {};
		obj[data.field] = e.date;
		traverse(window, data.collection).update(data.doc._id, {$set: obj});
	})
	if (val){
		instance.$('.datepicker').datepicker('setDate', val);
	}
}
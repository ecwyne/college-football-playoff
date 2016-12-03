import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';
import R from 'ramda';
import _ from 'underscore';

import './x-editable.html';

const defaults = {
	mode: 'inline'
};
const traverse = (obj, field) => R.path(field.split('.'), obj);

function makeAttrs(attrs){
	attrs = _.extend(_.clone(defaults), attrs);
	const doc = attrs.doc;
	const obj = {'data-id': doc._id, 'data-value': traverse(doc, attrs.field)};
	_.each(_.omit(attrs, 'doc', 'source'), (val, name) => {
		obj['data-' + name] = val;
	});
	return obj;
}

function renderedCallback(){
	const instance = this;
	this.autorun(function(){
		let options = {
			success: function(response, newValue) {
				newValue = parseInt(newValue).toString() === newValue ? parseInt(newValue) : newValue;
				const obj = {};
				obj[this.dataset.field] = newValue;
				const collection = traverse(window, this.dataset.collection);
				collection.update(this.dataset.id, {$set: obj});
			}
		};
		options = _.extend(options, Blaze.getData());
		const val = traverse(Blaze.getData().doc, Blaze.getData().field);
		instance.$('.editable').editable(options).editable('setValue', val);
	});
}

Template.editableSpan.rendered = renderedCallback;

Template.editableSpan.helpers({
	attrs: function(){
		return makeAttrs(this);
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
		const dataset = e.currentTarget.dataset;
		const collection = traverse(window, dataset.collection);
		const obj = {};
		obj[dataset.field] = true;
		collection.update(dataset.id, {$set: obj});
	},
	'click .glyphicon-check': function(e){
		const dataset = e.currentTarget.dataset;
		const collection = traverse(window, dataset.collection);
		const obj = {};
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
		const doc = Blaze.getData(e.currentTarget.parentElement).doc;
		const collection = traverse(window, Blaze.getData(e.currentTarget.parentElement).collection);
		const obj = {};
		obj[Blaze.getData(e.currentTarget.parentElement).field] = e.currentTarget.dataset.value;
		collection.update(doc._id, {$set: obj});
	}
});

Template.editableDatepicker.rendered = function(){
	const instance = this;
	const data = Blaze.getData();
	const val = traverse(data.doc, data.field);
	const options = {
		daysOfWeekDisabled: '0,6',
		autoclose: true,
		todayHighlight: true
	};
	instance.$('.datepicker').datepicker('remove').datepicker(options).on('changeDate', e => {
		const obj = {};
		obj[data.field] = e.date;
		traverse(window, data.collection).update(data.doc._id, {$set: obj});
	});
	if (val){
		instance.$('.datepicker').datepicker('setDate', val);
	}
};
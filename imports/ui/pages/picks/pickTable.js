import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Router} from 'meteor/iron:router';
import R from 'ramda';
import swal from 'sweetalert';
import _ from 'underscore';
import {Bowls} from '/imports/api/bowls/Bowls.js';
import {saveAs} from 'meteor/pfafman:filesaver';

import './pickTable.html';

Template.pickTableDetails.helpers({
	myPicks: function(index){
		return R.path(['picks', Router.current().params.id || Meteor.userId(), index], this);
	},
	isPlayoff: function(bool){
		console.log(this, bool);
		return this.playoff == bool;
	}
});

Template.pickTable.events({
	'change .pickInput': function(e){
		const bowl = this;
		const {index} = e.currentTarget.dataset;
		const newScore = Number(e.currentTarget.value);
		const oldScore = R.pathOr(null, ['picks', Router.current().params.id || Meteor.userId(), index], bowl);
		const opponentScore = R.pathOr(null, ['picks', Router.current().params.id || Meteor.userId(), Math.abs(index - 1)], bowl);

		if (R.equals(newScore, opponentScore)){
			swal('TIE', 'Game cannot be recorded as a tie', 'warning');
			e.currentTarget.value = oldScore;
			return;
		}

		const arr = index == 0 ? [newScore, opponentScore] : [opponentScore, newScore];
		const obj = R.assocPath(['$set', 'picks.' + (Router.current().params.id || Meteor.userId())], arr, {});
		Router.current().state.set('saving' + bowl.gameId, {class: 'label label-warning', text: 'Saving...'});
		Bowls.update(bowl._id, obj, (err, data) => {
			if (err){
				console.log(err);
				Router.current().state.set('saving' + bowl.gameId, {class: 'label label-danger', text: 'ERROR'});
			} else {
				Router.current().state.set('saving' + bowl.gameId, {class: 'label label-success', text: 'Saved'});
			}
		});
	},
	'keypress .pickInput': function(e){
		if (!_.contains(_.range(48,58), e.which)){
			e.preventDefault();
		}
	},
	'click .saveScoresBtn': function(){
		const out = [['Bowl Name', 'Team 1', 'Team 2', 'Score 1', 'Score 2', '\n']];
		const games = Bowls.find({}, {sort: {date: 1}}).fetch();
		games.forEach(e => {
			out.push([e.name, e.teams[0].name, e.teams[1].name, R.pathOr(0, ['picks', Router.current().params.id || Meteor.userId(), 0], e), R.pathOr(0, ['picks', Router.current().params.id || Meteor.userId(), 1], e), '\n']);
		});
		saveAs(new Blob(out, { type: 'text/csv;charset=utf-8;'}), Meteor.user().username + '-scores.csv');
	}
});
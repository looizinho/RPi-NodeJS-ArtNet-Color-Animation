import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.actions.onCreated(function actionsOnCreated() {
});

Template.actions.helpers({
});

Template.actions.events({
  'click .action'(e, instance) {
    Meteor.call(e.target.id)
  },
  'click .color'(e, instance) {
    Meteor.call('all', parseInt(e.target.id), (err, res)=>{
      console.log(err, res);
    })
  },
});

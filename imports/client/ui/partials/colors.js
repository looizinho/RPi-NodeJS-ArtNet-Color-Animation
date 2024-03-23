import "./colors.html";
import iro from '@jaames/iro'

Template.colors.onCreated(function colorsOnCreated() {});

Template.colors.onRendered(function colorsOnRendered() {});

Template.colors.events({
  "submit form"(e) {
    e.preventDefault();
    Meteor.call("changeColors", e.target.color1.value, e.target.color2.value);
  },
});

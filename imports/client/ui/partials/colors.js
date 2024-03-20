import "./colors.html";

Template.colors.onCreated(function colorsOnCreated() {});

Template.colors.onRendered(function colorsOnRendered() {});

Template.colors.events({
  "submit form"(e) {
    e.preventDefault();
    console.log("changeColors", e.target.color1.value, e.target.color2.value);
    Meteor.call("changeColors", e.target.color1.value, e.target.color2.value);
  },
});

import "./home.html";
import "./home.css";

var mode = new ReactiveVar("independente");

Template.home.onRendered(function homeOnRendered() {
  let cardsTop = (window.innerHeight - document.getElementById('cards').clientHeight) / 2;
  this.$('#cards').css('margin-top', cardsTop)
});

Template.home.helpers({
  mode() {
    return mode.get();
  },
});

Template.home.events({
  "click .card"(e) {
    Meteor.setTimeout(() => {
      modePage.set(e.target.closest('div').id)
    }, 1000);
    Meteor.call("setMode", e.target.id);
  },
});

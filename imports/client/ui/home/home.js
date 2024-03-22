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
  "click mdui-segmented-button"(e) {
    console.log(e.target.value);
  },
  "click .card"(e) {
    Meteor.setTimeout(() => {
      modePage.set(e.target.closest('div').id)
    }, 1000);
    console.log('1: ' + e.target.id);
    console.log('2: ' + modePage.get());
    Meteor.call("setMode", e.target.id);
  },
});

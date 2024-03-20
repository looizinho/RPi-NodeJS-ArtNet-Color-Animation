import "./home.html";
import "./home.css";

var mode = new ReactiveVar("independente");

Template.home.onRendered(function actionsOnRendered() {});

Template.home.helpers({
  mode() {
    return mode.get();
  },
});

Template.home.events({
  "click mdui-segmented-button"(e) {
    console.log(e.target.value);
  },
  "click mdui-card"(e) {
    $('#solo').attr("class", "card-mode");
    $("#clone").attr("class", "card-mode");
    $("#random").attr("class", "card-mode");
    $(e.target).attr("class", "card-mode card-mode-selected animate__animated animate__pulse");
    Meteor.setTimeout(() => {
      modePage.set(e.target.id)
    }, 500);
    Meteor.call("setMode", e.target.id);
  },
});

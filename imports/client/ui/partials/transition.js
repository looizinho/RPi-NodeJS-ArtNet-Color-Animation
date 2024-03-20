import './transition.html'

var txtVal = new ReactiveVar(2);

Template.transition.onCreated(function transitionOnCreated() {});

Template.transition.onRendered(function transitionOnRendered() {
  const slider = document.querySelector(".sldDuration");
  slider.labelFormatter = (value) => `${value} seg`;
  slider.autofocus = true;
});

Template.transition.helpers({
  txtVal() {
    return txtVal.get();
  },
});

Template.transition.events({
  "change mdui-slider"(e) { //mousemove
    txtVal.set(e.target.value);
    Meteor.call('setTransitionTime', (txtVal.get()*1000))
  }
});
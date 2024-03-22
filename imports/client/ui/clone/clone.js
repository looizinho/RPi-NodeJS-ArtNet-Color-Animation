import "./clone.html";

Template.clone.onRendered(function cloneOnRendered() {
  let cardsTop = (window.innerHeight - document.getElementById('cards').clientHeight) / 2;
  this.$('#clone').css('margin-top', cardsTop)
});
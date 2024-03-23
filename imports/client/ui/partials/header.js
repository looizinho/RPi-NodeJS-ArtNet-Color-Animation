import './header.html'
import './header.css'

Template.header.events({
  'click header'(e) {
    modePage.set('home')
  }
});
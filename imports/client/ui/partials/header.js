import './header.html'
import './header.css'

Template.header.events({
  'click .header-logo'(e) {
    modePage.set('home')
  }
});
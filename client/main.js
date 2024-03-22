import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import '../imports/client/mdui.css'
import '../imports/client/mdui.js'
import "./main.html";
// // import "@material/web/all";
import 'animate.css';
// import "mdui/mdui.css";
// import "mdui.js";
// import "mdui/components/layout.js";
// import "mdui/components/layout-item.js";
// import "mdui/components/layout-main.js";
// import 'mdui/components/navigation-bar.js';
// import 'mdui/components/navigation-bar-item.js';
// import 'mdui/components/icon.js';
// import 'mdui/components/bottom-app-bar.js';

// import {
//   alert,
//   confirm,
//   card,
//   dialog,
//   prompt,
//   snackbar,
//   getTheme,
//   setTheme,
//   getColorFromImage,
//   setColorScheme,
//   removeColorScheme,
//   throttle,
//   observeResize,
//   breakpoint,
//   slider,
// } from "mdui.js";

import '../imports/client/ui/partials/header'
import '../imports/client/ui/home/home'
import '../imports/client/ui/clone/clone'
import '../imports/client/ui/solo/solo'
import '../imports/client/ui/random/random'
import '../imports/client/ui/settings/settings'
import '../imports/client/ui/partials/colors'
import '../imports/client/ui/partials/footer'
import '../imports/client/ui/partials/transition'

modePage = new ReactiveVar('settings')
var timeNow = new ReactiveVar('')
var countdown = new ReactiveVar(10)

Meteor.startup(() => {
  Meteor.setInterval(() => {
    timeNow.set(new Date().toLocaleTimeString())
    countdown.set(
      countdown.get() > 0 ? `0${countdown.get() - 1}` : 10
    )
  }, 1000);
});

Template.body.onRendered(function appOnRendered() {
});

Template.body.helpers({
  time() {
    return `${new Date().toLocaleDateString()} ${timeNow.get()}`
  },
  timer() {
    return countdown.get()
  },
  actualPage(_page) {
    if (_page == modePage.get()) {
      return true
    }
  }
});
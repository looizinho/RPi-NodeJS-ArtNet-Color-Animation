import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import '../imports/client/mdui.css'
import '../imports/client/mdui.js'
import "./main.html";

import {
  changeBackgroundGradientColors,
  changeBackgroundGradientTime
}
  from "../imports/client/libs/background-manipulation";

import 'animate.css';

import '../imports/client/ui/partials/header'
import '../imports/client/ui/home/home'
import '../imports/client/ui/clone/clone'
import '../imports/client/ui/solo/solo'
import '../imports/client/ui/random/random'
import '../imports/client/ui/settings/settings'
import '../imports/client/ui/partials/colors'
import '../imports/client/ui/partials/footer'
import '../imports/client/ui/partials/transition'

modePage = new ReactiveVar('home')
var timeNow = new ReactiveVar('')
var countdown = new ReactiveVar(10)
let preset = null;

Meteor.startup(() => {
  Meteor.call('getPreset', (err, res) => {
    preset = res
  })

  Meteor.setInterval(() => {
    timeNow.set(new Date().toLocaleTimeString())
    countdown.set(
      countdown.get() > 0 ? `0${countdown.get() - 1}` : 10
    )
  }, 1000);
});

Template.body.onRendered(function appOnRendered() {
  Meteor.setTimeout(() => {
    changeBackgroundGradientColors(preset.colorFromHex, preset.colorToHex);
    changeBackgroundGradientTime(preset.time)
  }, 1000);
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
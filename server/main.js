import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { artnetArrayGenerator } from "./generator";
import { createTransition } from "./fade";

var Setup = new Mongo.Collection("setup");

var ordem1 = "up";
var ordem2 = "down";

const DURATION = 5000;
const TRESHOLD = 200;
const RED = 1;
const GREEN = 2;
const BLUE = 3;
const UNIVERSE1 = 1;
const UNIVERSE2 = 3;
const IPS = [
  "255.255.255.255",
  "192.168.1.4",
  "192.168.1.7",
  "0.0.0.0",
  "127.0.0.1",
];
const options = {
  host: IPS[4],
  port: 6454,
};

var artnet = require("artnet")(options);
let from = null;
let to = null;

Meteor.startup(() => {
  from = getRandomColor(TRESHOLD);
  Meteor.setInterval(() => {
      to = getRandomColor(TRESHOLD);
      console.log(from, to);
      createTransition(0, 150, [from, to], DURATION, DURATION);
      createTransition(1, 150, [from, to], DURATION, DURATION);
      createTransition(2, 150, [from, to], DURATION, DURATION);
      createTransition(3, 150, [from, to], DURATION, DURATION);
      Meteor.setTimeout(()=>{
        from = getRandomColor(TRESHOLD);
      console.log(to, from);
      createTransition(0, 150, [to, from], DURATION, DURATION);
      createTransition(1, 150, [to, from], DURATION, DURATION);
      createTransition(2, 150, [to, from], DURATION, DURATION);
      createTransition(3, 150, [to, from], DURATION, DURATION);
      }, DURATION)

    // artnet.set(UNIVERSE1, RED, artnetArrayGenerator(150, ordem1));
    // artnet.set(UNIVERSE2, GREEN, artnetArrayGenerator(109, ordem2));
    // if (ordem1 == "up") {
    // } else if (ordem1 == "down") {
    // }
    // ordem1 = ordem1 == "up" ? "down" : "up";
    // ordem2 = ordem2 == "up" ? "down" : "up";
  }, DURATION*2);
});

function getRandomColor(treshold) {
  var _r = Math.floor(Math.random() * treshold);
  var _g = Math.floor(Math.random() * treshold);
  var _b = Math.floor(Math.random() * treshold);
  return { r: _r, g: _g, b: _b };
}

Meteor.methods({
  reset() {
    artnetResetAll();
  },
  check() {
    artnetCheck();
  },
  all(color) {
    let state = false;
    for (var i = color; i < 11; i += 3) {
      if (i < 10) {
        artnet.set(i, 255);
      }
      if (i >= 10) {
        artnet.set(i, 255, (err, res) => {
          artnet.close();
          state = true;
        });
      }
    }
    return state;
  },
});
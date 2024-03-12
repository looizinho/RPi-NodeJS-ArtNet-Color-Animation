import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { artnetArrayGenerator } from "./generator";
import { createTransition } from "./fade";

var Setup = new Mongo.Collection("setup");

var ordem1 = "up";
var ordem2 = "down";

const DURATION = 2000;
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
  Meteor.setInterval(() => {
    // artnet.set(UNIVERSE1, RED, artnetArrayGenerator(150, ordem1));
    // artnet.set(UNIVERSE2, GREEN, artnetArrayGenerator(109, ordem2));
    if (ordem1 == "up") {
      from = getRandomColor();
      to = getRandomColor();
      createTransition(0, 150, [from, to], DURATION, 0);
      createTransition(1, 150, [from, to], DURATION, 0);
      createTransition(2, 150, [from, to], DURATION, 0);
      createTransition(3, 150, [from, to], DURATION, 0);
      console.log(from, to);
    } else if (ordem1 == "down") {
      createTransition(0, 150, [to, from], DURATION, 0);
      createTransition(1, 150, [to, from], DURATION, 0);
      createTransition(2, 150, [to, from], DURATION, 0);
      createTransition(3, 150, [to, from], DURATION, 0);
      console.log(to, from);
    }
    ordem1 = ordem1 == "up" ? "down" : "up";
    ordem2 = ordem2 == "up" ? "down" : "up";
  }, DURATION);
});

function getRandomColor() {
  var _r = Math.floor(Math.random() * 256);
  var _g = Math.floor(Math.random() * 256);
  var _b = Math.floor(Math.random() * 256);
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

// artnet.set(1, numSeq(0, 512), function (err, res) {
//   artnet.close();
// });

// for (let i = 1 i < 512 i += 4) {
//   const artnet = require("artnet")(options)
//   artnet.set(i, 255, function (err, res) {
//     artnet.close()
//   })
// }

// setInterval(() => {
//   if (state == false) {
//     value = 255
//     state = true
//   } else {
//     value = 0
//     state = false
//   }

//   const artnet = require("artnet")(options)
//   artnet.set(1, value, function (err, res) {
//     artnet.close()
//   })
// }, 2000)

// function numSeq(min, max) {
//   var sequentialNumbers = [];
//   for (var i = min; i <= max; i++) {
//     sequentialNumbers.push(i);
//   }
//   return sequentialNumbers;
// }

// function numLoop(value, times) {
//   var sequentialNumbers = [];
//   for (var i = 0; i < times; i++) {
//     sequentialNumbers.push(value);
//   }
//   return sequentialNumbers;
// }

// function artnetResetAll() {
//   // artnet = require("artnet")(options)
//   // artnet.close()
//   let artnetReset = require("artnet")(options);
//   artnetReset.set(0, 1, numLoop(0, 512));
//   artnetReset.set(1, 1, numLoop(0, 512), (err, res) => {
//     artnetReset.close();
//   });
// }

// function artnetCheck() {
//   let artnetCheck = require("artnet")(options);
//   artnetCheck.set(0, 1, numLoop(255, 512));
//   artnetCheck.set(1, 1, numLoop(255, 512), (err, res) => {
//     artnetCheck.close();
//   });
//   Meteor.setTimeout(() => {
//     artnetResetAll();
//   }, 2000);
// }

// console.log(artnetArrayGenerator(5, 'up'));

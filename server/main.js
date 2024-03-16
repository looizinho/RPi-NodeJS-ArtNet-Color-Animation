import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { artnetArrayGenerator } from "./generator";
import { createTransition } from "./fade";

var Setup = new Mongo.Collection("setup");

var ordem1 = "up";
var ordem2 = "down";

const DURATION = 5000;
const TRESHOLD = 255;
const UNIVERSES = 4;
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
let from1 = { r: 255, g: 0, b: 0 };
let to1 = { r: 0, g: 255, b: 0 };
let from2 = to1;
let to2 = from1;

Meteor.startup(() => {
  // from1 = getRandomColor(TRESHOLD);
  // from2 = from1;
  Meteor.setInterval(() => {
    from2 = from1;
    to2 = to1;
    // to1 = getRandomColor(TRESHOLD);
    // to2 = getRandomColor(TRESHOLD);
    for (let index = 0; index < UNIVERSES/2; index++) {
      createTransition(index, 150, [from1, to1], DURATION, DURATION);
    }
    for (let index = 2; index < UNIVERSES; index++) {
      createTransition(index, 150, [to1, from1], DURATION, DURATION);
    }
    Meteor.setTimeout(() => {
      // from1 = getRandomColor(TRESHOLD);
      from2 = getRandomColor(TRESHOLD);
      for (let index = 0; index < UNIVERSES/2; index++) {
        createTransition(index, 150, [to1, from1], DURATION, DURATION);
      }
      for (let index = 2; index < UNIVERSES; index++) {
        createTransition(index, 150, [from1, to1], DURATION, DURATION);
      }
    }, DURATION);
  }, DURATION * 2);

     // artnet.set(UNIVERSE1, RED, artnetArrayGenerator(150, ordem1));
    // artnet.set(UNIVERSE2, GREEN, artnetArrayGenerator(109, ordem2));
    // if (ordem1 == "up") {
    // } else if (ordem1 == "down") {
    // }
    // ordem1 = ordem1 == "up" ? "down" : "up";
    // ordem2 = ordem2 == "up" ? "down" : "up";
});

function getRandomColor(treshold) {
  var _r = Math.floor(Math.random() * treshold);
  var _g = Math.floor(Math.random() * treshold);
  var _b = Math.floor(Math.random() * treshold);
  return { r: _r, g: _g, b: _b };
}

Meteor.methods({
  changeColors(from, to) {
    // console.log(color1, color2);
    from1 = hexToRgb(from)
    to1 = hexToRgb(to)
  },

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

function hexToRgb(hex) {
  // Remova o '#' se estiver presente
  hex = hex.replace(/^#/, '');

  // Se o valor hexadecimal tiver 3 dígitos, expanda para 6 dígitos
  if (hex.length === 3) {
      hex = hex.split('').map(function (hex) {
          return hex + hex;
      }).join('');
  }

  // Extraia os valores de R, G e B
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // Retorna a representação RGB
  return {r:r, g:g, b:b};
}
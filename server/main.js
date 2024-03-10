import { Meteor } from "meteor/meteor";
import { arrayUnificado } from './generator'

var Setup = new Mongo.Collection("setup");

var ordem1 = 'up';
var ordem2 = 'down';

const RED = 1;
const GREEN = 2;
const BLUE = 3;
const UNIVERSE1 = 1;
const UNIVERSE2 = 2;
const IPS = ['255.255.255.255', '192.168.1.4', '192.168.1.7']
const options = {
  host: IPS[2],
  port: 6454
};

var artnet = require("artnet")(options);

Meteor.startup(() => {

  // artnet.set(UNIVERSE1, BLUE, arrayUnificado(150, ordem2));
  // artnet.set(UNIVERSE2, RED, arrayUnificado(150, ordem2));

  Meteor.setInterval(()=> {
    ordem1 = ordem1 == 'up' ? 'down' : 'up'
    ordem2 = ordem2 == 'up' ? 'down' : 'up'
    artnet.set(UNIVERSE1, RED, arrayUnificado(150, ordem1));
    // artnet.set(UNIVERSE2, BLUE, arrayUnificado(150, ordem2));
  }, 300)



})

Meteor.methods({
  reset() {
    artnetResetAll()
  },
  check() {
    artnetCheck();
  },
  all(color) {
    let state = false
    for (var i = color; i < 11; i += 3) {
      if (i < 10) {
        artnet.set(i, 255);
      }
      if (i >= 10) {
        artnet.set(i, 255, (err, res) => {
          artnet.close();
          state = true
        });
      }
    }
    return state
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

// console.log(arrayUnificado(5, 'up'));
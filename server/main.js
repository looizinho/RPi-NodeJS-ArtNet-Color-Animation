import { Meteor } from "meteor/meteor";
import { getRandomColor, setLoop } from "../imports/server/loop";
import { artnetArrayGenerator } from "../imports/server/generator";
import "../imports/server/methods";
import "../imports/both/collections"

var ordem1 = "up";
var ordem2 = "down";
const TRESHOLD = 255;
let from1 = { r: 255, g: 0, b: 0 };
let to1 = { r: 0, g: 255, b: 0 };
let from2 = to1;
let to2 = from1;
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

Meteor.startup(() => {

  Meteor.call('countPresets', (err, res)=> {
    if (res < 1) {
      let dateNow = new Date()
      Presets.insertAsync({
        time: 7000,
        colorFromHex: '#000000',
        colorToHex: '#FFFFFF',
        colorFromBRG: {"b":0,"g":0,"r":0},
        colorToBRG: {"b":255,"g":255,"r":255},
        createdAt: dateNow,
        timestamp: dateNow.valueOf()
      })
    } else {
      Meteor.call('getPreset', (err, res)=> {
        console.log(res);
      })
    }
  })
  from1 = getRandomColor(TRESHOLD);
  from2 = from1;
  artnet.set(UNIVERSE1, RED, artnetArrayGenerator(100, ordem1));
  artnet.set(UNIVERSE2, GREEN, artnetArrayGenerator(100, ordem2));
  if (ordem1 == "up") {
  } else if (ordem1 == "down") {
  }
  ordem1 = ordem1 == "up" ? "down" : "up";
  ordem2 = ordem2 == "up" ? "down" : "up";
});
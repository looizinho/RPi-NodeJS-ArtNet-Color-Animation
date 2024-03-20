import { Meteor } from "meteor/meteor";
import { setLoop } from "../imports/server/loop";
import "../imports/server/methods";

var ordem1 = "up";
var ordem2 = "down";

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
  setLoop(500);
  // from1 = getRandomColor(TRESHOLD);
  // from2 = from1;
  // artnet.set(UNIVERSE1, RED, artnetArrayGenerator(150, ordem1));
  // artnet.set(UNIVERSE2, GREEN, artnetArrayGenerator(109, ordem2));
  // if (ordem1 == "up") {
  // } else if (ordem1 == "down") {
  // }
  // ordem1 = ordem1 == "up" ? "down" : "up";
  // ordem2 = ordem2 == "up" ? "down" : "up";
});
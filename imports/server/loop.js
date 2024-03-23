import { createTransition } from "./fade";

const TRESHOLD = 255;
const UNIVERSES = 4;
const RED = 1;
const GREEN = 2;
const BLUE = 3;
const UNIVERSE1 = 1;
const UNIVERSE2 = 3;

let from1 = { r: 255, g: 0, b: 0 };
let to1 = { r: 0, g: 255, b: 0 };
let from2 = to1;
let to2 = from1;
var looping = null;

function getRandomColor(treshold) {
  var _r = Math.floor(Math.random() * treshold);
  var _g = Math.floor(Math.random() * treshold);
  var _b = Math.floor(Math.random() * treshold);
  return { r: _r, g: _g, b: _b };
}

function gerarLoop(numAparelhos, rgb) {
  const arrayFixtures = [];
  for (let i = 0; i < numAparelhos; i++) {
    arrayFixtures.push(rgb[0], rgb[1], rgb[2]);
  }
  return arrayFixtures;
}

function setLoop(loopTime) {
  Meteor.clearInterval(looping);
  looping = Meteor.setInterval(() => {
    from2 = from1;
    to2 = to1;
    // to1 = getRandomColor(TRESHOLD);
    // to2 = getRandomColor(TRESHOLD);
    for (let index = 0; index < UNIVERSES / 2; index++) {
      createTransition(index, 150, [from1, to1], loopTime, loopTime);
    }
    for (let index = 2; index < UNIVERSES; index++) {
      createTransition(index, 150, [to1, from1], loopTime, loopTime);
    }
    Meteor.setTimeout(() => {
      // from1 = getRandomColor(TRESHOLD);
      from2 = getRandomColor(TRESHOLD);
      for (let index = 0; index < UNIVERSES / 2; index++) {
        createTransition(index, 150, [to1, from1], loopTime, loopTime);
      }
      for (let index = 2; index < UNIVERSES; index++) {
        createTransition(index, 150, [from1, to1], loopTime, loopTime);
      }
    }, loopTime);
  }, loopTime * 2);
}

export { getRandomColor, gerarLoop, setLoop };

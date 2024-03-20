Meteor.methods({
  setMode(mode) {
    console.log(mode);
  },
  setTransitionTime(_time) {
    setLoop(_time);
  },
  changeColors(from, to) {
    // console.log(color1, color2);
    from1 = hexTo(from, 'brg');
    to1 = hexTo(to, 'brg');
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

function hexTo(_color, _mode) {
  var rgb;
  _color = _color.replace(/^#/, "");
  if (_color.length === 3) {
    _color = _color
      .split("")
      .map(function (_color) {
        return _color + _color;
      })
      .join("");
  }
  var r = parseInt(_color.substring(0, 2), 16);
  var g = parseInt(_color.substring(2, 4), 16);
  var b = parseInt(_color.substring(4, 6), 16);

  if (_mode == 'rgb') {
    rgb = { r: r, g: g, b: b }
  } else if (_mode == 'brg') {
    rgb = { r: b, g: r, b: g }
  }

  return rgb;
}
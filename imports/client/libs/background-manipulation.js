function changeBackgroundGradientColors(_from, _to) {
  var r = document.querySelector(':root');
  r.style.setProperty('--grad-from', _from);
  r.style.setProperty('--grad-to', _to);
}

function changeBackgroundGradientTime(_time) {
  var r = document.querySelector(':root');
  r.style.setProperty('--grad-time', `${_time / 1000}s`);
}

export {
  changeBackgroundGradientColors,
  changeBackgroundGradientTime
}
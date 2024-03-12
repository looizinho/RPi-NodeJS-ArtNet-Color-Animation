function gerarLoop(numAparelhos, rgb) {
  const intervaloVermelho = 255 / (numAparelhos - 1);
  const arrayFixtures = [];
  for (let i = 0; i < numAparelhos; i++) {
    arrayFixtures.push(
      rgb[0],
      rgb[1],
      rgb[2],
    );
  }
  return arrayFixtures;
}

export { gerarLoop };
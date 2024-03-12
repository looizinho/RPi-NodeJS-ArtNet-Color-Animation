function gerarGradiente(numAparelhos, ordem) {
  const intervaloVermelho = 255 / (numAparelhos - 1);
  const intensidadesRGB = [];
  for (let i = 0; i < numAparelhos; i++) {
    let intensidadeVermelha;
    if (ordem === "up") {
      intensidadeVermelha = Math.round(intervaloVermelho * i);
    } else if (ordem === "down") {
      intensidadeVermelha = Math.round(255 - intervaloVermelho * i);
    } else {
      console.error('Ordem inválida. Escolha "up" ou "down".');
      return;
    }
    const intensidadeVerde = null;
    const intensidadeAzul = null;
    intensidadesRGB.push([
      intensidadeVermelha,
      intensidadeVerde,
      intensidadeAzul,
    ]);
  }
  return intensidadesRGB;
}

export { gerarGradiente };
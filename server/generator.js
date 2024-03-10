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
    const intensidadeVerde = null; // Sempre 0 para o gradiente vermelho
    const intensidadeAzul = null; // Sempre 0 para o gradiente vermelho
    intensidadesRGB.push([
      intensidadeVermelha,
      intensidadeVerde,
      intensidadeAzul,
    ]);
  }
  return intensidadesRGB;
}

function arrayUnificado(_aparelhos, _ordem) {
  // Exemplo de uso:
  const numAparelhos = _aparelhos;
  // const ordem = "down"; // ou 'up'
  // const ordem = process.argv[2];
  const ordem = _ordem;
  const arrayUnificado = gerarGradiente(numAparelhos, ordem).reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
  return arrayUnificado;
}

export { arrayUnificado }
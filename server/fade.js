import { gerarLoop } from "./loop";

const IPS = ['255.255.255.255', '192.168.1.4', '192.168.1.7', '0.0.0.0', '127.0.0.1']
const options = {
  host: IPS[3],
  port: 6454
};

var artnetColors = require("artnet")(options);

// Função para interpolar entre duas cores RGB
function interpolateColor(startColor, endColor, progress) {
  var r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
  var g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
  var b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
  return [r, g, b]
}

// Função para animar a transição suave entre duas cores RGB
function animateColorTransition( universe, fixtures, colors, duration, pause) {
  var startTime = new Date().getTime(); // Tempo de início da animação
  var currentIndex = 0; // Índice da cor atual
  var isPaused = false;

  // Função para atualizar a cor a cada quadro
  function updateColor() {
    if (isPaused) {
      var currentTime = new Date().getTime(); // Tempo atual
      var elapsed = currentTime - startTime; // Tempo decorrido desde a última pausa

      if (elapsed >= pause) {
        isPaused = false;
        startTime = currentTime; // Reiniciar o tempo de início
      }
    } else {
      var currentTime = new Date().getTime(); // Tempo atual
      var elapsed = currentTime - startTime; // Tempo decorrido desde o início da animação
      var progress = elapsed / duration; // Progresso da animação (0 a 1)

      if (progress >= 1) {
        // Pausar por 5 segundos ao chegar ao final de uma transição
        isPaused = true;
        Meteor.setTimeout(updateColor, pause);
      } else {
        var startColor = colors[currentIndex];
        var endColor = colors[(currentIndex + 1) % colors.length];
        var color = interpolateColor(startColor, endColor, progress);
        // console.log(color); // Exibe a cor no console
        artnetColors.set(universe, 1, gerarLoop(fixtures, color));
        Meteor.setTimeout(updateColor, 16); // Chama recursivamente após 16ms para aproximadamente 60 FPS
      }
    }
  }

  // Inicia a animação
  updateColor();
}

// Inicia a animação de transição de cor
function createTransition(_universe, _fixtures, _colors, _duration, _delay) {
  animateColorTransition(_universe, _fixtures, _colors, _duration, _delay);
  Meteor.setInterval(() => {
    // animateColorTransition(_universe, _fixtures, _colors, _duration, _duration);
  }, _delay);
}

export { createTransition }


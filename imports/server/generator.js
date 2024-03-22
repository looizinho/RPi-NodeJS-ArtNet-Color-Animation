import { gerarGradiente } from "./gradient";

function artnetArrayGenerator(_aparelhos, _ordem) {
  const numAparelhos = _aparelhos;
  const ordem = _ordem;
  const arrayGenerator = gerarGradiente(numAparelhos, ordem).reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
  return arrayGenerator;
}

export { artnetArrayGenerator };

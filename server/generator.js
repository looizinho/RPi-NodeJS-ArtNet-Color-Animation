import { gerarGradiente } from "./gradient";

function artnetArrayGenerator(_aparelhos, _ordem) {
  const numAparelhos = _aparelhos;
  // const ordem = process.argv[2];
  const ordem = _ordem;
  const artnetArrayGenerator = gerarGradiente(numAparelhos, ordem).reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
  return artnetArrayGenerator;
}

export { artnetArrayGenerator };

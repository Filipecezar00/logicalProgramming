const inputProcesso = document.getElementById("inputProcesso");
const btnBuscar = document.getElementById("btnBuscar");
const resultadoProcesso = document.getElementById("resultadoProcesso");

async function buscarDados() {
  let inputValue = inputProcesso.value;

  if (inputValue === "") {
    return alert("Digite um valor no input para prosseguir");
  }

  resultadoProcesso.innerHTML = `Buscando informações da api...`;
  try {
    const requisicaoApi = await fetch("./processos.json");
    const resposta = await requisicaoApi.json();

    const respostaFiltrada = resposta.find(
      (processo) => processo.numero === inputValue,
    );

    if (respostaFiltrada) {
      resultadoProcesso.innerHTML = `
      <p>Cliente: ${respostaFiltrada.cliente}</p>
      <p>Vara: ${respostaFiltrada.vara}</p>
      <p>Status: ${respostaFiltrada.status}</p>
      `;
    } else {
      resultadoProcesso.innerHTML = `Sem nenhum processo com esse número `;
    }
  } catch (error) {
    console.log("ERRO AO REALIZAR REQUISIÇÃO PARA A API", error);
    resultadoProcesso.innerHTML = `ERRO AO REALIZAR REQUISIÇÃO A API`;
  }
}
btnBuscar.addEventListener("click", buscarDados);

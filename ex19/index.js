const resposta = document.getElementById("resultado");

const processos = [
  { numero: "001", cliente: "Empresa A", urgente: false },
  { numero: "002", cliente: "João Silva", urgente: true },
  { numero: "003", cliente: "Maria Souza", urgente: false },
];

const valores_processos = [
  { numero: "001", valor: 1000 },
  { numero: "002", valor: 2500 },
  { numero: "003", valor: 500 },
];

function buscarProcessos(lista) {
  try {
    const urgente = lista.some((processo) => processo.urgente === true);

    if (urgente === true) {
      resposta.innerHTML = `<p>Processo Urgente encontrado</p>`;
    } else {
      resposta.innerHTML = `<p>Nenhum processo urgente</p>`;
    }
  } catch (error) {
    console.error("ERRO AO PROCURAR PROCESSOS:", error);
    resposta.innerHTML = `<p>Erro ao procurar processos</p>`;
  }
}

function calcularValoresAtualizados(lista) {
  try {
    lista.map((processo) => {
      resposta.innerHTML += `<pre>Processo: ${processo.numero} - R$ ${processo.valor}</pre>`;
    });
  } catch (error) {
    console.error("ERRO AO CALCULAR OS VALORES ATUALIZADOS");
    resposta.innerHTML = `Erro ao calcular os valores atualizados`;
  }
}

buscarProcessos(processos);
calcularValoresAtualizados(valores_processos);

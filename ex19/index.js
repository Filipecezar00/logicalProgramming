const resposta = document.getElementById("resultado");

const processos = [
  { numero: "001", cliente: "Empresa A", urgente: false },
  { numero: "002", cliente: "João Silva", urgente: true },
  { numero: "003", cliente: "Maria Souza", urgente: false },
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

buscarProcessos(processos);

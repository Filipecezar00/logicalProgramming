const tipo = document.getElementById("tipo");
const btnCadastrar = document.getElementById("btnCadastrar");
const mensagem = document.getElementById("mensagem");
const totalEntradas = document.getElementById("totalEntradas");
const totalSaidas = document.getElementById("totalSaidas");
const saldoTotal = document.getElementById("saldoTotal");
const btnFiltroTodas = document.getElementById("btnFiltroTodas");
const btnFiltroEntradas = document.getElementById("btnFiltroEntradas");
const btnFiltroSaidas = document.getElementById("btnFiltroSaidas");
const containerTransacoes = document.getElementById("containerTransacoes");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");

let transacoes = [
  { descricao: "salario", valor: 10000, tipo: "entrada" },
  { descricao: "conta de luz", valor: 400, tipo: "saida" },
  { descricao: "Aluguel", valor: 3000, tipo: "entrada" },
];

async function cadastrarTransacao(e) {
  e.preventDefault();
  let descricao_value = descricao.value;
  let valor_value = Number(valor.value);
  let tipo_value = tipo.value;

  if (!descricao_value || valor_value <= 0) {
    return (mensagem.innerHTML = `<p style="color:red;">Preencha todas as informações antes de cadastrar</p>`);
  }

  mensagem.innerHTML = `<p>Carregando. . . . </p>`;

  try {
    let transacao_api = {
      descricao: descricao_value,
      valor: valor_value,
      tipo: tipo_value,
    };
    const reqApi = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transacao_api),
    });

    const resultado = await reqApi.json();
    transacoes.push(resultado);

    mensagem.innerHTML = "";

    renderizarTransacoes(transacoes);
  } catch (error) {
    console.log("ERRO DURANTE O PROCESSO DE CADASTRAR TRANSAÇÃO", error);
    mensagem.innerHTML = `Erro durante o processo de cadastrar transação`;
  }
}

function renderizarTransacoes(lista) {
  try {
    containerTransacoes.innerHTML = "";
    lista.forEach((transacao) => {
      containerTransacoes.innerHTML += `<pre>Transações realizadas: ${transacao.descricao} R$${transacao.valor} Status:${transacao.tipo}</pre>`;
    });
  } catch (erro) {
    console.log("ERRO AO REALIZAR RENDERIZAÇÃO DAS TRANSAÇÕES:", erro);
    mensagem.innerHTML = `ERRO AO REALIZAR RENDERIZAÇÃO DAS TRANSAÇÕES`;
  }
}

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

let memoria = localStorage.getItem("transacoes");

let transacoes = memoria
  ? JSON.parse(memoria)
  : [
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

    localStorage.setItem("transacoes", JSON.stringify(transacoes));

    mensagem.innerHTML = "";
    descricao.value = "";
    valor.value = "";

    renderizarTransacoes(transacoes);
    AtualizarValores();
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

function AtualizarValores() {
  try {
    const entradas = transacoes.filter(
      (transacao) => transacao.tipo === "entrada",
    );

    const saidas = transacoes.filter((transacao) => transacao.tipo === "saida");

    const total_Saidas = saidas.reduce(
      (acumulador, transacao) => acumulador + transacao.valor,
      0,
    );

    const total_Entradas = entradas.reduce(
      (acumulador, transacao) => acumulador + transacao.valor,
      0,
    );

    let saldo_Total = Number(total_Entradas - total_Saidas);

    saldoTotal.innerHTML = "";
    totalEntradas.innerHTML = "";
    totalSaidas.innerHTML = "";

    if (saldo_Total <= 0) {
      saldoTotal.innerHTML = `<p style="color:red;"> ${saldo_Total}</p>`;
    } else {
      saldoTotal.innerHTML = `<p style="color:green;">${saldo_Total}</p>`;
    }

    totalEntradas.innerHTML = `<p style="color:green;">${total_Entradas}</p>`;
    totalSaidas.innerHTML = `<p style="color:red;">${total_Saidas}</p>`;
  } catch (error) {
    console.log("ERRO AO SOMAR VALORES:", error);
    mensagem.innerHTML = `ERRO AO SOMAR VALORES`;
  }
}
document
  .getElementById("formTransacao")
  .addEventListener("submit", cadastrarTransacao);

btnFiltroTodas.addEventListener("click", () => {
  renderizarTransacoes(transacoes);
});

btnFiltroEntradas.addEventListener("click", () => {
  const filtragem = transacoes.filter(
    (transacao) => transacao.tipo === "entrada",
  );
  renderizarTransacoes(filtragem);
});

btnFiltroSaidas.addEventListener("click", () => {
  const filtragem = transacoes.filter(
    (transacao) => transacao.tipo === "saida",
  );
  renderizarTransacoes(filtragem);
});

AtualizarValores();
renderizarTransacoes(transacoes);

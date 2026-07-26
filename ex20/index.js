const mensagem = document.getElementById("mensagem");
const btn_filtrar = document.getElementById("btn_filtrar");
const btn_ordenar = document.getElementById("btn_ordenar");
const btn_urgencia = document.getElementById("btn_urgencia");
const containerProcessos = document.getElementById("containerProcessos");
const btn_cadastrar = document.getElementById("btn_cadastrar");
const numeroProcesso = document.getElementById("numero");
const nomeCliente = document.getElementById("cliente");
const valorProcesso = document.getElementById("valor");

let Processos = [
  { numero: "001", nome: "pedro", valor: 1000 },
  { numero: "002", nome: "farmacia santo amaro", valor: 25000 },
  { numero: "003", nome: "Posto são brás", valor: 100000 },
];

async function cadastrarProcesso(e) {
  e.preventDefault();
  let numero_value = numeroProcesso.value;
  let cliente_value = nomeCliente.value;
  let valor_value = Number(valorProcesso.value);

  if (!numero_value || !cliente_value || valor_value <= 0) {
    mensagem.innerHTML = `<p style="color:red;">Preencha todos os inputs antes de prosseguir</p>`;
    return setTimeout(() => {
      mensagem.innerHTML = "";
    }, 3000);
  }
  mensagem.innerHTML = `<p> Carregando ...</p>`;

  try {
    let Processo = {
      numero: numero_value,
      nome: cliente_value,
      valor: valor_value,
    };

    const reqApi = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Processo),
    });
    const resposta = await reqApi.json();

    Processos.push(resposta);
    renderizarProcessos();
    mensagem.innerHTML = "";
  } catch (error) {
    console.log("ERRO AO CADASTRAR PROCESSO", error);
    mensagem.innerHTML = `<p style="color:red;"> Erro ao cadastrar processo</p>`;
  }
}

function renderizarProcessos(lista) {
  try {
    containerProcessos.innerHTML = "";
    lista.forEach((processo) => {
      containerProcessos.innerHTML += `<pre>Número do processo: ${processo.numero} Valor do processo: R$-${processo.valor} Nome do cliente: ${processo.nome}</pre>`;
    });
  } catch (error) {
    console.error("ERRO AO REALIZAR PROCESSO DE RENDERIZAÇÃO", error);
    mensagem.innerHTML = `Erro ao realizar processo de renderização!`;
  }
}

btn_cadastrar.addEventListener("click", cadastrarProcesso);
renderizarProcessos(Processos);

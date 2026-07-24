const numeroProcesso = document.getElementById("numeroProcesso");
const numeroCliente = document.getElementById("numeroCliente");
const valorCausa = document.getElementById("valorCausa");
const btn_cadastro = document.getElementById("btn_cadastro");
const mensagem = document.getElementById("mensagem");

async function RegistrarDados(e) {
  e.preventDefault();
  let processo_value = numeroProcesso.value;
  let cliente_value = numeroCliente.value;
  let causa_value = valorCausa.value;

  if (!processo_value || !cliente_value || Number(causa_value) <= 0) {
    mensagem.innerHTML = `<p class="erro">Preencha todos os campos do formulário antes de prosseguir</p>`;

    setTimeout(() => {
      mensagem.innerHTML = "";
    }, 3000);

    return;
  }

  const dadosProcesso = {
    numero: processo_value,
    cliente: cliente_value,
    causa: causa_value,
  };

  mensagem.innerHTML = `<p class="carregando">Carregando dados...</p>`;
  try {
    const requisicaoApi = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProcesso),
      },
    );

    const Processo = await requisicaoApi.json();

    if (!Processo) {
      mensagem.innerHTML = `Erro ao processar dados do cadastro do processo`;
    }

    numeroProcesso.value = "";
    numeroCliente.value = "";
    valorCausa.value = "";

    mensagem.innerHTML = `<p class="sucesso">Informações do Processo salvas com sucesso!</p>`;
  } catch (error) {
    console.log("ERRO AO REGISTRAR DADOS NA API!", error);
    mensagem.innerHTML = `ERRO AO REGISTRAR DADOS NA API`;
  }
}
btn_cadastro.addEventListener("click", RegistrarDados);

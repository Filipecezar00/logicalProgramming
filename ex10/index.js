const container_renderizacao = document.getElementById(
  "container_renderizacao",
);

async function carregarUsuarios() {
  try {
    const dados = await fetch("https://jsonplaceholder.typicode.com/users");

    const resposta = await dados.json();

    container_renderizacao.innerHTML = "";
    resposta.forEach((dado) => {
      container_renderizacao.innerHTML += `
        <h3>${dado.name}</h3>
        <p>Nome da empresa: ${dado.company.name}</p>
        `;
    });
  } catch (erro) {
    console.error("Erro ao consumir informações da api: ", erro);
    container_renderizacao.innerHTML = `<p>Erro ao localizar informações da api</p>`;
  }
}

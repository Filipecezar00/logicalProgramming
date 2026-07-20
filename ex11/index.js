const container_favoritados = document.querySelector(".container_favoritados");
const container_moedas = document.querySelector(".container_moedas");

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

let favoritos = JSON.parse(localStorage.getItem("minhasMoedas")) || [];

window.favoritarMoeda = function (codigo) {
  if (!favoritos.includes(codigo)) {
    favoritos.push(codigo);
  }
  localStorage.setItem("minhasMoedas", JSON.stringify(favoritos));
  renderizarFavoritos();
};

function renderizarFavoritos() {
  try {
    container_favoritados.innerHTML = "";
    favoritos.forEach((item) => {
      container_favoritados.innerHTML += `
        <p>Nome da moeda favoritada: ${item}</p>
      `;
    });
  } catch (erro) {
    console.error("ERRO AO FAVORITAR MOEDA ", erro);
    container_favoritados.innerHTML += `ERRO AO FAVORITAR MOEDA`;
  }
}

async function buscarDadosApi() {
  try {
    const resposta = await Promise.all([
      fetch("https://economia.awesomeapi.com.br/json/last/BTC-BRL"),
      fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL"),
      fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL"),
    ]);

    const dados = await Promise.all(resposta.map((res) => res.json()));

    container_moedas.innerHTML = "";

    dados.forEach((item) => {
      const itens = Object.values(item)[0];
      container_moedas.innerHTML += `
      <article>
        <p>Nome da moeda: ${itens.name}</p>
        <p>Alta da moeda: ${formatador.format(itens.high)}</p>
        <p>Baixa da moeda: ${formatador.format(itens.low)}</p>
        <button onclick="favoritarMoeda('${itens.code}')">Favoritar</button>
      </article>
      `;
    });
  } catch (erro) {
    console.log("ERRO AO REALIZAR BUSCA DE DADOS NA API", erro);
  }
}
renderizarFavoritos();
buscarDadosApi();

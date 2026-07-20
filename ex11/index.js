const container_favoritados = document.querySelector(".container_favoritados");
const container_moedas = document.querySelector(".container_moedas");

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

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
      </article>
      `;
    });
  } catch (erro) {
    console.log("ERRO AO REALIZAR BUSCA DE DADOS NA API", erro);
  }
}
buscarDadosApi();

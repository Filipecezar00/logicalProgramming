const favoritas = document.querySelector(".container_favoritados");
const moedas = document.querySelector(".container_moedas");

let listaFavoritas = JSON.parse(localStorage.getItem("minhaFavoritas")) || [];

async function consumirApi() {
  try {
    const responses = await Promise.all([
      fetch("https://economia.awesomeapi.com.br/json/last/BTC-BRL"),
      fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL"),
      fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL"),
    ]);

    const dados = await Promise.all(responses.map((res) => res.json()));

    const Conversaomoedas = dados.map((item) => Object.values(item)[0]);

    moedas.innerHTML = "<h3>Moedas em Alta</h3>";

    Conversaomoedas.forEach((nomeMoeda) => {
      moedas.innerHTML += `
     <article style="border:1px solid #ccc; padding:10px;">
     <h4>${nomeMoeda.name}</h4>
     <p>Alta: R$ ${nomeMoeda.high}</p>
     <p>Baixa: R$ ${nomeMoeda.low}</p>
     <button onclick="favoritarMoeda('${nomeMoeda.code}')">Favoritar</button>
     </article>
     `;
    });
  } catch (error) {
    console.error("Erro ao realizar consumo das api´s", error);
    moedas.innerText = `Erro ao realizar consumo das apis,\n tente em outro momento.`;
  }
}

window.favoritarMoeda = function (codigoMoeda) {
  if (!listaFavoritas.includes(codigoMoeda)) {
    listaFavoritas.push(codigoMoeda);

    localStorage.setItem("minhasFavoritas", JSON.stringify(listaFavoritas));

    favoritas.innerHTML += `<p>${codigoMoeda} salva!`;
  }
};

consumirApi();

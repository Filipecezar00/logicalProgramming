const btn_calcular = document.getElementById("btn_calcular");
const moeda_value = document.getElementById("moeda_value");
const seuSaldo = document.getElementById("seuSaldo");
const resultado = document.getElementById("resultado");
const moedas_espaco = document.getElementById("moedas_espaco");

async function buscarDados() {
  try {
    const resposta = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,brl",
    );

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    const Jsoncripto = await resposta.json();

    const moedas = Object.keys(Jsoncripto);

    moedas_espaco.innerHTML = "";

    moedas.forEach((nomeMoeda) => {
      const card = document.createElement("div");
      card.classList.add("crypto-card");

      card.innerHTML = `
            <h3>${nomeMoeda.toUpperCase()}</h3>
            <p>Preço em dólar: U$ ${Jsoncripto[nomeMoeda].usd}</p>
            <p>Preço em reais: R$ ${Jsoncripto[nomeMoeda].brl}</p>
        `;
      moedas_espaco.appendChild(card);
    });
  } catch (error) {
    resultado.innerText = "A api está fora do ar, tente em outro momento";
    console.error(error);
  }
}

buscarDados();

btn_calcular.addEventListener("click", function () {
  try {
    const valueSaldo = Number(seuSaldo.value);
    const valueMoeda = Number(moeda_value.value);

    if (
      !seuSaldo.value ||
      !moeda_value.value ||
      valueMoeda < 0 ||
      valueSaldo < 0
    ) {
      resultado.innerText = `Preencha os campos do formulário e tente novamente.`;
      return;
    }

    if (valueSaldo < valueMoeda) {
      resultado.innerText = `Seu saldo é inferior ao valor da moeda`;
    } else {
      const diferenca = valueSaldo - valueMoeda;
      const diferencaFormatada = diferenca.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      resultado.innerText = `Esse é o valor do seu saldo restante \n caso opte por comprar a moeda: ${diferencaFormatada}`;
    }
  } catch (error) {
    console.error("ERRO AO EXECUTAR BTN_CALCULAR: ", error);
    resultado.innerText = `Erro ao executar botão`;
  }
});

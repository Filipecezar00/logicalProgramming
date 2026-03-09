const despesas = [];
const produtos = [{ nome: "Caneca", precoCusto: 200, precoVenda: 350 }];
const resp = document.getElementById("resp");
const input_valor = document.getElementById("valor");
const input_despesa = document.getElementById("despesas");
const btn_adicionar = document.getElementById("btn_adicionar");
let lucroAcumulado = 0;

function CalcularMetas() {
  let htmlFinal = "";
  let totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  produtos.forEach((produto) => {
    let lucro = Number(produto.precoVenda - produto.precoCusto);
    if (lucro <= 0) {
      alert("Esse Produto não gerou lucro");
      return;
    }
    let unidadesNecessarias = totalDespesas / lucro;

    console.log(unidadesNecessarias);
    console.log(produto);

    htmlFinal += `<p>Para pagar as contas apenas com ${produto.nome} <br> venda ${Math.ceil(unidadesNecessarias)} un.</p>`;
  });
  resp.innerHTML = htmlFinal;
  return;
}

function AdicionarDespesa() {
  let valor = Number(input_valor.value);
  let despesa = input_despesa.value;

  const despesa_obj = {
    nome: despesa,
    valor: valor,
  };

  despesas.push(despesa_obj);
  localStorage.setItem("despesa", despesa);
  CalcularMetas();
}

btn_adicionar.addEventListener("click", () => {
  AdicionarDespesa();
  CalcularMetas();
});

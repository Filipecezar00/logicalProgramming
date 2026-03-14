const despesas = [];
const produtos = [];
const resp_despesa = document.getElementById("resp_despesa");
const resp_produto = document.getElementById("resp_produto");
const input_valor = document.getElementById("valor");
const input_despesa = document.getElementById("despesas");
const precoCusto = document.getElementById("preco_custo");
const precoVenda = document.getElementById("preco_venda");
const btn_adicionar = document.getElementById("btn_adicionar");
const btn_registrar = document.getElementById("btn_registrar");
const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
let lucroAcumulado = Number(localStorage.getItem("lucroAcumulado")) || 0;

function CalcularMetas() {
  let htmlFinal = "";
  let totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  let saldoDevedor = totalDespesas - lucroAcumulado;
  let cor = saldoDevedor > 0 ? "#b90000" : "#2ec500";
  let status =
    saldoDevedor > 0 ? "Dívida Ativa, Trabalhe mais" : "Divida paga, parabens!";

  produtos.forEach((produto) => {
    let lucro = Number(produto.sell - produto.cost);

    let unidadesNecessarias = totalDespesas / lucro;

    htmlFinal += `<p>Para pagar as contas apenas com ${produto.name} <br> 
    venda ${Math.ceil(unidadesNecessarias)} un.
     <br> Saldo Devedor Atual: ${saldoDevedor}</p> <br>
     <p>Status Financeiro: ${status}<p> 
     <p style="color:${cor}">Saldo: R$ ${saldoDevedor.toFixed(2)}</p>
     `;

    if (lucro <= 0) {
      alert("Esse Produto não gerou lucro");
      return;
    }
  });

  resp_despesa.innerHTML = htmlFinal;
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

function RegistrarVenda() {
  let htmlFinal = "";
  let produto_value = produto.value;
  let custo_value = Number(precoCusto.value);
  let venda_value = Number(precoVenda.value);
  let quantidade_value = Number(quantidade.value);

  const produto_obj = {
    name: produto_value,
    quantity: quantidade_value,
    cost: custo_value,
    sell: venda_value,
  };

  produtos.push(produto_obj);

  if (venda_value <= custo_value) {
    alert("Operação com Prejuízo, verifique os preços");
    return;
  }

  let lucroUnitario = venda_value - custo_value;
  let lucroVendaAtual = lucroUnitario * quantidade_value;
  lucroAcumulado = lucroAcumulado + lucroVendaAtual;

  localStorage.setItem("lucroAcumulado", lucroAcumulado);

  htmlFinal += `<p>Produto Adicionado:${produto_value} <br>
   Quantidade do Produto: ${quantidade_value} <br>
    Preço de Custo do Produto : ${custo_value} <br> 
    Preço de Venda do Produto : ${venda_value}</p>`;

  resp_produto.innerHTML = htmlFinal;

  produto.value = "";
  quantidade.value = "";
  precoCusto.value = "";
  precoVenda.value = "";
}

btn_adicionar.addEventListener("click", () => {
  AdicionarDespesa();
  CalcularMetas();
});

btn_registrar.addEventListener("click", () => {
  RegistrarVenda();
});

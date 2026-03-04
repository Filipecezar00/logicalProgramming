const despesas = [{}];
const produtos = [{}];
const resp = document.getElementById("resp");
const input_valor = document.getElementById("valor");
const input_despesa = document.getElementById("despesas");
const btn_adicionar = document.getElementById("btn_adicionar");

function CalcularMetas() {
  let totalDespesas = despesas.reduce();
  produtos.forEach((precoVenda, precoCusto, produto) => {
    let lucro = Number(precoVenda - precoCusto);
    let unidadesNecessarias = Number(totalDespesas / lucro);
    resp.innerText = `Para pagar as contas apenas com ${produto.nome}, venda ${Math.ceil(unidadesNecessarias)} un.`;
  });
}

function AdicionarDespesa() {
  let valor = input_valor.value;
  let despesa = input_despesa.value;
  despesas.push(despesa, valor);
  localStorage.setItem("despesa", despesa);
  CalcularMetas();
}

btn_adicionar.addEventListener("click", () => {
  AdicionarDespesa();
});

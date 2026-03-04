const despesas = [{}];
const produtos = [{}];
const resp = document.getElementById("resp");

function CalcularMetas() {
  let totalDespesas = despesas.reduce((acumulador, despesa));
  produtos.forEach((precoVenda, precoCusto, produto) => {
    let lucro = Number(precoVenda - precoCusto);
    let unidadesNecessarias = Number(totalDespesas / lucro);
    resp.innerText = `Para pagar as contas apenas com ${produto.nome}, venda ${Math.ceil(unidadesNecessarias)} un.`;
  });
}

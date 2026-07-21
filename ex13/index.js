const container_produtos = document.querySelector(".container_produtos");
const container_carrinho = document.querySelector(".container_carrinho");
const container_total_precos = document.querySelector(
  ".container_total_precos",
);

const produtos = [
  { id: 1, nome: "Teclado", preco: 100 },
  { id: 2, nome: "Mouse", preco: 50 },
  { id: 3, nome: "Monitor", preco: 800 },
];

let carrinho = [];

function renderizarProdutos() {
  try {
    produtos.forEach((produto) => {
      container_produtos.innerHTML += `
        <p>item: ${produto.nome} - Preço: ${produto.preco}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
        `;
    });
  } catch (error) {
    console.error("Erro ao realizar renderização na tela", error);
    container_produtos.innerHTML = `Erro ao realizar renderização dos Produtos`;
  }
}

function adicionarAoCarrinho(id) {
  try {
    const produto = produtos.find((produto) => produto.id === id);
    if (carrinho.includes(produto)) {
      return true;
    } else {
      carrinho.push(produto);
    }

    carrinho.forEach((item) => {
      container_carrinho.innerHTML = `Itens do carrinho: ${item.nome}`;
    });

    calcularValorTotal();
  } catch (error) {
    console.error("ERRO AO REALIZAR INSERÇÃO NO CARRINHO:", error);
    container_carrinho.innerHTML = `Erro ao realizar inserção no carrinho`;
  }
}

function calcularValorTotal() {
  try {
    let total = 0;
    carrinho.forEach((item) => {
      total += item.preco;
    });
    container_total_precos.innerHTML = `Total do carrinho: ${total}`;
  } catch (error) {
    console.error("ERRO AO REALIZAR CALCULO DO VALOR TOTAL:", error);
    container_total_precos.innerHTML = `Erro ao realizar calculo do valor total`;
  }
}
renderizarProdutos();

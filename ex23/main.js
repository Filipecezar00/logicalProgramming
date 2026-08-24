const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const ano = document.getElementById("ano");
const btn_enviar = document.getElementById("btn_enviar");
const lista_livros = document.getElementById("lista_livros");
const error = document.getElementById("error");

async function CadastrarLivro() {
  try {
    const cadastro = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resposta = JSON.parse(cadastro.json);

    error.innerHTML = `Livro : ${resposta} cadastrado com sucesso !`;

    lista_livros.innerHTML += `<li>${resposta}</li>`;
  } catch (error) {
    console.log("ERRO AO CADASTRAR LIVRO:", error);
  }
}

async function ListarLivros() {
  try {
    const listagem = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resposta = JSON.parse(listagem.json);

    lista_livros.innerHTML += `<li>${resposta}</li>`;
  } catch (error) {
    console.log("ERRO AO LISTAR LIVROS:", error);
  }
}

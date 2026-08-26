const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const btn_enviar = document.getElementById("btn_enviar");
const lista_livros = document.getElementById("lista_livros");
const mensagem = document.getElementById("mensagem");
let livros = [];

async function CadastrarLivro() {
  let titulo_value = titulo.value;
  let autor_value = autor.value;

  try {
    const req_post = await fetch("https://jsonplaceholder.typicode.com/posts", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: titulo_value,
        body: autor_value,
      }),
    });

    if (!req_post.ok) {
      return (mensagem.innerHTML = `Erro ao executar requisição`);
    }

    const resposta = await req_post.json();

    livros.push(resposta);

    mensagem.innerHTML = `Livro: ${resposta.title} do autor ${resposta.body} cadastrado com sucesso!`;
    ListarLivros();

    titulo.value = "";
    autor.value = "";
  } catch (error) {
    console.log("ERRO AO CADASTRAR LIVRO:", error);
  }
}

async function ListarLivros(id) {
  try {
    const req_get = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resposta = await req_get.json();

    let texto = "";
    resposta.forEach(
      (livro) =>
        (texto += `<p>Titulo: ${livro.title}
       \n Autor:${livro.body}</p>
         <button onclick="editarLivro(${livro.id})">Editar</button> 
         \n <button onclick="deletarLivro(${livro.id})">Excluir</button>`),
    );
    lista_livros.innerHTML = texto;
  } catch (error) {
    console.log("ERRO AO LISTAR LIVROS:", error);
  }
}

async function editarLivro(id) {
  let titulo_value = titulo.value;
  let autor_value = autor.value;
  try {
    const req_put = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titulo_value,
          body: autor_value,
          id: id,
        }),
      },
    );
    if (!req_put.ok) {
      return (mensagem.innerHTML = `Erro ao atualizar livro`);
    }
    const resposta = await req_put.json();

    let texto = "";
    livros = livros.map((livro) => (livro.id === id ? resposta : livro));

    livros.forEach((livro) => {
      texto += `<p>Livro: ${livro.title} - Autor: ${livro.body}</p>
    <button onclick="deletarLivro(${livro.id})">Deletar</button>
    <button onclick="editarLivro(${livro.id})">Editar</button>
    `;
    });
    lista_livros.innerHTML = texto;
    mensagem.innerHTML = `Editado com sucesso!`;

    titulo.value = "";

    autor.value = "";
  } catch (error) {
    console.log("ERRO AO EDITAR LIVRO:", error);
  }
}

async function deletarLivro(id) {
  try {
    const req_delete = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      },
    );
    if (!req_delete.ok) {
      return (mensagem.innerHTML = `Erro ao deletar livro`);
    }
    const resposta = await req_delete.json();

    mensagem.innerHTML = `Livro ${id} excluido com sucesso!`;

    let livros_filtrados = livros.filter((livro) => livro.id !== id);

    livros = livros_filtrados;

    lista_livros.innerHTML = "";
    let texto = "";
    livros.forEach((livro) => {
      texto += `<p>Livro: ${livro.title} - Autor:${livro.body}</p>
      <button onclick="deletarLivro(${livro.id})">Excluir</button>
      <button onclick="editarLivro(${livro.id})">Editar</button>
      `;
    });
    lista_livros.innerHTML = texto;
  } catch (error) {
    console.error("ERRO AO REALIZAR EXCLUSÃO DO LIVRO:", error);
  }
}
btn_enviar.addEventListener("click", () => CadastrarLivro());
form.addEventListener("submit", (e) => e.preventDefault());

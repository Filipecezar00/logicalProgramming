const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const ano = document.getElementById("ano");
const btn_enviar = document.getElementById("btn_enviar");
const lista_livros = document.getElementById("lista_livros");
const error = document.getElementById("error");

async function CadastrarLivro() {
  let titulo_value = titulo.value;
  let ano_value = Number(ano.value);
  let autor_value = autor.value;

  try {
    const req_post = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        titulo: titulo_value,
        ano: ano_value,
        autor: autor_value,
      }),
    });
    const resposta = JSON.parse(req_post.json);

    error.innerHTML = `Livro : ${resposta} cadastrado com sucesso !`;

    lista_livros.innerHTML += `<li>${resposta}</li>`;
  } catch (error) {
    console.log("ERRO AO CADASTRAR LIVRO:", error);
  }
}

async function ListarLivros() {
  try {
    const req_get = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resposta = JSON.parse(req_get.json);

    lista_livros.innerHTML += `<li>${resposta}</li>`;
  } catch (error) {
    console.log("ERRO AO LISTAR LIVROS:", error);
  }
}

async function editarLivro(id) {
  let titulo_value = titulo.value;
  let ano_value = Number(ano.value);
  let autor_value = autor.value;
  try {
    const req_put = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          titulo: titulo_value,
          ano: ano_value,
          autor: autor_value,
        }),
      },
    );
    const resposta = JSON.parse(req_put.json());

    error.innerHTML = `Editado com sucesso!`;
    lista_livros.innerHTML += `<li>${resposta}</li>`;
  } catch (error) {
    console.log("ERRO AO EDITAR LIVRO:", error);
  }
}

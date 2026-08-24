const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const ano = document.getElementById("ano");
const btn_enviar = document.getElementById("btn_enviar");
const lista_livros = document.getElementById("lista_livros");
const mensagem = document.getElementById("mensagem");
let livros = [];

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

    mensagem.innerHTML = `Livro : ${resposta} cadastrado com sucesso !`;

    livros.push(resposta);
  } catch (error) {
    console.log("ERRO AO CADASTRAR LIVRO:", error);
  }
}

async function ListarLivros() {
  try {
    const req_get = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resposta = JSON.parse(req_get.json);

    livros.push(resposta);
    livros.map(
      (livro) =>
        (lista_livros.innerHTML += `<p>Titulo: ${livro.titulo}
         \n Ano: ${livro.ano} \n Autor:${livro.autor}</p>
         <button onclick="editarLivro(id)">Editar</button> 
         \n <button onclick="deletarLivro(id)">Excluir</button>`),
    );
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
    livros.push(resposta);

    mensagem.innerHTML = `Editado com sucesso!`;
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
    const resposta = JSON.parse(req_delete.json());

    error.innerHTML = `${resposta} excluido com sucesso!`;

    let livros_filtrados = livros.filter((idlivro) => idlivro !== id);

    lista_livros.innerHTML += `${livros_filtrados}`;
  } catch (error) {
    console.error("ERRO AO REALIZAR EXCLUSÃO DO LIVRO:", error);
  }
}
btn_enviar.addEventListener("click", () => CadastrarLivro());
form.addEventListener((e) => e.preventDefault());

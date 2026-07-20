const campo_busca = document.getElementById("campo_busca");
const lista_jogos = document.getElementById("lista_jogos");

const jogos = [
  { nome: "The Witcher 3", genero: "RPG" },
  { nome: "Valorant", genero: "FPS" },
  { nome: "Minecraft", genero: "Sobrevivência" },
  { nome: "Cyberpunk 2077", genero: "RPG" },
];

campo_busca.addEventListener("input", (evento) => {
  const textoDigitado = evento.target.value;
  const JogosFiltrados = jogos.filter((jogo) => {
    if (jogo.nome.toLowerCase().includes(textoDigitado.toLowerCase())) {
      return true;
    }
  });
  renderizarJogos(JogosFiltrados);
});

function renderizarJogos(lista) {
  try {
    lista_jogos.innerHTML = "";

    lista.forEach((jogo) => {
      lista_jogos.innerHTML += `
            \n Jogos encontrados: ${jogo.nome}
        `;
    });
  } catch (error) {
    console.error("ERRO AO RENDERIZAR JOGOS", error);
    lista_jogos.innerHTML += `Erro ao renderizar jogos`;
  }
}

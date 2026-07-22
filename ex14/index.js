const container_pokemons = document.querySelector(".container_pokemons");
const pokemon_value = document.querySelector(".pokemon_value");

let todosOsPokemons = [];

async function ConsumirApi() {
  try {
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const dados = await resposta.json();
    const pokemons = dados.results;

    todosOsPokemons = pokemons;

    renderizarPokemons(todosOsPokemons);
  } catch (error) {
    console.error("ERRO AO REALIZAR BUSCA NA API", error);
    container_pokemons.innerHTML = `ERRO AO REALIZAR BUSCA NA API`;
  }
}
function renderizarPokemons(lista) {
  try {
    container_pokemons.innerHTML = "";

    lista.forEach((pokemon) => {
      container_pokemons.innerHTML += `
        <p>Nome do pokemon ${pokemon.name}</p>
        `;
    });
  } catch (error) {
    console.error("ERRO AO RENDERIZAR", error);
    container_pokemons.innerHTML = `Erro ao renderizar pokemons`;
  }
}
pokemon_value.addEventListener("input", (event) => {
  const valorInput = event.target.value;

  const Pokemonsfiltrados = todosOsPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(valorInput.toLowerCase());
  });

  renderizarPokemons(Pokemonsfiltrados);
});

ConsumirApi();

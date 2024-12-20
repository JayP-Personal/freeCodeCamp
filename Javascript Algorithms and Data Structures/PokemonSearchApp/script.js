const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const pokemonHeight = document.getElementById('height');
const pokemonWeight = document.getElementById('weight');
const spriteContainer = document.getElementById('sprite-container');
const pokemonTypes = document.getElementById('types');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const xp = document.getElementById('xp');


const getPokemonData = async () => {
    try {
        // get input and format input
        // fetch data from API
        const pokemonNameOrId = searchInput.value.toLowerCase();
        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
            // `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/1`
        );
        const data = await response.json();

        const {base_experience, height, id, name, order, sprites, stats, types, weight} = data;

        // Update information
        pokemonID.textContent = `#${id}`;
        pokemonName.textContent = name;
        pokemonWeight.textContent = `Weight: ${weight}`;
        pokemonHeight.textContent = `Height: ${height}`;

        // Get sprite
        // four kinds: back_default, back_shiny, front_default, front_shiny
        spriteContainer.innerHTML = `
            <div class="sprite-box">
                <img id="sprite" src="${sprites.front_default}" alt="Front Default">
            </div>
            <div class="sprite-box">
                <img id="sprite-back_default" src="${sprites.back_default}" alt="Back Default">
            </div>
            <div class="sprite-box">
                <img id="sprite-front_shiny" src="${sprites.front_shiny}" alt="Front Shiny">
            </div>
            <div class="sprite-box">
                <img id="sprite-back_shiny" src="${sprites.back_shiny}" alt="Back Shiny">
            </div>
        `;

        // Update base stats
        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defense.textContent = stats[2].base_stat;
        specialAttack.textContent = stats[3].base_stat;
        specialDefense.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;
        xp.textContent = `${base_experience}`;

        // Update types
        pokemonTypes.innerHTML = types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
            .join('');
        
    } catch (err) {
        alert("Pokémon not found");
    }
}

searchForm.addEventListener('submit', button => {
    button.preventDefault();
    getPokemonData();
  });
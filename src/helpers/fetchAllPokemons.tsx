import { pokemponApi } from "../api/pokemonApi";
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonResponse";

export const fetchAllPokemons = async(): Promise<Pokemon[]> => {

const resp = await pokemponApi.get<FetchAllPokemonResponse>('/pokemon?Limit=1500');
const smallPokemonList = resp.data.results;

return transformSmallPokemonIntoPokemon ( smallPokemonList );


}

const fetchPokemonDetails = async (pokemonUrl: string): Promise<any> => {
    try {
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for Pokémon: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching details for Pokémon: ${error}`);
      return null; // Return null in case of error
    }
  };
  
  const transformSmallPokemonIntoPokemon = async (smallPokemonList: SmallPokemon[]): Promise<Pokemon[]> => {
    const pokemonArr: Pokemon[] = [];
  
    for (const poke of smallPokemonList) {
      const pokeArr = poke.url.split('/');
      const id = pokeArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      const name = poke.name;
      const abilities: string[] = []; // Placeholder for abilities (to be filled later)
      
      // Fetch details for each Pokémon
      const details = await fetchPokemonDetails(poke.url);
      if (details) {
        const abilityUrls = details.abilities.map((ability: any) => ability.ability.url);
        // Fetch abilities for each Pokémon
        for (const abilityUrl of abilityUrls) {
          const abilityResponse = await fetch(abilityUrl);
          if (abilityResponse.ok) {
            const abilityData = await abilityResponse.json();
            // Add spaces between words in ability name
            const abilityNameWithSpaces = abilityData.name.replace(/([A-Z])/g, ' $1').trim();
            abilities.push(abilityNameWithSpaces); // Push ability name with spaces
          }
        }
      }
      
      pokemonArr.push({ id, name, pic, height: details.height, weight: details.weight, abilities});

    }
  
    return pokemonArr;
  };
  
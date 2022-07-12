import { pokemponApi } from "../api/pokemonApi";
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonResponse";

export const fetchAllPokemons = async(): Promise<Pokemon[]> => {

const resp = await pokemponApi.get<FetchAllPokemonResponse>('/pokemon?Limit=1500');
const smallPokemonList = resp.data.results;

return transformSmallPokemonIntoPokemon ( smallPokemonList );


}

const transformSmallPokemonIntoPokemon = ( smallPokemonList: SmallPokemon[] ): Pokemon[] =>{

    const pokemonArr: Pokemon[] = smallPokemonList.map( poke => {

        const pokeArr = poke.url.split('/');
        const id = pokeArr[6];
        // Note: ` used for interpolation
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

        return {
            id: id,
            pic: pic,
            name: poke.name,
        }
    })

    return pokemonArr;
}
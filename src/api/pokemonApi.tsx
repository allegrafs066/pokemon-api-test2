import axios from 'axios';

// Create an instance of Axios for making requests to the Pokemon API
export const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

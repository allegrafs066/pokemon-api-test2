import axios from 'axios';

export const pokemponApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});
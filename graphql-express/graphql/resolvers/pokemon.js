const axios = require('axios');

const BASE_API = 'http://pokeapi.co/api/v2/pokemon';
const Get = axios.default.get;
const pokemonResolver = {
    pokemonList: async () => {
        try {
            const response = await Get(BASE_API);
            const results = response.data.results.map(async pokemon => {
                const pokemonData = await Get(pokemon.url);
                return pokemonData.data;
            });
            return results;
        } catch (err) {
            console.error('Error Calling RestAPI', err);
        }
    },
    pokemon: async ({ id }) => {
        try {
            const response = await Get(`${BASE_API}/${id}`);
            console.log('Response: ', response.data);
            return response.data;
        } catch (err) {
            console.error('Error Calling Rest API', err);
        }
    }
};

module.exports = pokemonResolver;

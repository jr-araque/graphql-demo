const hello = require('./hello');
const pokemonResolver = require('./pokemon');

rootValue = {
    hello,
    ...pokemonResolver
};

module.exports = rootValue;

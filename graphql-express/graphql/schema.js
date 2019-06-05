const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Pokemon {
    id: ID
    name: String
    base_experience: Int
    height: Int
    weight: Int
  }

  type Query{
    hello: String,
    pokemonList: [Pokemon]!
    pokemon(id: ID!): Pokemon
  }
`);

module.exports = schema;

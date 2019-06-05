import React from 'react';
import './App.css';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Query
                query={gql`
                    {
                        pokemonList {
                            name
                            base_experience
                        }
                    }
                `}
            >
                {({ loading, error, data }) => {
                    console.log('DATA: ', data);
                    if (loading) return <p style={{ color: 'blue' }}> Loading...</p>;
                    if (error) return <p style={{ color: 'red' }}>Error</p>;
                    if (data && data.pokemonList)
                        return (
                            <ul>
                                {data.pokemonList.map(({ name, base_experience }) => (
                                    <li key={name}>
                                        {name} | Exp: {base_experience}
                                    </li>
                                ))}
                            </ul>
                        );
                    if (data && data.pokemon)
                        return (
                            <div>
                                {data.pokemon.name} | Exp: {data.pokemon.base_experience}
                            </div>
                        );
                    return <div>No Data...</div>;
                }}
            </Query>
        </ApolloProvider>
    );
}

export default App;

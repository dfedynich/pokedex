import React, { PureComponent } from 'react';
import GalleryLayout from './../../layouts/GalleryLayout';
import PokemonListItem from './components/PokemonListItem/PokemonListItem';
import Fetcher from './../../components/Fetcher';
import ApiRequest from './../../services/api/ApiRequest';

export default class PokemonsList extends PureComponent {
    getPokemonId(url) {
        const splitArray = url.split('/');
        return splitArray[splitArray.length - 1] || splitArray[splitArray.length - 2];
    }
    render() {
        const apiRequest = ApiRequest.createPokemonApiRequest();
        return (
            <Fetcher request={() => apiRequest.endpoints.pokemons.getAll({params: {limit: 151}})}>
                {({data, isLoading, error}) => {
                    if (!data) {
                        return <p>No data yet ...</p>;
                    }

                    if (error) {
                        return <p>{error.message}</p>;
                    }

                    if (isLoading) {
                        return <p>Loading ...</p>;
                    }

                    return (
                        <GalleryLayout>
                            {data.results.map((pokemon, index) => {
                                const pokemonId = this.getPokemonId(pokemon.url);
                                return (
                                    <PokemonListItem
                                        key={index}
                                        name={pokemon.name}
                                        pokemonId={pokemonId}
                                        imageURL="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
                                    />
                                );
                            })}
                        </GalleryLayout>
                    );
                }}
            </Fetcher>
        );
    }
}

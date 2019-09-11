import React, {PureComponent} from 'react';
import GalleryLayout from './../../layouts/GalleryLayout';
import PokemonListItem from './components/PokemonListItem/PokemonListItem';
import Fetcher from './../../components/Fetcher';
import ApiRequest from './../../services/api/ApiRequest';
import localStorageCacheDecorator from './../../services/decorators/localStorageCacheDecorator';
import ScrollRenderingDispenser from './../../components/ScrollRenderingDispenser';
import styled from 'styled-components';

const StatusMessage = styled.p`
  text-align: center;
`;

export default class PokemonsList extends PureComponent {
    getPokemonId(url) {
        const splitArray = url.split('/');
        const pokemonId = splitArray[splitArray.length - 1] || splitArray[splitArray.length - 2];

        return Number(pokemonId);
    }

    render() {
        const apiRequest = ApiRequest.createPokemonApiRequest();
        const getAllRequest = localStorageCacheDecorator({
            key:'pokemons',
            func: apiRequest.endpoints.pokemons.getAll
        });

        return (
            <Fetcher request={() => getAllRequest({params: {limit: 151}})}>
                {({data, isLoading, error}) => {
                    if (!data) {
                        return <StatusMessage>No data yet ...</StatusMessage>;
                    }

                    if (error) {
                        return <StatusMessage>{error.message}</StatusMessage>;
                    }

                    if (isLoading) {
                        return <StatusMessage>Loading ...</StatusMessage>;
                    }

                    const items = this.props.filterItems
                        ? this.props.filterItems(data.results)
                        : data.results;

                    if (items.length === 0){
                        return <StatusMessage>No pokemons found</StatusMessage>
                    }

                    return (
                        <ScrollRenderingDispenser items={items}>
                            {({items}) => {
                                return (
                                    <GalleryLayout>
                                        {items.map((pokemon, index) => {
                                                const pokemonId = this.getPokemonId(pokemon.url);
                                                return (
                                                    <PokemonListItem
                                                        key={index}
                                                        name={pokemon.name}
                                                        id={pokemonId}
                                                        url={pokemon.url}
                                                    />
                                                )
                                            }
                                        )}
                                    </GalleryLayout>
                                );
                            }}
                        </ScrollRenderingDispenser>
                    );
                }}
            </Fetcher>
        );
    }
}

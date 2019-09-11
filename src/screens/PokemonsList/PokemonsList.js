import React, {Fragment, PureComponent} from 'react';
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

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input.attrs(() => ({
    type: "text"
}))`
    padding:5px;
`;

export default class PokemonsList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            data: null,
            isLoading: false,
            error: null
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleLoadChange = this.handleLoadChange.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            searchText: event.target.value
        })
    }

    handleLoadChange({data, isLoading, error}) {
        this.setState({
            data,
            isLoading,
            error
        })
    }

    getPokemonId(url) {
        const splitArray = url.split('/');
        const pokemonId = splitArray[splitArray.length - 1] || splitArray[splitArray.length - 2];

        return Number(pokemonId);
    }

    filterItems(items) {
        let newItems = this.props.filterItems
            ? this.props.filterItems(items)
            : items;

        if (this.state.searchText) {
            newItems = newItems.filter(pokemon => pokemon.name.includes(this.state.searchText));
        }

        return newItems;
    }

    renderPokemonList() {
        if (!this.state.data) {
            return <StatusMessage>No data yet ...</StatusMessage>;
        }

        if (this.state.error) {
            return <StatusMessage>{error.message}</StatusMessage>;
        }

        if (this.state.isLoading) {
            return <StatusMessage>Loading ...</StatusMessage>;
        }

        const pokemons = this.filterItems(this.state.data.results);

        return (
            <Fragment>
                <SearchInputContainer>
                    <SearchInput
                        value={this.state.searchText}
                        onChange={this.handleSearchChange}
                        placeholder={'Search pokemon...'}
                    />
                </SearchInputContainer>
                {pokemons.length === 0
                    ? <StatusMessage>No pokemons found</StatusMessage>
                    : <ScrollRenderingDispenser items={pokemons}>
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
                }
            </Fragment>
        );
    }

    render() {
        const apiRequest = ApiRequest.createPokemonApiRequest();
        const getAllRequest = localStorageCacheDecorator({
            key: 'pokemons',
            func: apiRequest.endpoints.pokemons.getAll
        });

        return (
            <Fragment>
                <Fetcher
                    request={() => getAllRequest({params: {limit: 151}})}
                    onChange={this.handleLoadChange}
                />
                {this.renderPokemonList()}
            </Fragment>
        );
    }
}

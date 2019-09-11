import React from 'react';
import PokemonsList from './../PokemonsList';

export default function PokemonsBag() {

    const getPokemonId = (url) => {
        const splitArray = url.split('/');
        const pokemonId = splitArray[splitArray.length - 1] || splitArray[splitArray.length - 2];

        return Number(pokemonId);
    };

    const filterBagPokemons = (pokemons) => {
        const pokemonBag = JSON.parse(localStorage.getItem('pokemonBag') || '[]');
        const newPokemons = pokemons.filter(item => {
            const pokemonId = getPokemonId(item.url);
            return pokemonBag.includes(pokemonId);
        });

        return newPokemons;
    };

    return (
      <PokemonsList filterItems={filterBagPokemons}/>
    );
}
import React from 'react';
import GalleryLayout from './../../layouts/GalleryLayout';
import PokemonListItem from './components/PokemonListItem/PokemonListItem';

export default function(props) {
    const array = new Array(151).fill(0);
    return <GalleryLayout>
        {array.map((item, index) => (
            <PokemonListItem
                key={index}
                pokemonId={12}
                imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
            />
        ))}
    </GalleryLayout>
}
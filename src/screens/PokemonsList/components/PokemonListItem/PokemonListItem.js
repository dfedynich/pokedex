import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledPokemonListItem = styled(({ imageURL, ...rest }) => <Link {...rest} />)`
    display: block;
    height: 100%;
    width: 100%;
    background-image: url(${props => props.imageURL});
    background-repeat: no-repeat;
    background-position: center;
    
    background-color: #ededed;
    border-radius: 3px;
    
    &:hover {
    background-color: #d6d6d6;
}
`;

export default function(props) {
    return (
        <StyledPokemonListItem imageURL={props.imageURL} to={`/pokemons/${props.pokemonId}`}></StyledPokemonListItem>
    );
}

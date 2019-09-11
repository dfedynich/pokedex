import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fetcher from './../../../../components/Fetcher';
import ApiRequest from './../../../../services/api/ApiRequest';

const StyledPokemonListItem = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    
    color: #4169E1;
    text-decoration: none;
    background: #ededed;
    background: radial-gradient(circle, rgba(255,255,255,1) 25%, rgba(237,237,237,1) 80%);
    border-radius: 3px;
    
    &:hover {
      background: #d6d6d6;
      background: radial-gradient(circle, rgba(255,255,255,1) 25%, rgba(214,214,214,1) 80%);
    }
`;

const PokemonImage = styled.p`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    
    margin: 0;
    padding-bottom: 8px;
    text-align: center;
`;

const PokemonName = styled.p`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    
    margin: 0;
    padding: 8px;
    
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    color: #4169E1;
`;

export default function PokemonListItem(props) {
    const pokemonName = props.name.charAt(0).toUpperCase() + props.name.slice(1);
    const apiRequest = ApiRequest.createGetApiRequest({url: props.url});

    return (
        <StyledPokemonListItem
            to={`/pokemons/${props.id}`}
        >
            <Fetcher request={() => apiRequest()}>
                {({data, isLoading, error}) => {

                    if (error) {
                        return 'N/A';
                    }

                    if (isLoading) {
                        return 'Loading...';
                    }

                    if (data && data.sprites && data.sprites.front_default) {
                        return <img alt={props.name} src={data.sprites.front_default} />
                    }

                    return 'N/A';
                }}
            </Fetcher>
            <PokemonName>{pokemonName}</PokemonName>
        </StyledPokemonListItem>
    );
}

PokemonListItem.propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
}
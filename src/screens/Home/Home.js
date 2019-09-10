import React, {Fragment} from 'react'
import RouteTabs from './../../components/RouteTabs';
import { Route } from 'react-router-dom';
import PokemonProfile from './../PokemonProfile';

export default function (props) {

    return (
        <Fragment>
            <RouteTabs routes={props.routes}/>
            <Route
                path="/pokemons/:pokemonId"
                exact={true}
                component={PokemonProfile}
            />
        </Fragment>
    );
}
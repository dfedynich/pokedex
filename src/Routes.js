import { Route } from 'react-router-dom';
import Home from './screens/Home';
import PokemonProfile from './screens/PokemonProfile';
import PokemonsList from './screens/PokemonsList';
import PokemonsBag from './screens/PokemonsBag';
import React from 'react';

const routes = [
    {
        path: "/",
        component: Home,
        routes: [
            {
                title: 'All',
                path: "/pokemons",
                exact: true,
                component: PokemonsList
            },
            {
                title: 'Bag',
                path: "/bag",
                exact: true,
                component: PokemonsBag
            }
        ]
    }
];

export function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export default routes;
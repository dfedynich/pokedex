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

                component: PokemonsList
            },
            {
                title: 'Bag',
                path: "/bag",

                component: PokemonsBag
            }
        ]
    }
];

export function RouteWithSubRoutes(route) {
    return (
        <Route
            path='/'
            render={props => (
                <div style={{display: props.location.pathname === route.path || route.path === '/'
                        ? "block"
                        : "none"
                }}>
                    <route.component {...props} routes={route.routes} />
                </div>

            )}
        />
    );
}

export default routes;


<Route exact path="/dc/:id" children={({ match, ...rest }) => (
    <div style={{display: match && match.params.id === id.toString()
            ? "block"
            : "none"
    }}>
        <Component {...rest} match={match} />
    </div>
)} />

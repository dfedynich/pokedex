import {RouteWithSubRoutes} from "../../Routes";
import { Link, Switch, Redirect } from 'react-router-dom';
import React from 'react'

export default function(props) {
    return (
        <div>
            <h2>Home</h2>
            <ul>
                <li>
                    <Link to="/pokemons">Pokemons</Link>
                </li>
                <li>
                    <Link to="/pokemons/bag">Bag</Link>
                </li>
            </ul>

            <Switch>
                {props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                <Redirect from="/" to="/pokemons" exact />
            </Switch>
        </div>
    );
}
import React from 'react';
import AppLayout from './layouts/AppLayout';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {default as routes, RouteWithSubRoutes} from './Routes';

const App = () => {
    return (
        <AppLayout>
            <Router>
                <Switch>
                    {routes.map((route, index) => (
                        <RouteWithSubRoutes
                            key={index}
                            {...route}
                        />
                    ))}
                </Switch>
            </Router>
        </AppLayout>
    );
};

export default App;
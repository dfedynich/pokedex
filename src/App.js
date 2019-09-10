import React from 'react';
import AppLayout from './layouts/AppLayout';
import { BrowserRouter as Router } from "react-router-dom";
import {default as routes, RouteWithSubRoutes} from './Routes';

const App = () => {
    return (
        <AppLayout>
            <Router>
                {routes.map((route, index) => (
                    <RouteWithSubRoutes
                        key={index}
                        {...route}
                    />
                ))}
            </Router>
        </AppLayout>
    );
};

export default App;
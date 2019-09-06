import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'modern-normalize';

const title = 'Pokedex';

ReactDOM.render(
    <App title={title} />,
    document.getElementById('app')
);

module.hot.accept();
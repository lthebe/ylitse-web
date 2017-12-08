import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import 'typeface-roboto/index.css';

import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}

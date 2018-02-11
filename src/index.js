import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import 'whatwg-fetch';
import 'typeface-roboto/index.css';

import Root from './Root';

const theme = createMuiTheme();
const root = (
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </MuiThemeProvider>
);

ReactDOM.render(root, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}

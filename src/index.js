import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import 'whatwg-fetch';
import 'typeface-roboto/index.css';

import Root from './Root';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f67f5d',
        },
        secondary: { main: '#00cca8' },
        contrastThreshold: 2,
        tonalOffset: 0.1,
        text: {
            primary: '#505050',
            secondary: '#888888',
            disabled: '#c0c0c0',
            hint: '#c0c0c0',
            divider: '#e6e7e8',
        },
        overrides: {
            /* TODO: override text fields to secondary color */
        },
    },
});

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

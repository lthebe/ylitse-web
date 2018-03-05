import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import 'whatwg-fetch';
import 'typeface-roboto/index.css';

import * as colors from './colors';
import Root from './Root';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.ORANGE,
            contrastText: colors.WHITE,
        },
        secondary: {
            main: colors.GREEN_PRIMARY,
            dark: colors.GREEN_SECONDARY,
            contrastText: colors.WHITE,
        },
        contrastThreshold: 2,
        tonalOffset: 0.1,
        background: {
            default: colors.GREY_VERY_LIGHT,
        },
        text: {
            primary: colors.GREY_DARK,
            secondary: colors.GREY_50,
            disabled: colors.GREY_30,
            hint: colors.GREY_30,
            divider: colors.GREY_10,
        },
    },
    overrides: {
        MuiFormLabel: {
            focused: {
                color: colors.GREEN_SECONDARY,
            },
        },
        MuiInput: {
            inkbar: {
                '&:after': {
                    backgroundColor: colors.GREEN_SECONDARY,
                },
            },
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

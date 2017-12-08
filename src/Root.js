import React from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import Navigation from './Navigation';

const theme = createMuiTheme();

const Root = () => (
    <MuiThemeProvider theme={theme}>
        <Navigation />
    </MuiThemeProvider>
);

export default Root;

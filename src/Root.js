import React from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import Navigation from './Navigation';
import ProfileSheet from './ProfileSheet';

const theme = createMuiTheme();

const Root = () => (
    <MuiThemeProvider theme={theme}>
        <Navigation />
        <ProfileSheet />
    </MuiThemeProvider>
);

export default Root;

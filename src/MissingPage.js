import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import Page from './Page';

const MissingPage = ({ location }) => (
    <Page>
        <Typography variant="display3" gutterBottom>
            Could not find page:
        </Typography>
        <Typography variant="display2" gutterBottom>
            <code>{location.pathname}</code>
        </Typography>
    </Page>
);

MissingPage.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default MissingPage;

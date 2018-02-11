import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import Page from './Page';

const MissingPage = ({ location }) => (
    <Page>
        <Typography type="display4" gutterBottom>
            Could not find
        </Typography>
        <Typography type="display3" gutterBottom>
            <code>{location.pathname}</code>
        </Typography>
    </Page>
);

MissingPage.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default MissingPage;

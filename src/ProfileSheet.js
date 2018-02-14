import React from 'react';
import Typography from 'material-ui/Typography';

import Page from './Page';
import AccountForm from './AccountForm';

const ProfileSheet = () => (
    <Page>
        <Typography variant="headline" component="h3">
            Create account
        </Typography>
        <AccountForm />
    </Page>
);

export default ProfileSheet;

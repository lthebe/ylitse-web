import React from 'react';
import Typography from 'material-ui/Typography';

import Page from './Page';
import ProfileForm from './ProfileForm';

const ProfileSheet = () => (
    <Page>
        <Typography variant="headline" component="h3">
            Create account
        </Typography>
        <ProfileForm />
    </Page>
);

export default ProfileSheet;

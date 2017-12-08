import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        marginTop: theme.spacing.unit * 4,
        marginLeft: '25%',
        marginRight: '25%',
        paddingTop: 24,
    }),
});

const ProfileSheet = props => (
    <Paper className={props.classes.root}>
        <Typography type="headline" component="h3">
            Create mentor account
        </Typography>
    </Paper>
);

ProfileSheet.propTypes = {
    classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};

export default withStyles(styles)(ProfileSheet);

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: theme.mixins.gutters({
        marginTop: theme.spacing.unit * 4,
        marginLeft: '20%',
        marginRight: '20%',
        paddingTop: 24,
        paddingBottom: 24,
        overflowX: 'auto',
    }),
});

const Page = props => (
    <Paper className={props.classes.root}>
        {props.children}
    </Paper>
);

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};

export default withStyles(styles)(Page);

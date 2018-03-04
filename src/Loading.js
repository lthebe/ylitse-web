import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = () => ({
    outer: {
        display: 'flex',
        flex: 1,
        marginTop: '10%',
    },
    progress: {
        position: 'relative',
        margin: 'auto',
    },
});

function Loading(props) {
    const { classes } = props;
    return (
        <div className={classes.outer}>
            <CircularProgress
                className={classes.progress}
                size={50}
            />
        </div>
    );
}

Loading.propTypes = {
    classes: PropTypes.shape({
        outer: PropTypes.string,
        progress: PropTypes.string,
    }).isRequired,
};

export default withStyles(styles)(Loading);

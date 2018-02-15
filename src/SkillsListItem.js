import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    card: {
        minWidth: 140,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    icon: {
        color: 'blue',
    },
});

function SkillsListItem(props) {
    const { classes, label, deleteSkill } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader title="Skills" />
                <CardContent>
                    <Typography className={classes.title}>{label}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        onClick={deleteSkill}
                        className={classes.icon}
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

SkillsListItem.propTypes = {
    classes: PropTypes.shape.isRequired,
    label: PropTypes.string.isRequired,
    deleteSkill: PropTypes.func.isRequired,
};

export default withStyles(styles)(SkillsListItem);

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    text: {
        noWrap: true,
        fontSize: 16,
    },
    card: {
        background: theme.palette.background.default,
        margin: [[5, 7, 5, 3]],
        paddingLeft: 8,
    },
    cardContent: {
        paddingTop: 6,
        paddingBottom: [6, '!important'],
    },
    iconButton: {
        '&:hover': {
            color: theme.palette.secondary.main,
        },
        marginLeft: 8,
        marginRight: -10,
    },
    icon: {
        fontSize: 22,
    },
});

const SkillsListItem = ({ label, classes, onDelete }) => (
    <Card
        className={classes.card}
    >
        <CardContent className={classes.cardContent}>
            <Typography
                className={classes.text}
            >
                {label}
                <IconButton
                    className={classes.iconButton}
                    onClick={onDelete}
                >
                    <DeleteIcon className={classes.icon} />
                </IconButton>
            </Typography>
        </CardContent>
    </Card>
);

SkillsListItem.propTypes = {
    label: PropTypes.string.isRequired,
    classes: PropTypes.shape({
        text: PropTypes.string,
        card: PropTypes.string,
        cardContent: PropTypes.string,
        iconButton: PropTypes.string,
        icon: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(SkillsListItem);

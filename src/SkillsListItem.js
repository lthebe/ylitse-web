import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
    text: {
        fontSize: 16,
    },
    card: {
        margin: [[10, 12, 5, 3]],
        paddingLeft: 8,
    },
    cardContent: {
        paddingTop: 6,
        paddingBottom: [6, '!important'],
    },
    iconButton: {
        marginLeft: 8,
        marginRight: -10,
    },
    icon: {
        fontSize: 22,
    },
});

class SkillsListItem extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        classes: PropTypes.shape({
            text: PropTypes.string,
            card: PropTypes.string,
            cardContent: PropTypes.string,
            iconButton: PropTypes.string,
            icon: PropTypes.string,
        }).isRequired,
        onDelete: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            actionsVisible: false,
        };
    }

    onMouseEnter = () => {
        this.setState({ actionsVisible: true });
    }

    onMouseLeave = () => this.setState({ actionsVisible: false });

    render() {
        const { label, classes, onDelete } = this.props;
        const { actionsVisible } = this.state;

        return (
            <Card
                className={classes.card}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <CardContent className={classes.cardContent}>
                    <Typography
                        className={classes.text}
                    >
                        {label}
                        <IconButton
                            color={actionsVisible ? 'secondary' : 'default'}
                            className={classes.iconButton}
                            onClick={onDelete}
                        >
                            <DeleteIcon className={classes.icon} />
                        </IconButton>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(SkillsListItem);

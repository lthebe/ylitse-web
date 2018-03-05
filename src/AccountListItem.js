import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

const styles = theme => ({
    firstCell: {
        paddingLeft: 0,
    },
    lastCell: {
        '&:last-child': {
            paddingRight: [0, '!important'],
            textAlign: ['right', '!important'],
            whiteSpace: 'nowrap',
        },
    },
    iconButton: {
        '&:hover': {
            color: theme.palette.secondary.main,
        },
        marginLeft: 5,
        marginRight: -16,
    },
    icon: {
        fontSize: 22,
    },
});

const AccountListItem = ({ account, classes, onDelete }) => (
    <TableRow>
        <TableCell className={classes.firstCell}>{account.role}</TableCell>
        <TableCell>{account.username}</TableCell>
        <TableCell>{account.email}</TableCell>
        <TableCell className={classes.lastCell}>
            <IconButton className={classes.iconButton}>
                <EditIcon className={classes.icon} />
            </IconButton>
            <IconButton className={classes.iconButton} onClick={onDelete}>
                <DeleteIcon className={classes.icon} />
            </IconButton>
        </TableCell>
    </TableRow>
);

AccountListItem.propTypes = {
    account: PropTypes.shape({
        role: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    classes: PropTypes.shape({
        firstCell: PropTypes.string,
        lastCell: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountListItem);

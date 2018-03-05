import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

const styles = () => ({
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
    lastIconButton: {
        marginRight: -16,
        fontSize: 22,
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
            <IconButton><EditIcon className={classes.icon} /></IconButton>
            <IconButton onClick={onDelete} className={classes.lastIconButton}>
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

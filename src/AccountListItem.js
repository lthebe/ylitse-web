import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import UpdateIcon from 'material-ui-icons/Update';
import DeleteIcon from 'material-ui-icons/Delete';

const AccountListItem = ({ role, username, email }) => (
    <TableRow>
        <TableCell>{role}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>
            <IconButton><UpdateIcon onClick={() => {}} /></IconButton>
            <IconButton onClick={() => {}}><DeleteIcon /></IconButton>
        </TableCell>
    </TableRow>
);

AccountListItem.propTypes = {
    role: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default AccountListItem;

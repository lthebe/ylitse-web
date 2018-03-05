import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions, DialogContent, DialogContentText, DialogTitle,
} from 'material-ui/Dialog';

const ConfirmationDialog = ({
    label, okLabel, onOkClick, onClose, ...props
}) => (
    <Dialog
        onClose={onClose}
        {...props}
    >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {label}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Cancel
            </Button>
            <Button color="primary" onClick={onOkClick}>
                {okLabel}
            </Button>
        </DialogActions>
    </Dialog>
);

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    okLabel: PropTypes.string,
    onOkClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

ConfirmationDialog.defaultProps = {
    okLabel: 'OK',
};

export default ConfirmationDialog;

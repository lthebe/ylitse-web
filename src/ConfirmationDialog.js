import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
    DialogActions, DialogContent, DialogContentText, DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const ConfirmationDialog = ({
    onCloseConfirmation, confirmationOpen, label, onAction, buttonLabel,
}) => (
    <Dialog
        open={confirmationOpen}
        onClose={onCloseConfirmation}
    >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {label}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCloseConfirmation}>
              Cancel
            </Button>
            <Button
                color="secondary"
                onClick={onAction}
            >
                {buttonLabel}
            </Button>
        </DialogActions>
    </Dialog>
);

ConfirmationDialog.propTypes = {
    onCloseConfirmation: PropTypes.func.isRequired,
    confirmationOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
};

export default ConfirmationDialog;

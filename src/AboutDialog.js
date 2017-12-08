import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';

// eslint-disable-next-line object-curly-newline
const AboutDialog = ({ uiVersion, apiVersion, onOkClick, ...props }) => (
    <Dialog {...props}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
            <DialogContentText>
                UI version: {uiVersion}
            </DialogContentText>
            <DialogContentText>
                API version: {apiVersion}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={onOkClick}>
                OK
            </Button>
        </DialogActions>
    </Dialog>
);

AboutDialog.propTypes = {
    uiVersion: PropTypes.string.isRequired,
    apiVersion: PropTypes.string.isRequired,
    onOkClick: PropTypes.func.isRequired,
};

export default AboutDialog;

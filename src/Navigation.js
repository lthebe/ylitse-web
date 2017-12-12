import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import InfoIcon from 'material-ui-icons/Info';

import { version as uiVersion } from '../package.json';
import About from './AboutDialog';

const styles = () => ({
    flex: {
        flex: 1,
    },
    infoButton: {
        marginLeft: 20,
        marginRight: -12,
    },
});

class Navigation extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            flex: PropTypes.string,
            infoButton: PropTypes.string,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            aboutOpen: false,
            apiVersion: 'N/A',
            errorOpen: false,
            errorMessage: 'Error',
        };
    }

    componentDidMount() {
        this.fetchVersion();
    }

    fetchVersion = async () => {
        try {
            const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
            const resp = await fetch(`${apiUrl}/version`);
            const data = await resp.json();

            this.setState({ apiVersion: data.api });
        } catch (e) {
            this.setState({ errorMessage: e.message });
            this.openError();
        }
    }

    openAbout = () => {
        this.setState({ aboutOpen: true });
    }

    closeAbout = () => {
        this.setState({ aboutOpen: false });
    }

    openError = () => {
        this.setState({ errorOpen: true });
    }

    closeError = () => {
        this.setState({ errorOpen: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar display="flex">
                    <Typography
                        type="title"
                        color="inherit"
                        className={classes.flex}
                    >
                        Ylitse Admin
                    </Typography>
                    <IconButton
                        color="contrast"
                        className={classes.infoButton}
                        onClick={this.openAbout}
                    >
                        <InfoIcon />
                    </IconButton>
                </Toolbar>
                <About
                    open={this.state.aboutOpen}
                    uiVersion={uiVersion}
                    apiVersion={this.state.apiVersion}
                    onOkClick={this.closeAbout}
                    onRequestClose={this.closeAbout}
                />
                <Snackbar
                    open={this.state.errorOpen}
                    onRequestClose={this.closeError}
                    message={this.state.errorMessage}
                    action={[
                        <IconButton color="inherit" onClick={this.closeError}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </AppBar>
        );
    }
}

export default withStyles(styles)(Navigation);

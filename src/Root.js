import React, { Component } from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import InfoIcon from 'material-ui-icons/Info';

import { version as uiVersion } from '../package.json';
import About from './AboutDialog';

class Root extends Component {
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
            const resp = await fetch('http://127.0.0.1:8080/version');
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
        return (
            <div>
                <Button
                    raised
                    color="primary"
                    onClick={this.openAbout}
                >
                    About
                    <InfoIcon />
                </Button>
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
            </div>
        );
    }
}

export default Root;

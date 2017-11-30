import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Info from 'material-ui-icons/Info';

import { version as uiVersion } from '../package.json';
import About from './AboutDialog';

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutOpen: false,
            apiVersion: 'N/A',
        };
    }

    async componentDidMount() {
        const resp = await fetch('http://127.0.0.1:8080/version');
        const data = await resp.json();

        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ apiVersion: data.api });
    }

    openAbout = () => {
        this.setState({ aboutOpen: true });
    }

    closeAbout = () => {
        this.setState({ aboutOpen: false });
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
                    <Info />
                </Button>
                <About
                    open={this.state.aboutOpen}
                    uiVersion={uiVersion}
                    apiVersion={this.state.apiVersion}
                    onOkClick={this.closeAbout}
                    onRequestClose={this.closeAbout}
                />
            </div>
        );
    }
}

export default Root;

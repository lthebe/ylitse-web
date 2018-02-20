import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import InfoIcon from 'material-ui-icons/Info';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import { version as uiVersion } from '../package.json';
import AboutDialog from './AboutDialog';

const styles = () => ({
    flex: {
        flex: 1,
    },
    iconButton: {
        marginLeft: 20,
        marginRight: -24,
    },
});

const AccountsLink = props => <Link to="/accounts" {...props} />;
const SkillsLink = props => <Link to="/skills" {...props} />;

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
            menuAnchor: null,
            errorOpen: false,
            errorMessage: '',
        };
    }

    componentDidMount() {
        this.fetchVersion();
    }

    fetchVersion = async () => {
        try {
            const resp = await fetch('/api/version', {
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const data = await resp.json();

            this.setState({ apiVersion: data.api });
        } catch (e) {
            this.openError(e.message);
        }
    }

    logout = () => {
        window.location.replace('/logout');
    }

    openAbout = () => {
        this.setState({ aboutOpen: true });
    }

    closeAbout = () => {
        this.setState({ aboutOpen: false });
    }

    openMenu = (event) => {
        this.setState({ menuAnchor: event.currentTarget });
    };

    closeMenu = () => {
        this.setState({ menuAnchor: null });
    };

    openError = (errorMessage) => {
        this.setState({ errorMessage, errorOpen: true });
    }

    closeError = () => {
        this.setState({ errorOpen: false });
    }

    render() {
        const { menuAnchor } = this.state;
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar display="flex">
                    <Typography
                        variant="title"
                        color="inherit"
                        className={classes.flex}
                    >
                        Ylitse Admin
                    </Typography>
                    <Button component={AccountsLink} color="inherit">
                        Accounts
                    </Button>
                    <Button component={SkillsLink} color="inherit">
                        Skills
                    </Button>
                    <IconButton
                        color="inherit"
                        className={classes.iconButton}
                        onClick={this.openAbout}
                    >
                        <InfoIcon />
                    </IconButton>
                    <IconButton
                        aria-owns={menuAnchor ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        color="inherit"
                        className={classes.iconButton}
                        onClick={this.openMenu}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
                <Menu
                    open={Boolean(menuAnchor)}
                    id="menu-appbar"
                    anchorEl={menuAnchor}
                    onClose={this.closeMenu}
                >
                    <MenuItem onClick={this.logout}>Sign out</MenuItem>
                </Menu>
                <AboutDialog
                    open={this.state.aboutOpen}
                    uiVersion={uiVersion}
                    apiVersion={this.state.apiVersion}
                    onOkClick={this.closeAbout}
                    onClose={this.closeAbout}
                />
                <Snackbar
                    open={this.state.errorOpen}
                    message={this.state.errorMessage}
                    autoHideDuration={3000}
                    action={
                        <IconButton color="inherit" onClick={this.closeError}>
                            <CloseIcon />
                        </IconButton>
                    }
                    onClose={this.closeError}
                />
            </AppBar>
        );
    }
}

export default withStyles(styles)(Navigation);

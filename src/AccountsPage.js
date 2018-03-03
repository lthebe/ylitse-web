import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import AddIcon from 'material-ui-icons/Add';
import Table, {
    TableRow, TableHead, TableCell, TableBody,
} from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

import Page from './Page';
import AccountListItem from './AccountListItem';

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 2,
    },
});

class AccountsPage extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            button: PropTypes.string,
        }).isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            feedbackOpen: false,
            feedbackMessage: '',
        };
    }

    componentDidMount() {
        this.fetchAccounts();
    }

    fetchAccounts = async () => {
        try {
            const resp = await fetch('/api/accounts', {
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const data = await resp.json();
            this.setState({
                accounts: data.resources,
            });
        } catch (e) {
            this.openFeedback(e.message);
        }
    };

    openFeedback = (feedbackMessage) => {
        this.setState({ feedbackMessage, feedbackOpen: true });
    }

    closeFeedback = () => {
        this.setState({ feedbackOpen: false });
    }

    render() {
        const { classes } = this.props;
        const {
            accounts, feedbackOpen, feedbackMessage,
        } = this.state;

        return (
            <Page>
                <Typography variant="headline" component="h3">
                    Accounts
                </Typography>
                {accounts.length ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Role</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map(account => (
                                <AccountListItem
                                    key={account.id}
                                    role={account.role}
                                    username={account.username}
                                    email={account.email}
                                />
                            ))}
                        </TableBody>
                    </Table> : <Typography>No accounts</Typography>}
                <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                >
                    Add Account
                    <AddIcon />
                </Button>
                <Snackbar
                    open={feedbackOpen}
                    message={feedbackMessage}
                    autoHideDuration={3000}
                    action={
                        <IconButton
                            color="inherit"
                            onClick={this.closeFeedback}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    onClose={this.closeFeedback}
                />
            </Page>
        );
    }
}
export default withStyles(styles)(AccountsPage);

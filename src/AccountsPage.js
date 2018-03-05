import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableRow, TableHead, TableCell, TableBody,
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import PersonAddIcon from 'material-ui-icons/PersonAdd';

import Page from './Page';
import AccountListItem from './AccountListItem';
import ConfirmationDialog from './ConfirmationDialog';

const styles = theme => ({
    table: {
        overflowX: 'auto',
    },
    firstCell: {
        paddingLeft: 0,
    },
    lastCell: {
        '&:last-child': {
            paddingRight: [0, '!important'],
            textAlign: ['right', '!important'],
        },
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
    buttonIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class AccountsPage extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            button: PropTypes.string,
            firstCell: PropTypes.string,
            lastCell: PropTypes.string,
        }).isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            selectedAccount: undefined,
            confirmationOpen: false,
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

    deleteAccount = async ({ id }) => {
        try {
            const resp = await fetch(`/api/accounts/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const deleted = this.state.accounts.find(s => s.id === id);
            if (!resp.ok) {
                this.openFeedback(`Can't delete ${deleted.username} account`);
                this.setState({ confirmationOpen: false });
                return;
            }

            this.setState(prevState => ({
                accounts: prevState.accounts.filter(s => s.id !== id),
                confirmationOpen: false,
                feedbackOpen: true,
                feedbackMessage: `${deleted.username} account deleted`,
            }));
        } catch (e) {
            this.openFeedback(e.message);
        }
    }

    openFeedback = (feedbackMessage) => {
        this.setState({ feedbackMessage, feedbackOpen: true });
    }

    closeFeedback = () => {
        this.setState({ feedbackOpen: false });
    }

    openConfirmation = (id) => {
        this.setState(prevState => ({
            selectedAccount: prevState.accounts.find(s => s.id === id),
            confirmationOpen: true,
        }));
    }

    closeConfirmation = () => {
        this.setState({ selectedAccount: undefined, confirmationOpen: false });
    }

    render() {
        const { classes } = this.props;
        const {
            accounts, feedbackOpen, feedbackMessage, selectedAccount,
            confirmationOpen,
        } = this.state;

        return (
            <Page>
                <Typography variant="headline" component="h3">
                    Accounts
                </Typography>
                <Button
                    variant="raised"
                    color="secondary"
                    className={classes.button}
                >
                    Add new
                    <PersonAddIcon className={classes.buttonIcon} />
                </Button>
                {accounts.length > 0 &&
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.firstCell}>
                                    Role
                                </TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell className={classes.lastCell}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map(account => (
                                <AccountListItem
                                    key={account.id}
                                    account={account}
                                    onDelete={
                                        () => this.openConfirmation(account.id)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                }
                {selectedAccount &&
                    <ConfirmationDialog
                        onAction={() => this.deleteAccount(selectedAccount)}
                        onCloseConfirmation={this.closeConfirmation}
                        confirmationOpen={confirmationOpen}
                        buttonLabel="Delete"
                        label={
                            `Delete ${selectedAccount.username} account?`}
                    />
                }
                {accounts.length === 0 &&
                    <Typography variant="display3">No accounts</Typography>
                }
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

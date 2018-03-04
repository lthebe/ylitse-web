import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions, DialogContent, DialogContentText, DialogTitle,
} from 'material-ui/Dialog';
import GridList from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import { withStyles } from 'material-ui/styles';

import Page from './Page';
import SkillsListItem from './SkillsListItem';

const styles = theme => ({
    input: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
    },
});

class SkillsPage extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            input: PropTypes.string,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            skills: [],
            newSkillName: '',
            selectedSkill: undefined,
            errors: {},
            confirmationOpen: false,
            feedbackOpen: false,
            feedbackMessage: '',
        };
    }

    componentDidMount() {
        this.fetchSkills();
    }

    fetchSkills = async () => {
        try {
            const resp = await fetch('/api/skills', {
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const data = await resp.json();

            this.setState({ skills: data.resources });
        } catch (e) {
            this.openFeedback(e.message);
        }
    };

    sendSkill = async (skill) => {
        try {
            const resp = await fetch('/api/skills', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ name: skill }),
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const saved = await resp.json();

            this.setState(prevState => ({
                skills: [saved, ...prevState.skills],
                newSkillName: '',
                feedbackOpen: true,
                feedbackMessage: `${saved.name} skill saved`,
            }));
        } catch (e) {
            this.openFeedback(e.message);
        }
    }

    addSkill = (event) => {
        switch (event.key) {
            case 'Enter': {
                event.preventDefault();
                if (this.state.newSkillName
                    && !this.state.errors.newSkillName) {
                    this.sendSkill(this.state.newSkillName);
                }
                break;
            }
            case 'Escape': {
                event.preventDefault();
                if (!this.state.newSkillName) {
                    return;
                }
                this.setState(prevState => ({
                    newSkillName: '',
                    errors: { ...prevState.errors, newSkillName: '' },
                }));
                break;
            }
            default:
                break;
        }
    }

    updateText = ({ target }) => {
        let valid = false;
        let error = '';

        switch (target.name) {
            case 'newSkillName':
                valid = !this.state.skills.some(skill => (
                    skill.name.toLowerCase() === target.value.toLowerCase()
                ));
                error = valid ? '' : 'Already in the list';
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            [target.name]: target.value,
            errors: { ...prevState.errors, [target.name]: error },
        }));
    }

    deleteSkill = async ({ id }) => {
        try {
            const resp = await fetch(`/api/skills/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }

            const deleted = this.state.skills.find(s => s.id === id);

            if (!resp.ok) {
                this.openFeedback(`Couldn't delete ${deleted.name} skill`);
            }

            this.setState(prevState => ({
                skills: prevState.skills.filter(s => s.id !== id),
                confirmationOpen: false,
                feedbackOpen: true,
                feedbackMessage: `${deleted.name} skill deleted`,
            }));
        } catch (e) {
            this.openFeedback(e.message);
        }
    }

    openConfirmation = (id) => {
        this.setState(prevState => ({
            selectedSkill: prevState.skills.find(s => s.id === id),
            confirmationOpen: true,
        }));
    }

    closeConfirmation = () => {
        this.setState({ selectedSkill: undefined, confirmationOpen: false });
    }

    openFeedback = (feedbackMessage) => {
        this.setState({ feedbackMessage, feedbackOpen: true });
    }

    closeFeedback = () => {
        this.setState({ feedbackOpen: false });
    }

    render() {
        const { classes } = this.props;
        const {
            skills, newSkillName, selectedSkill, errors, confirmationOpen,
            feedbackOpen, feedbackMessage,
        } = this.state;

        return (
            <Page>
                <Typography variant="headline" component="h3">
                    Mentor skills
                </Typography>
                <TextField
                    name="newSkillName"
                    label="Add a skill"
                    value={newSkillName}
                    className={classes.input}
                    error={Boolean(errors.newSkillName)}
                    helperText={errors.newSkillName}
                    onChange={this.updateText}
                    onKeyDown={this.addSkill}
                />
                {skills.length > 0 &&
                    <GridList className={classes.input}>
                        {skills.map(skill => (
                            <SkillsListItem
                                key={skill.id}
                                label={skill.name}
                                onDelete={() => this.openConfirmation(skill.id)}
                            />
                        ))}
                    </GridList>
                }
                {skills.length === 0 &&
                    <Typography variant="display3">No mentor skills</Typography>
                }
                {selectedSkill &&
                    <Dialog
                        open={confirmationOpen}
                        onClose={this.closeConfirmation}
                    >
                        <DialogTitle>Confirm</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Really delete {selectedSkill.name} skill?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeConfirmation}>
                                Cancel
                            </Button>
                            <Button
                                color="secondary"
                                onClick={() => this.deleteSkill(selectedSkill)}
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
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

export default withStyles(styles)(SkillsPage);

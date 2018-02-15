import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Snackbar from 'material-ui/Snackbar';
import GridList from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SkillsListItem from './SkillsListItem';
import Page from './Page';

const styles = theme => ({
    row: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        dislay: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleBar: {
        background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

class SkillsPage extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string,
            gridList: PropTypes.string,
            titleBar: PropTypes.string,
        }).isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            errorOpen: false,
            errorMessage: '',
            newSkill: '',
            skills: [],
        };
    }
    componentDidMount() {
        this.fetchSkills();
    }

    fetchSkills = async () => {
        try {
            // basically, all are same apiUrl, can I move somewhere?
            const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
            const resp = await fetch(`${apiUrl}/skills`);
            const data = await resp.json();
            this.setState({ skills: data.resources });
        } catch (e) {
            this.openError(e.message);
        }
    };

    sendSkill = async (skill) => {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
        try {
            await fetch(`${apiUrl}/skills`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(skill),
            });
            this.fetchSkills();
        } catch (e) {
            this.openError(e.message);
        }
    }

    openError = (errorMessage) => {
        this.setState({ errorMessage, errorOpen: true });
    }

    closeError = () => {
        this.setState({ errorOpen: false });
    }

    deleteSkill = async (id) => {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
        try {
            await fetch(`${apiUrl}/skills/${id}`, {
                method: 'DELETE',
            });
            this.setState(prevState => ({
                skills: prevState.skills.filter(s => s.id !== id),
            }));
        } catch (e) {
            this.openError(e.message);
        }
    }

    addSkill = (event) => {
        switch (event.key) {
            case 'Enter': {
                if (this.state.errors.newSkill || !this.state.newSkill) {
                    return;
                }
                this.sendSkill({ name: this.state.newSkill });
                this.setState({
                    newSkill: '',
                });
                break;
            }
            case 'Escape': {
                this.setState(prevState => ({
                    newSkill: '',
                    errors: { ...prevState.errors, newSkill: '' },
                }));
                break;
            }
            default:
                break;
        }
    }

    updateValue = ({ target }) => {
        const { name, value } = target;
        const { errors } = this.state;
        let valid;
        switch (name) {
            case 'newSkill':
                valid = !(this.state.skills
                    .some(skill =>
                        (skill.name.toLowerCase() === value.toLowerCase())));
                errors.newSkill = valid ? '' : 'Already in list';
                break;
            default:
                break;
        }
        this.setState({
            [target.name]: target.value,
            errors,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Page>
                <Typography variant="headline" component="h3">
                 Mentor skills
                </Typography>
                <TextField
                    name="newSkill"
                    label="Add a skill"
                    className={classes.row}
                    value={this.state.newSkill}
                    error={Boolean(this.state.errors.newSkill)}
                    helperText={this.state.errors.newSkill}
                    onChange={this.updateValue}
                    onKeyDown={this.addSkill}
                />

                <div className={classes.root}>
                    <GridList
                        cellHeight={60}
                        spacing={5}
                        className={classes.gridList}
                    >
                        {this.state.skills
                            .map(skill => (
                                <SkillsListItem
                                    key={skill.id}
                                    deleteSkill={() => {
                                        this.deleteSkill(skill.id);
                                    }}
                                    label={skill.name}
                                />
                            ))}
                    </GridList>
                </div>
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
            </Page>
        );
    }
}

export default withStyles(styles)(SkillsPage);

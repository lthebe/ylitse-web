import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import {
    FormControl, FormControlLabel, FormGroup, FormLabel,
} from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import SaveIcon from 'material-ui-icons/Save';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import CheckboxInput from './CheckboxInput';

const styles = theme => ({
    row: {
        marginBottom: theme.spacing.unit,
    },
    radioRow: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
    },
    checkboxRow: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: 0,
    },
    chipRow: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3,
    },
    buttonIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class ProfileForm extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            row: PropTypes.string,
            radioRow: PropTypes.string,
            checkboxRow: PropTypes.string,
            chipRow: PropTypes.string,
            chipContainer: PropTypes.string,
            chip: PropTypes.string,
            button: PropTypes.string,
            buttonIcon: PropTypes.string,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            nickname: '',
            phone: '',
            email: '',
            gender: '',
            birthyear: 2000,
            area: '',
            story: '',
            skills: [],
            newSkill: '',
            languages: {
                Finnish: false,
                Swedish: false,
                English: false,
                Russian: false,
            },
            commChannels: {
                Phone: false,
                Email: false,
            },
            errors: {},
            errorOpen: false,
            errorMessage: '',
        };
    }

    updateValue = ({ target }) => {
        let error = '';

        switch (target.name) {
            case 'newSkill':
                if (this.state.skills.includes(target.value)) {
                    error = 'Already in the list';
                }
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            [target.name]: target.value,
            errors: { ...prevState.errors, [target.name]: error },
        }));
    }

    addSkill = (event) => {
        switch (event.key) {
            case 'Enter': {
                if (this.state.errors.newSkill) {
                    return;
                }
                this.setState(prevState => ({
                    newSkill: '',
                    skills: [...prevState.skills, prevState.newSkill],
                }));
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

    deleteSkill = skill => () => {
        this.setState(prevState => ({
            skills: prevState.skills.filter(s => s !== skill),
        }));
    }

    updateCheckboxes = checkboxes => ({ target }, checked) => {
        this.setState(prevState => ({
            [checkboxes]: { ...prevState[checkboxes], [target.name]: checked },
        }));
    }

    sendProfile = async (event) => {
        event.preventDefault();

        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
        const data = {
            username: this.state.username,
            password: this.state.password,
            nickname: this.state.nickname,
            phone: this.state.phone,
            email: this.state.email,
            gender: this.state.gender,
            birth_year: this.state.birthyear,
            area: this.state.area,
            languages: Object.keys(this.state.languages)
                .filter(lang => this.state.languages[lang]),
            skills: this.state.skills,
            comm_channels: Object.keys(this.state.commChannels)
                .filter(ch => this.state.commChannels[ch]),
            story: this.state.story,
        };

        console.log(`POSTing profile to ${apiUrl}/mentors:`);
        console.log(data);

        try {
            const resp = await fetch(`${apiUrl}/mentors`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            });
            const ret = await resp.json();

            console.log('Response:');
            console.log(ret);
        } catch (e) {
            this.setState({ errorMessage: e.message });
            this.openError();
        }

        this.setState({
            username: '',
            password: '',
            nickname: '',
            phone: '',
            email: '',
            gender: '',
            birthyear: 2000,
            area: '',
            languages: {},
            skills: [],
            commChannels: {},
            story: '',
        });
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
            <form autoComplete="off">
                <FormGroup>
                    <TextField
                        label="Username"
                        name="username"
                        value={this.state.username}
                        required
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        helperText="Use a strong password"
                        required
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <TextField
                        label="Screen name"
                        name="nickname"
                        value={this.state.nickname}
                        required
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <TextField
                        name="phone"
                        label="Phone number"
                        value={this.state.phone}
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={this.state.email}
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <FormControl
                        component="fieldset"
                        required
                        className={classes.radioRow}
                    >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={this.state.gender}
                            onChange={this.updateValue}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        name="birthyear"
                        label="Birth year"
                        type="number"
                        value={this.state.birthyear}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <TextField
                        name="area"
                        label="Area"
                        value={this.state.area}
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <CheckboxInput
                        label="Languages"
                        data={this.state.languages}
                        className={classes.checkboxRow}
                        onChange={this.updateCheckboxes('languages')}
                    />
                    <FormControl
                        component="fieldset"
                        className={classes.chipRow}
                    >
                        <FormLabel component="legend">Skills</FormLabel>
                        <FormGroup row className={classes.chipContainer}>
                            {this.state.skills.map(skill => (
                                <Chip
                                    key={skill}
                                    label={skill}
                                    className={classes.chip}
                                    onRequestDelete={this.deleteSkill(skill)}
                                />
                            ))}
                            <TextField
                                name="newSkill"
                                label="Add a skill"
                                value={this.state.newSkill}
                                className={classes.row}
                                error={Boolean(this.state.errors.newSkill)}
                                helperText={this.state.errors.newSkill}
                                onChange={this.updateValue}
                                onKeyDown={this.addSkill}
                            />
                        </FormGroup>
                    </FormControl>
                    <CheckboxInput
                        label="Communication channels"
                        data={this.state.commChannels}
                        className={classes.checkboxRow}
                        onChange={this.updateCheckboxes('commChannels')}
                    />
                    <TextField
                        name="story"
                        label="Story"
                        value={this.state.story}
                        helperText="Tell something about yourself"
                        multiline
                        rows="1"
                        rowsMax="8"
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                </FormGroup>
                <Button
                    raised
                    color="primary"
                    className={classes.button}
                    onClick={this.sendProfile}
                >
                    Create
                    <SaveIcon className={classes.buttonIcon} />
                </Button>
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
            </form>
        );
    }
}

export default withStyles(styles)(ProfileForm);

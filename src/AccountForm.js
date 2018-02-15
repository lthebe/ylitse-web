import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
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

import MentorForm from './MentorForm';
import PasswordField from './PasswordField';

const styles = theme => ({
    row: {
        marginBottom: theme.spacing.unit,
    },
    radioRow: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: 0,
    },
    checkboxRow: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: 0,
    },
    formControl: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    button: {
        marginTop: theme.spacing.unit * 2,
    },
    buttonIcon: {
        marginLeft: theme.spacing.unit,
    },
});
const availableRoles = [
    'Mentee',
    'Mentor',
    'Admin',
];
const availableGenders = [
    'Male',
    'Female',
];
const initialFormState = {
    role: availableRoles[0],
    username: '',
    password: '',
    nickname: '',
    phone: '',
    email: '',
    gender: availableGenders[0],
    birthYear: '',
    area: '',
    languages: {
        Finnish: false,
        Swedish: false,
        English: false,
        Russian: false,
    },
    skills: [],
    channels: {
        Phone: false,
        Email: false,
    },
    story: '',
    errors: {
        username: undefined,
        password: undefined,
        nickname: undefined,
        phone: undefined,
        email: undefined,
    },
    formValid: false,
    availableSkills: [],
};

class AccountForm extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            row: PropTypes.string,
            radioRow: PropTypes.string,
            checkboxRow: PropTypes.string,
            button: PropTypes.string,
            buttonIcon: PropTypes.string,
            formControl: PropTypes.string,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            ...initialFormState,
            feedback: '',
            feedbackOpen: false,
        };
    }

    componentDidMount() {
        this.fetchSkills();
    }

   fetchSkills = async () => {
       try {
           // basically, all are same apiUrl, can I move somewhere?
           // probably when the redux comes to play, we will
           // take fetchSkills out somewhere as it is everywhere?
           const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
           const resp = await fetch(`${apiUrl}/skills`);
           const data = await resp.json();
           this.setState({ availableSkills: data.resources });
       } catch (e) {
           this.openError(e.message);
       }
   };

    updateValue = ({ target }) => {
        const { name, value } = target;
        const { errors } = this.state;
        let valid;

        switch (name) {
            case 'role':
                this.checkFormValidity(value);
                break;
            case 'username':
                valid = value.length > 2;
                errors.username = valid ? '' : 'Username is too short';
                break;
            case 'password':
                valid = value.length > 6;
                errors.password = valid ? '' : 'Password is too short';
                break;
            case 'nickname':
                valid = value.length > 2;
                errors.nickname = valid ? '' : 'Screen name is too short';
                break;
            case 'phone':
                valid = /^\+?[0-9()-]+$/.test(value);
                errors.phone = valid ? '' : 'Invalid phone number';
                break;
            case 'email':
                valid = /\S+@\S+\.\S+/.test(value);
                errors.email = valid ? '' : 'Invalid email address';
                break;
            case 'birthYear':
                valid = value === '' ||
                        /^\d{4}$/.test(value) &&
                        parseInt(value, 10) >= 1900 &&
                        parseInt(value, 10) <= new Date().getFullYear();
                errors.birthYear = valid ? '' : 'Invalid birth year';
                break;
            default:
                break;
        }
        this.setState({
            [target.name]: target.value,
            errors,
        }, () => this.checkFormValidity(this.state.role));
    }

    checkFormValidity = (role) => {
        const { errors } = this.state;
        const formValid = (role === 'Mentor') ? Object.values(errors)
            .every(e => e === '') :
            Object.entries(errors)
                .filter(x => ['username', 'password', 'nickname']
                    .includes(x[0])).every(e => e[1] === '');
        this.setState({
            formValid,
        });
    }

    updateSkills = (event) => {
        this.setState({ skills: event.target.value });
    }

    updateCheckboxes = checkboxes => ({ target }, checked) => {
        this.setState(prevState => ({
            [checkboxes]: { ...prevState[checkboxes], [target.name]: checked },
        }));
    }

    sendProfile = async (event) => {
        event.preventDefault();

        const {
            role, username, password, nickname, phone, email, gender,
            birthYear, area, languages, skills, channels, story,
        } = this.state;
        const pickedLangs = Object.keys(languages).filter(l => languages[l]);
        const pickedChannels = Object.keys(channels).filter(c => channels[c]);
        const data = {
            role: role.toLowerCase(),
            username,
            password,
            nickname,
            phone,
            email,
            gender: gender.toLowerCase(),
            birth_year: parseInt(birthYear, 10),
            area,
            languages: pickedLangs.map(l => l.toLowerCase()),
            skills,
            channels: pickedChannels.map(ch => ch.toLowerCase()),
            story,
        };

        try {
            const resp = await fetch('/api/accounts', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const saved = await resp.json();

            this.setState({
                ...initialFormState,
                feedbackOpen: true,
                feedback: `Account for ${saved.username} created`,
            });
        } catch (e) {
            this.setState({ feedbackOpen: true, feedback: e.message });
        }
    }

    closeFeedback = () => {
        this.setState({ feedbackOpen: false });
    }

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        const props = {
            availableSkills: ['Cooking', 'Parenting'],
            availableGenders,
            updateCheckboxes: this.updateCheckboxes,
            updateValue: this.updateValue,
            updateSkills: this.updateSkills,
        };

        return (
            <form autoComplete="off">
                <FormGroup>
                    <FormControl
                        component="fieldset"
                        required
                        className={classes.radioRow}
                    >
                        <FormLabel component="legend">Account type</FormLabel>
                        <RadioGroup
                            name="role"
                            value={this.state.role}
                            row
                            onChange={this.updateValue}
                        >
                            {availableRoles.map(role => (
                                <FormControlLabel
                                    key={role}
                                    label={role}
                                    value={role}
                                    control={<Radio />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        name="username"
                        label="Username"
                        value={this.state.username}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                        required
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <PasswordField
                        name="password"
                        label="Password"
                        value={this.state.password}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        required
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    <TextField
                        name="nickname"
                        label="Screen name"
                        value={this.state.nickname}
                        error={Boolean(errors.nickname)}
                        helperText={errors.nickname}
                        required
                        className={classes.row}
                        onChange={this.updateValue}
                    />
                    {this.state.role === 'Mentor' &&
                        <MentorForm {...this.state} {...props} />}
                </FormGroup>
                <Button
                    variant="raised"
                    color="primary"
                    disabled={!this.state.formValid}
                    className={classes.button}
                    onClick={this.sendProfile}
                >
                    Create
                    <SaveIcon className={classes.buttonIcon} />
                </Button>
                <Snackbar
                    open={this.state.feedbackOpen}
                    message={this.state.feedback}
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
            </form>
        );
    }
}

export default withStyles(styles)(AccountForm);

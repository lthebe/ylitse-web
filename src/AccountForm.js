import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { FormControl, FormGroup } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui-icons/Close';
import SaveIcon from 'material-ui-icons/Save';

import { withStyles } from 'material-ui/styles';

import CheckboxGroupControl from './CheckboxGroupControl';
import PasswordField from './PasswordField';
import RadioGroupControl from './RadioGroupControl';

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
    'Mentor',
    'Mentee',
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
            const resp = await fetch('/api/skills', {
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const data = await resp.json();

            this.setState({ availableSkills: data.resources.map(r => r.name) });
        } catch (e) {
            this.setState({ feedbackOpen: true, feedback: e.message });
        }
    };

    updateValue = ({ target }) => {
        const { name, value } = target;
        const { errors } = this.state;
        let valid;

        switch (name) {
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
            formValid: Object.values(errors).every(e => e === ''),
            errors,
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

    renderTextField = (name, label, required = false, password = false) => {
        const FieldComponent = password ? PasswordField : TextField;

        return (
            <FieldComponent
                name={name}
                label={label}
                value={this.state[name]}
                error={Boolean(this.state.errors[name])}
                helperText={this.state.errors[name]}
                required={required}
                className={this.props.classes.row}
                onChange={this.updateValue}
            />
        );
    }

    renderCommonFields = () => {
        const { classes } = this.props;
        const { role } = this.state;

        return (
            <FormGroup>
                <RadioGroupControl
                    name="role"
                    label="Account type"
                    value={role}
                    options={availableRoles}
                    className={classes.radioRow}
                    onChange={this.updateValue}
                />
                {this.renderTextField('username', 'Username', true)}
                {this.renderTextField('password', 'Password', true, true)}
                {this.renderTextField('nickname', 'Screen name')}
            </FormGroup>
        );
    }

    renderMentorFields = () => {
        const { classes } = this.props;
        const {
            gender, languages, skills, availableSkills, channels, story,
        } = this.state;

        return (
            <FormGroup>
                {this.renderTextField('phone', 'Phone number')}
                {this.renderTextField('email', 'Email')}
                <RadioGroupControl
                    name="gender"
                    label="Gender"
                    value={gender}
                    options={availableGenders}
                    className={classes.radioRow}
                    onChange={this.updateValue}
                />
                {this.renderTextField('birthYear', 'Birth year')}
                {this.renderTextField('area', 'Area')}
                <CheckboxGroupControl
                    label="Languages"
                    options={languages}
                    className={classes.checkboxRow}
                    onChange={this.updateCheckboxes('languages')}
                />
                <FormControl
                    disabled={availableSkills.length === 0}
                    className={classes.formControl}
                >
                    <InputLabel htmlFor="name-multiple">Skills</InputLabel>
                    <Select
                        multiple
                        className={classes.row}
                        value={skills}
                        onChange={this.updateSkills}
                        input={<Input id="name-multiple" />}
                    >
                        {availableSkills.map(skill => (
                            <MenuItem key={skill} value={skill}>
                                {skill}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <CheckboxGroupControl
                    label="Communication channels"
                    options={channels}
                    className={classes.checkboxRow}
                    onChange={this.updateCheckboxes('channels')}
                />
                <TextField
                    name="story"
                    label="Story"
                    value={story}
                    helperText="Tell something about yourself"
                    multiline
                    rows="1"
                    rowsMax="8"
                    className={classes.row}
                    onChange={this.updateValue}
                />
            </FormGroup>
        );
    }

    render() {
        const { classes } = this.props;
        const {
            role, feedbackOpen, feedback, formValid,
        } = this.state;

        return (
            <form autoComplete="off">
                {this.renderCommonFields()}
                {role === 'Mentor' && this.renderMentorFields()}
                <Button
                    variant="raised"
                    color="primary"
                    disabled={!formValid}
                    className={classes.button}
                    onClick={this.sendProfile}
                >
                    Create
                    <SaveIcon className={classes.buttonIcon} />
                </Button>
                <Snackbar
                    open={feedbackOpen}
                    message={feedback}
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

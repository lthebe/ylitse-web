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
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';

import CheckboxGroup from './CheckboxGroup';
import PasswordField from './PasswordField';

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
    formControl: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    menu: {
        marginTop: theme.spacing.unit,
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const skillset = [
    'Cooking',
    'Baby sitting',
    'Parenting',
    'Legal',
    'Education',
];

const initialFormState = {
    username: '',
    password: '',
    nickname: '',
    phone: '',
    email: '',
    gender: '',
    birthyear: 2000,
    area: '',
    languages: {
        Finnish: false,
        Swedish: false,
        English: false,
        Russian: false,
    },
    skills: [],
    account: '',
    commChannels: {
        Phone: false,
        Email: false,
    },
    story: '',
    errors: {},
};

class ProfileForm extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            row: PropTypes.string,
            radioRow: PropTypes.string,
            checkboxRow: PropTypes.string,
            menu: PropTypes.string,
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
            emailValid: false,
            userValid: false,
            passwdValid: false,
            nickValid: false,
            genderValid: false,
            formValid: false,
            accountValid: false,
            skills: [],
        };
    }
    updateValue = ({ target }) => {
        this.setState(
            { [target.name]: target.value },
            () => { this.validateField(target.name, target.value); },
        );
    }
    validateField = (fieldName, value) => {
        const validationErrors = this.state.errors;
        let {
            userValid, passwdValid, nickValid, emailValid,
            genderValid, accountValid,
        } = this.state;

        switch (fieldName) {
            case 'username':
                userValid = value.length > 2;
                validationErrors.username =
                userValid ? '' : 'Username is too short';
                break;

            case 'password':
                passwdValid = value.length > 6;
                validationErrors.password =
                passwdValid ? '' : 'Password is too short';
                break;

            case 'gender':
                genderValid = value.length > 2;
                validationErrors.gender =
                genderValid ? '' : 'Gender must be set';
                break;

            case 'account':
                accountValid = value.length > 2;
                validationErrors.account =
                accountValid ? '' : 'Accounnt must be selected';
                break;

            case 'nickname':
                nickValid = value.length > 2;
                validationErrors.nickname =
                nickValid ? '' : 'Screen name is too short';
                break;

            case 'email':
                emailValid = /\S+@\S+\.\S+/.test(value);
                validationErrors.email =
                emailValid ? '' : 'Invalid email address';
                break;

            default:
                break;
        }
        this.setState({
            errors: validationErrors,
            userValid,
            passwdValid,
            nickValid,
            emailValid,
            genderValid,
            accountValid,
        }, this.validate);
    }
    validate() {
        this.setState({
            formValid: this.state.userValid && this.state.passwdValid &&
          this.state.nickValid && this.state.emailValid &&
          this.state.genderValid && this.state.accountValid,
        });
    }
    handleChange = (event) => {
        this.setState({ skills: event.target.value });
    }

    updateCheckboxes = checkboxes => ({ target }, checked) => {
        this.setState(prevState => ({
            [checkboxes]: { ...prevState[checkboxes], [target.name]: checked },
        }));
    }

    sendProfile = async (event) => {
        event.preventDefault();

        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
        const { username } = this.state;
        const ext = this.state.account === 'mentor' ? 'mentors' : 'mentees';
        const data = {
            username,
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

        try {
            const resp = await fetch(`${apiUrl}/${ext}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            });
            const saved = await resp.json();

            this.setState({
                ...initialFormState,
                feedbackOpen: true,
                feedback: `Profile for ${saved.username} created`,
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

        return (
            <form autoComplete="off">
                <FormControl
                    component="fieldset"
                    className={classes.radioRow}
                >
                    <FormLabel component="legend">Select account type</FormLabel>
                    <RadioGroup
                        name="account"
                        value={this.state.account}
                        row
                        onChange={this.updateValue}
                    >
                        <FormControlLabel
                            label="Mentor"
                            value="mentor"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="Mentee"
                            value="mentee"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </FormControl>
                <FormGroup>
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
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        required
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
                            name="gender"
                            value={this.state.gender}
                            row
                            onChange={this.updateValue}
                        >
                            <FormControlLabel
                                label="Male"
                                value="male"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label="Female"
                                value="female"
                                control={<Radio />}
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
                    <CheckboxGroup
                        label="Languages"
                        data={this.state.languages}
                        className={classes.checkboxRow}
                        onChange={this.updateCheckboxes('languages')}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-multiple">Skills</InputLabel>
                        <Select
                            multiple
                            className={classes.row}
                            value={this.state.skills}
                            onChange={this.handleChange}
                            input={<Input id="name-multiple" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight:
                                      ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
                                        width: 200,
                                    },
                                },
                            }}
                        >
                            {skillset.map(skill => (
                                <MenuItem
                                    key={skill}
                                    value={skill}
                                    className={classes.menu}

                                >
                                    {skill}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <CheckboxGroup
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

export default withStyles(styles)(ProfileForm);

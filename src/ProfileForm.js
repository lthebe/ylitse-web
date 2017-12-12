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
            phone: '',
            email: '',
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
        };
    }

    updateText = ({ target }) => {
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

    updateLanguages = ({ target }, checked) => {
        const langs = this.state.languages;
        langs[target.name] = checked;
        this.setState({
            languages: langs,
        });
    }

    updateCommChannels = ({ target }, checked) => {
        const comms = this.state.commChannels;
        comms[target.name] = checked;
        this.setState({
            commChannels: comms,
        });
    }

    sendProfile = (event) => {
        event.preventDefault();

        console.log('Sending profile...');
        console.log(`Username: ${this.state.username}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`Phone: ${this.state.phone}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Area: ${this.state.area}`);
        console.log(`Story: ${this.state.story}`);
        console.log(`Skills: ${this.state.skills}`);

        this.setState({
            username: '',
            password: '',
            phone: '',
            email: '',
            area: '',
            story: '',
        });
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
                        onChange={this.updateText}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        helperText="Use a strong password"
                        required
                        className={classes.row}
                        onChange={this.updateText}
                    />
                    <TextField
                        name="phone"
                        label="Phone number"
                        value={this.state.phone}
                        className={classes.row}
                        onChange={this.updateText}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={this.state.email}
                        className={classes.row}
                        onChange={this.updateText}
                    />
                    <FormControl
                        component="fieldset"
                        required
                        className={classes.radioRow}
                    >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="sex"
                            value={this.state.sex}
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
                        label="Birth year"
                        type="number"
                        defaultValue="2000"
                        name="birthyear"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.row}
                    />
                    <TextField
                        name="area"
                        label="Area"
                        value={this.state.area}
                        className={classes.row}
                        onChange={this.updateText}
                    />
                    <CheckboxInput
                        label="Languages"
                        data={this.state.languages}
                        className={classes.checkboxRow}
                        onChange={this.updateLanguages}
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
                                onChange={this.updateText}
                                onKeyDown={this.addSkill}
                            />
                        </FormGroup>
                    </FormControl>
                    <CheckboxInput
                        label="Communication channels"
                        data={this.state.commChannels}
                        className={classes.checkboxRow}
                        onChange={this.updateCommChannels}
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
                        onChange={this.updateText}
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
            </form>
        );
    }
}

export default withStyles(styles)(ProfileForm);

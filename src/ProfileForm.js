import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import {
    FormControl, FormControlLabel, FormGroup, FormLabel,
} from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import SaveIcon from 'material-ui-icons/Save';

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
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            phone: '',
            email: '',
            sex: '',
            birthyear: '',
            area: '',
            finnish: false,
            swedish: false,
            english: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        // dummy use of the state to shut up lint complaining
        console.log(
            this.state.username,
            this.state.password,
            this.state.phone,
            this.state.email,
            this.state.sex,
            this.state.birthyear,
            this.state.area,
            this.state.finnish,
            this.state.english,
            this.state.swedish,
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <form autoComplete="off">
                <FormGroup>
                    <TextField
                        onChange={this.handleChange}
                        label="Username"
                        name="username"
                        required
                        className={classes.row}
                    />
                    <TextField
                        onChange={this.handleChange}
                        label="Password"
                        required
                        name="password"
                        type="password"
                        helperText="Use a strong password"
                        className={classes.row}
                    />
                    <TextField
                        onChange={this.handleChange}
                        name="phone"
                        label="Phone number"
                        className={classes.row}
                    />
                    <TextField
                        onChange={this.handleChange}
                        name="email"
                        label="Email"
                        className={classes.row}
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
                            onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.row}
                    />
                    <TextField
                        name="area"
                        onChange={this.handleChange}
                        label="Area"
                        className={classes.row}
                    />
                    <FormControl
                        component="fieldset"
                        className={classes.checkboxRow}
                    >
                        <FormLabel component="legend">Languages</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                label="Finnish"
                                control={<Checkbox />
                                    // checked={this.state.finnish}
                                    // name="finnish"
                                    // value="finnish"
                                    // onChange={this.handleChange}
                                }
                            />
                            <FormControlLabel
                                label="English"
                                control={<Checkbox />
                                }
                            />
                            <FormControlLabel
                                label="Swedish"
                                control={<Checkbox />
                                }
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl
                        component="fieldset"
                        className={classes.chipRow}
                    >
                        <FormLabel component="legend">Skills</FormLabel>
                        <FormGroup row className={classes.chipContainer}>
                            <Chip
                                label="Parenting"
                                onRequestDelete
                                className={classes.chip}
                            />
                            <Chip
                                label="Finances"
                                onRequestDelete
                                className={classes.chip}
                            />
                            <Chip
                                label="Job-hunting"
                                onRequestDelete
                                className={classes.chip}
                            />
                            <TextField
                                label="Add a skill"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl
                        component="fieldset"
                        className={classes.checkboxRow}
                    >
                        <FormLabel component="legend">
                    Communication channels
                        </FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                label="Email"
                                control={<Checkbox />}
                            />
                            <FormControlLabel
                                label="Phone"
                                control={<Checkbox />}
                            />
                        </FormGroup>
                    </FormControl>
                    <TextField
                        label="Story"
                        multiline
                        rows="1"
                        rowsMax="8"
                        helperText="Tell something about yourself"
                        className={classes.row}
                    />
                </FormGroup>
                <Button
                    raised
                    onClick={this.handleSubmit}
                    color="primary"
                    className={classes.button}
                >
            Create
                    <SaveIcon className={classes.buttonIcon} />
                </Button>
            </form>
        );
    }
}

ProfileForm.propTypes = {
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
};

export default withStyles(styles)(ProfileForm);

import React from 'react';
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

const ProfileForm = props => (
    <form autoComplete="off">
        <FormGroup>
            <TextField
                label="Username"
                required
                className={props.classes.row}
            />
            <TextField
                label="Password"
                required
                type="password"
                helperText="Use a strong password"
                className={props.classes.row}
            />
            <TextField
                label="Phone number"
                className={props.classes.row}
            />
            <TextField
                label="Email"
                className={props.classes.row}
            />
            <FormControl
                component="fieldset"
                required
                className={props.classes.radioRow}
            >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row>
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
                InputLabelProps={{
                    shrink: true,
                }}
                className={props.classes.row}
            />
            <TextField
                label="Area"
                className={props.classes.row}
            />
            <FormControl
                component="fieldset"
                className={props.classes.checkboxRow}
            >
                <FormLabel component="legend">Languages</FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        label="Finnish"
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        label="English"
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        label="Swedish"
                        control={<Checkbox />}
                    />
                </FormGroup>
            </FormControl>
            <FormControl
                component="fieldset"
                className={props.classes.chipRow}
            >
                <FormLabel component="legend">Skills</FormLabel>
                <FormGroup row className={props.classes.chipContainer}>
                    <Chip
                        label="Parenting"
                        onRequestDelete
                        className={props.classes.chip}
                    />
                    <Chip
                        label="Finances"
                        onRequestDelete
                        className={props.classes.chip}
                    />
                    <Chip
                        label="Job-hunting"
                        onRequestDelete
                        className={props.classes.chip}
                    />
                    <TextField
                        label="Add a skill"
                    />
                </FormGroup>
            </FormControl>
            <FormControl
                component="fieldset"
                className={props.classes.checkboxRow}
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
                className={props.classes.row}
            />
        </FormGroup>
        <Button raised color="primary" className={props.classes.button}>
            Create
            <SaveIcon className={props.classes.buttonIcon} />
        </Button>
    </form>
);

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

import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl, FormControlLabel, FormGroup, FormLabel,
} from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';

import CheckboxGroup from './CheckboxGroup';

const styles = theme => ({
    row: {
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
    button: {
        marginTop: theme.spacing.unit * 2,
    },
    buttonIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const MentorForm = ({
    classes,
    availableSkills,
    availableGenders,
    errors,
    phone,
    email,
    updateValue,
    gender,
    birthYear,
    area,
    languages,
    updateCheckboxes,
    channels,
    skills,
    updateSkills,
    story,
}) => (
    <FormGroup>
        <TextField
            name="phone"
            label="Phone number"
            value={phone}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            className={classes.row}
            onChange={updateValue}
        />
        <TextField
            name="email"
            label="Email"
            value={email}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
            className={classes.row}
            onChange={updateValue}
        />
        <FormControl
            component="fieldset"
            required
            className={classes.radioRow}
        >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
                name="gender"
                value={gender}
                row
                onChange={updateValue}
            >
                {availableGenders.map(eachGender => (
                    <FormControlLabel
                        key={eachGender}
                        label={eachGender}
                        value={eachGender}
                        control={<Radio />}
                    />
                ))}
            </RadioGroup>
        </FormControl>
        <TextField
            name="birthYear"
            label="Birth year"
            value={birthYear}
            error={Boolean(errors.birthYear)}
            helperText={errors.birthYear}
            className={classes.row}
            onChange={updateValue}
        />
        <TextField
            name="area"
            label="Area"
            value={area}
            className={classes.row}
            onChange={updateValue}
        />
        <CheckboxGroup
            label="Languages"
            data={languages}
            className={classes.checkboxRow}
            onChange={updateCheckboxes('languages')}
        />
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-multiple">Skills</InputLabel>
            <Select
                multiple
                className={classes.row}
                value={skills}
                onChange={updateSkills}
                input={<Input id="name-multiple" />}
            >
                {availableSkills.map(skill => (
                    <MenuItem key={skill} value={skill}>
                        {skill}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <CheckboxGroup
            label="Communication channels"
            data={channels}
            className={classes.checkboxRow}
            onChange={updateCheckboxes('channels')}
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
            onChange={updateValue}
        />
    </FormGroup>
);

MentorForm.propTypes = {
    classes: PropTypes.shape({
        row: PropTypes.string,
        radioRow: PropTypes.string,
        checkboxRow: PropTypes.string,
        button: PropTypes.string,
        buttonIcon: PropTypes.string,
        formControl: PropTypes.string,
    }).isRequired,
    availableSkills: PropTypes.shape.isRequired,
    availableGenders: PropTypes.shape.isRequired,
    errors: PropTypes.shape.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    updateValue: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birthYear: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    languages: PropTypes.shape.isRequired,
    updateCheckboxes: PropTypes.shape.isRequired,
    channels: PropTypes.shape.isRequired,
    skills: PropTypes.shape.isRequired,
    updateSkills: PropTypes.shape.isRequired,
    story: PropTypes.string.isRequired,
};

export default withStyles(styles)(MentorForm);

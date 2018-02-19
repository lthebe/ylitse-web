import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

const RadioGroupControl = ({
    name, label, value, options, disabled, required, className, onChange,
}) => (
    <FormControl
        component="fieldset"
        disabled={disabled}
        required={required}
        className={className}
    >
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
            name={name}
            value={value}
            row
            onChange={onChange}
        >
            {options.map(option => (
                <FormControlLabel
                    key={option}
                    label={option}
                    value={option}
                    control={<Radio />}
                />
            ))}
        </RadioGroup>
    </FormControl>
);

RadioGroupControl.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

RadioGroupControl.defaultProps = {
    disabled: false,
    required: false,
    className: '',
};

export default RadioGroupControl;

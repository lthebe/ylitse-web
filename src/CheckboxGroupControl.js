import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl, FormLabel, FormControlLabel, FormGroup,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const CheckboxGroupControl = ({
    label, options, disabled, required, className, onChange,
}) => (
    <FormControl
        component="fieldset"
        disabled={disabled}
        required={required}
        className={className}
    >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>
            {Object.keys(options).map(key => (
                <FormControlLabel
                    key={key}
                    name={key}
                    label={key}
                    checked={options[key]}
                    control={<Checkbox onChange={onChange} />}
                />
            ))}

        </FormGroup>
    </FormControl>
);

CheckboxGroupControl.propTypes = {
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

CheckboxGroupControl.defaultProps = {
    disabled: false,
    required: false,
};

export default CheckboxGroupControl;

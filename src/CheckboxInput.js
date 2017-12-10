import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl, FormLabel, FormControlLabel, FormGroup,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const CheckboxInput = ({
    label, data, className, onChange,
}) => (
    <FormControl
        component="fieldset"
        className={className}
    >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>
            {Object.keys(data).map(key => (
                <FormControlLabel
                    key={key}
                    name={key}
                    label={key}
                    checked={data[key]}
                    control={<Checkbox onChange={onChange} />}
                />
            ))}

        </FormGroup>
    </FormControl>
);

CheckboxInput.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CheckboxInput;

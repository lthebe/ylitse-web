import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';

const styles = () => ({
    iconButton: {
        marginLeft: 20,
        marginRight: -12,
    },
});

class PasswordField extends Component {
    static propTypes = {
        classes: PropTypes.shape({ iconButton: PropTypes.string }).isRequired,
        label: PropTypes.string,
        helperText: PropTypes.string,
        required: PropTypes.bool,
        error: PropTypes.bool,
        className: PropTypes.string,
    }

    static defaultProps = {
        label: 'Password',
        helperText: '',
        required: false,
        error: false,
        className: '',
    }

    constructor(props) {
        super(props);

        this.state = { showPassword: false };
    }

    toggleVisibility = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        const {
            label, helperText, required, error, className, classes, ...props
        } = this.props;
        const { showPassword } = this.state;

        return (
            <FormControl required={required} className={className}>
                <InputLabel error={error}>{label}</InputLabel>
                <Input
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                className={classes.iconButton}
                                onClick={this.toggleVisibility}
                            >
                                {showPassword ?
                                    <VisibilityOffIcon /> :
                                    <VisibilityIcon />
                                }
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {helperText &&
                    <FormHelperText error={error}>{helperText}</FormHelperText>
                }
            </FormControl>
        );
    }
}

export default withStyles(styles)(PasswordField);

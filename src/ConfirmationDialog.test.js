import React from 'react';
import { shallow } from 'enzyme';
import Button from 'material-ui/Button';
import Dialog, { DialogActions } from 'material-ui/Dialog';

import ConfirmationDialog from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
    const onAction = jest.fn();
    const onCloseConfirmation = jest.fn();
    const props = {
        onCloseConfirmation,
        confirmationOpen: false,
        label: 'ConfirmationDialog',
        onAction,
        buttonLabel: 'Delete',
    };
    test('renders correctly', () => {
        const wrapper = shallow(<ConfirmationDialog {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('cancel and delete button called', () => {
        const wrapper = shallow(<ConfirmationDialog {...props} />);
        const cancelButton = wrapper
            .find(Dialog).find(DialogActions).find(Button).at(0);
        cancelButton.simulate('click');
        expect(onCloseConfirmation).toHaveBeenCalled();
        const deleteButton = wrapper
            .find(Dialog).find(DialogActions).find(Button).at(1);
        deleteButton.simulate('click');
        expect(onAction).toHaveBeenCalled();
    });
});

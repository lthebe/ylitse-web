import React from 'react';
import { createMount, createShallow } from 'material-ui/test-utils';
// import Input from 'material-ui/Input';
import PasswordField from './PasswordField';

describe('PasswordField', () => {
    let mount;
    let shallow;
    beforeAll(() => {
        mount = createMount();
        shallow = createShallow();
    });
    afterAll(() => {
        mount.cleanUp();
        shallow.cleanUp();
    });
    test('renders correctly', () => {
        // PasswordField is a HOC, so diving
        const wrapper = shallow(<PasswordField />).dive();
        expect(wrapper).toMatchSnapshot();
    });

    test('click icon toggles the visibility', () => {
        const wrapper = mount(<PasswordField />);
        expect(wrapper.find('Input').prop('type')).toBe('password');
        wrapper.find('IconButton').simulate('click');
        expect(wrapper.find('Input').prop('type')).toBe('text');
    });

    test('helperText displayed in FormHelperText', () => {
        const deepWrapper = mount(<PasswordField />);
        deepWrapper.setProps({
            helperText: 'Not good password',
        });
        expect(deepWrapper.find('FormHelperText').length).toBe(1);
    });
});

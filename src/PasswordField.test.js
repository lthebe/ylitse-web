import React from 'react';
import { shallow, mount } from 'enzyme';

import PasswordField from './PasswordField';

describe('PasswordField', () => {
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

    test('password validation', () => {
        const wrapper = mount(<PasswordField />);
        const input = wrapper.find('Input');
        input.simulate('change', { target: { value: '1234' } });
        console.log(wrapper.find('InputLabel').prop('error'));
        // a.find('input').node.value = 'Task1';
        //
    });
});

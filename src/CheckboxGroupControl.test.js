import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckboxGroupControl from './CheckboxGroupControl';

describe('CheckboxGroupControl', () => {
    const mockFunc = jest.fn();
    const languages = { Finnish: false };
    const props = {
        options: languages,
        className: '',
        label: 'Language',
        onChange: mockFunc,
    };

    test('renders correctly', () => {
        const wrapper = shallow(<CheckboxGroupControl {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('checkbox can be checked and unchecked', () => {
        const wrapper = mount(<CheckboxGroupControl {...props} />);
        const input = wrapper.find('input[name="Finnish"]');
        input.simulate('change');
        expect(mockFunc).toHaveBeenCalled();
    });
});

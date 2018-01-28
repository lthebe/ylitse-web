import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup', () => {
    const mockFunc = jest.fn();
    const languages = { Finnish: false };
    const props = {
        data: languages,
        className: '',
        label: 'Language',
        onChange: mockFunc,
    };

    test('renders correctly', () => {
        const wrapper = shallow(<CheckboxGroup {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('checkbox can be checked and unchecked', () => {
        const wrapper = mount(<CheckboxGroup {...props} />);
        const input = wrapper.find('input[name="Finnish"]');
        input.simulate('change');
        expect(mockFunc).toHaveBeenCalled();
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import RadioGroupControl from './RadioGroupControl';

describe('RadioGroupControl', () => {
    const onChange = jest.fn();
    const props = {
        name: 'test',
        label: 'Test label',
        value: 'One',
        options: ['One', 'Two'],
        onChange,
    };

    test('renders correctly', () => {
        const wrapper = shallow(<RadioGroupControl {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});

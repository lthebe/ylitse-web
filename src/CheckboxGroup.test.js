import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup', () => {
    const clickEvent = jest.fn();
    const languages = {
        Finnish: false,
        Swedish: false,
        English: false,
        Russian: false,
    };
    const props = {
        data: languages,
        className: '',
        label: 'Language',
        onChange: clickEvent,
    };
    it('renders correctly', () => {
        const wrapper = shallow(<CheckboxGroup {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('checkbox can be checked and unchecked', () => {
        const wrapper = mount(<CheckboxGroup {...props} />);
        expect(clickEvent).not.toHaveBeenCalled();
        const input = wrapper.find('FormControlLabel')
            .find('[label="Finnish"]').find('input');
        input.simulate('change');
        expect(clickEvent).toHaveBeenCalled();
    });
});

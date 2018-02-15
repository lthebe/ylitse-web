import React from 'react';
import { shallow, mount } from 'enzyme';

import SkillsListItem from './SkillsListItem';

describe('SkillListItem', () => {
    test('renders correctly', () => {
        // PasswordField is a HOC, so diving
        const props = {
            label: 'MySkill', deleteSkill: () => {}, classes: {},
        };
        const wrapper = shallow(<SkillsListItem {...props} />).dive();
        expect(wrapper).toMatchSnapshot();
    });

    test('displays the right label', () => {
        const props = {
            label: 'MySkill', deleteSkill: () => {}, classes: {},
        };
        const wrapper = mount(<SkillsListItem {...props} />);
        expect(wrapper.contains('MySkill')).toBe(true);
    });

    test('click deleteicon toggles modal', () => {
        const props = {
            label: 'MySkill', deleteSkill: () => {}, classes: {},
        };
        const wrapper = mount(<SkillsListItem {...props} />);
        expect(wrapper.find('Dialog').prop('open')).toBe(false);
        wrapper.find('IconButton').simulate('click');
        expect(wrapper.find('Dialog').prop('open')).toBe(true);
        // click second buttons to cancel and close the dialog button
        wrapper.find('Button').at(1).simulate('click');
        expect(wrapper.find('Dialog').prop('open')).toBe(false);
    });
});

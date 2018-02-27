import React from 'react';
import { shallow } from 'enzyme';

import SkillsListItem from './SkillsListItem';

describe('SkillListItem', () => {
    test('renders correctly', () => {
        const props = {
            label: 'MySkill', onDelete: () => {}, classes: {},
        };
        const wrapper = shallow(<SkillsListItem {...props} />).dive();

        expect(wrapper).toMatchSnapshot();
    });

    test('onMouseEnter, onMouseLeave function', () => {
        const props = {
            label: 'MySkill', onDelete: () => {}, classes: {},
        };
        const wrapper = shallow(<SkillsListItem {...props} />).dive();

        wrapper.instance().onMouseEnter();
        wrapper.update();
        expect(wrapper.state('actionsVisible')).toBe(true);

        wrapper.instance().onMouseLeave();
        wrapper.update();
        expect(wrapper.state('actionsVisible')).toBe(false);
    });
});

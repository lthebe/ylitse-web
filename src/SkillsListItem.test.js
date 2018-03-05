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
});

import React from 'react';
import { shallow, mount } from 'enzyme';

import SkillsPage from './SkillsPage';

describe('SkillsPage', () => {
    test('renders correctly', () => {
        // a HOC, so diving
        const wrapper = shallow(<SkillsPage />).dive();
        expect(wrapper).toMatchSnapshot();
    });
    test('fetchSkills error', async () => {
        const wrapper = shallow(<SkillsPage />).dive();
        const error = 'Can not fetch skills';
        window.fetch = jest.fn();
        window.fetch.mockReturnValue({
            json: () => {
                throw new Error(error);
            },
        });
        await wrapper.instance().fetchSkills();
        wrapper.update();
        expect(wrapper.state('errorOpen')).toBe(true);
        expect(wrapper.find({ message: error, open: true })).toHaveLength(1);
        wrapper.instance().closeError();
        wrapper.update();
        expect(wrapper.state('errorOpen')).toBe(false);
        expect(wrapper.find({ message: error, open: false })).toHaveLength(1);
    });

    test('fetched skills are shown in card', async () => {
        const wrapper = shallow(<SkillsPage />).dive();
        const skills = [{ id: 23333, name: 'Cooking' }];
        const res = new Response(`{"resources": "${skills}"}`, {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        });
        window.fetch = jest.fn();
        window.fetch.mockReturnValue(Promise.resolve(res));
        await wrapper.instance().fetchSkills();
        wrapper.update();
        // console.log(Object.entries(wrapper.state('skills')));
    });

    test('Skill value updates', () => {
        const deepWrapper = mount(<SkillsPage />);
        const skill = deepWrapper.find('TextField').find('input');
        skill.instance().value = 'short';
        skill.simulate('change');
        expect(deepWrapper.find('TextField').prop('value')).toBe('short');
    });

    test('addSkill called', async () => {
        const wrapper = shallow(<SkillsPage />).dive();
        wrapper.setState({ newSkill: 'Cooking' });
        const res = new Response(`{"name": "${wrapper.state('newSkill')}"}`, {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
        window.fetch = jest.fn();
        window.fetch.mockReturnValue(Promise.resolve(res));
        const fakeEvent = { key: 'Enter' };
        await wrapper.instance().addSkill(fakeEvent);
        wrapper.update();
        // reset the newSkill after addSkill is successfully called
        expect(wrapper.state('newSkill')).toBe('');
    });
});

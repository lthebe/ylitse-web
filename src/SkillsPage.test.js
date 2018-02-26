import React from 'react';
import { shallow } from 'enzyme';

import SkillsPage from './SkillsPage';

describe('SkillsPage', () => {
    test('renders correctly', () => {
        const wrapper = shallow(<SkillsPage />).dive();

        expect(wrapper).toMatchSnapshot();
    });

    test('fetch error message is shown', async () => {
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
        expect(wrapper.state('feedbackOpen')).toBe(true);
        expect(wrapper.find({ message: error, open: true })).toHaveLength(1);

        wrapper.instance().closeFeedback();
        wrapper.update();
        expect(wrapper.state('feedbackOpen')).toBe(false);
        expect(wrapper.find({ message: error, open: false })).toHaveLength(1);
    });

    test('skills are fetched', async () => {
        const wrapper = shallow(<SkillsPage />).dive();
        const skills = [{ id: 23333, name: 'Cooking' }];
        const res = new Response(`{"resources": ${JSON.stringify(skills)}}`, {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        });

        window.fetch = jest.fn();
        window.fetch.mockReturnValue(Promise.resolve(res));
        await wrapper.instance().fetchSkills();
        wrapper.update();
        expect(wrapper.state('skills')).toEqual(expect.arrayContaining(skills));
    });
});

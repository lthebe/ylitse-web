import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Root from './Root';

describe('Root', () => {
    const root = <MemoryRouter><Root /></MemoryRouter>;

    test('renders correctly', () => {
        const wrapper = shallow(root).find('Root').shallow();

        expect(wrapper).toMatchSnapshot();
    });
});

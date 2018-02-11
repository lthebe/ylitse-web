import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page';

describe('Page', () => {
    test('renders correctly', () => {
        const wrapper = shallow(<Page><div>TEST</div></Page>).dive();

        expect(wrapper).toMatchSnapshot();
    });
});

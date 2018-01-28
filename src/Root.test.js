import React from 'react';
import { shallow } from 'enzyme';
import Root from './Root';

describe('Root', () => {
    test('renders correctly', () => {
        // ProfileSheet is a HOC, so diving
        const shallowWrapper = shallow(<Root />).dive();
        expect(shallowWrapper).toMatchSnapshot();
    });
});

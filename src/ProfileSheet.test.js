import React from 'react';
import { shallow } from 'enzyme';
import ProfileSheet from './ProfileSheet';

describe('ProfileSheet', () => {
    test('renders correctly', () => {
        // ProfileSheet is a HOC, so diving
        const shallowWrapper = shallow(<ProfileSheet />).dive();
        expect(shallowWrapper).toMatchSnapshot();
    });
});

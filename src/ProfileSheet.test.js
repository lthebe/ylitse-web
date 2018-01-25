import React from 'react';
import { createShallow } from 'material-ui/test-utils';
import ProfileSheet from './ProfileSheet';

describe('ProfileSheet', () => {
    let shallow;
    beforeAll(() => {
        shallow = createShallow();
    });
    afterAll(() => {
        shallow.cleanUp();
    });
    test('renders correctly', () => {
        // ProfileSheet is a HOC, so diving
        const shallowWrapper = shallow(<ProfileSheet />).dive();
        expect(shallowWrapper).toMatchSnapshot();
    });
});

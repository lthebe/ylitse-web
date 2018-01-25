import React from 'react';
import { createShallow } from 'material-ui/test-utils';
import Root from './Root';

describe('Root', () => {
    let shallow;
    beforeAll(() => {
        shallow = createShallow();
    });
    afterAll(() => {
        shallow.cleanUp();
    });
    test('renders correctly', () => {
        // ProfileSheet is a HOC, so diving
        const shallowWrapper = shallow(<Root />).dive();
        expect(shallowWrapper).toMatchSnapshot();
    });
});

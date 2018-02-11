import React from 'react';
import { shallow } from 'enzyme';
import MissingPage from './MissingPage';

describe('MissingPage', () => {
    test('renders correctly', () => {
        const props = { location: { pathname: '/test' } };
        const wrapper = shallow(<MissingPage {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});

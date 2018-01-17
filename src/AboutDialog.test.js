import React from 'react';
import { shallow } from 'enzyme';

import AboutDialog from './AboutDialog';

describe('AboutDialog', () => {
    test('renders correctly', () => {
        const props = {
            uiVersion: 'N/A', apiVersion: 'N/A', onOkClick: () => {},
        };
        const wrapper = shallow(<AboutDialog {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});

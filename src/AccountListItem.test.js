import React from 'react';
import { shallow } from 'enzyme';

import AccountListItem from './AccountListItem';

describe('AccountListItem', () => {
    test('renders correctly', () => {
        const account = {
            username: 'admin',
            role: 'admin',
            email: 'admin@admin.com',
        };
        const wrapper = shallow(<AccountListItem account={account} />);

        expect(wrapper).toMatchSnapshot();
    });
});

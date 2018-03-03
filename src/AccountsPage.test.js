import React from 'react';
import { shallow } from 'enzyme';

import AccountsPage from './AccountsPage';

describe('AccountsPage', () => {
    test('renders correctly', () => {
        const wrapper = shallow(<AccountsPage />).dive();

        expect(wrapper).toMatchSnapshot();
    });

    test('open and close feedback while fetching accounts', async () => {
        const wrapper = shallow(<AccountsPage />).dive();
        const error = 'Can not fetch accounts';
        window.fetch = jest.fn();
        window.fetch.mockReturnValue({
            json: () => {
                throw new Error(error);
            },
        });
        await wrapper.instance().fetchAccounts();
        wrapper.update();
        expect(wrapper.state('feedbackOpen')).toBe(true);
        expect(wrapper.find({ message: error, open: true })).toHaveLength(1);
        wrapper.instance().closeFeedback();
        wrapper.update();
        expect(wrapper.state('feedbackOpen')).toBe(false);
        expect(wrapper.find({ message: error, open: false })).toHaveLength(1);
    });

    test('accounts are fetched', async () => {
        const wrapper = shallow(<AccountsPage />).dive();
        const accounts = [{
            id: 23333,
            username: 'admin',
            role: 'admin',
            email: 'admin@admin.fi',
        },
        {
            id: 23333,
            username: 'admin',
            role: 'admin',
            email: 'admin@admin.fi',
        },
        ];
        const res = new Response(`{"resources": ${JSON.stringify(accounts)}}`, {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        });

        window.fetch = jest.fn();
        window.fetch.mockReturnValue(Promise.resolve(res));
        await wrapper.instance().fetchAccounts();
        wrapper.update();
        expect(wrapper.state('accounts'))
            .toEqual(expect.arrayContaining(accounts));
    });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import Navigation from './Navigation';

describe('Navigation', () => {
    const navigation = <MemoryRouter><Navigation /></MemoryRouter>;

    test('renders correctly', () => {
        const wrapper = shallow(navigation).dive().dive().shallow();

        expect(wrapper).toMatchSnapshot();
    });

    test('has the right title', () => {
        const wrapper = shallow(navigation).dive().dive().shallow();
        const title = 'Ylitse Admin';

        expect(wrapper.find('[type="title"]').render().text()).toBe(title);
    });

    test('about dialog is hidden', () => {
        const wrapper = shallow(navigation).dive().dive().shallow();

        expect(wrapper.find('AboutDialog').prop('open')).toBe(false);
    });

    test('about dialog can be opened and closed', () => {
        const wrapper = mount(navigation);

        wrapper.find('Toolbar').find('IconButton').simulate('click');
        expect(wrapper.find('AboutDialog').prop('open')).toBe(true);
        wrapper.find('AboutDialog').find('Button').simulate('click');
        expect(wrapper.find('AboutDialog').prop('open')).toBe(false);
    });

    test('fetched version is shown in about dialog', async () => {
        const wrapper = shallow(navigation).dive().dive().shallow();
        const version = '0.1.0';
        const res = new Response(`{"api": "${version}"}`, {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        });

        window.fetch = jest.fn();
        window.fetch.mockReturnValue(Promise.resolve(res));

        await wrapper.instance().fetchVersion();
        wrapper.update();
        expect(wrapper.find('AboutDialog').prop('apiVersion')).toBe(version);
    });

    test('error message is shown upon fetch error', async () => {
        const wrapper = shallow(navigation).dive().dive().shallow();
        const error = 'Test error';

        window.fetch = jest.fn();
        window.fetch.mockReturnValue({
            json: () => {
                throw new Error(error);
            },
        });

        await wrapper.instance().fetchVersion();
        wrapper.update();
        expect(wrapper.find({ message: error, open: true })).toHaveLength(1);
        wrapper.instance().closeError();
        wrapper.update();
        expect(wrapper.find({ message: error, open: false })).toHaveLength(1);
    });
});

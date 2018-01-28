import React from 'react';
import { shallow, mount } from 'enzyme';
import ProfileForm from './ProfileForm';

describe('ProfileForm', () => {
    test('renders correctly', () => {
        // ProfileForm is a HOC, so diving
        const wrapper = shallow(<ProfileForm />).dive();

        expect(wrapper).toMatchSnapshot();
    });

    test('error message is shown upon post error', async () => {
        const wrapper = shallow(<ProfileForm />).dive();
        const error = 'post error';
        window.fetch = jest.fn();
        window.fetch.mockReturnValue({
            json: () => { throw new Error(error); },
        });
        const fakeEvent = { preventDefault: () => false };

        await wrapper.instance().sendProfile(fakeEvent);
        wrapper.update();
        expect(wrapper.find({ message: error, open: true })).toHaveLength(1);
        wrapper.instance().closeFeedback();
        wrapper.update();
        expect(wrapper.find({ message: error, open: false })).toHaveLength(1);
    });

    test('success message is shown upon post ', async () => {
        const wrapper = shallow(<ProfileForm />).dive();
        const username = 'testuser';
        const res = new Response(`{"username": "${username}"}`, {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
        window.fetch = jest.fn();
        window.fetch.mockReturnValue(Promise.resolve(res));
        const fakeEvent = { preventDefault: () => false };

        await wrapper.instance().sendProfile(fakeEvent);
        wrapper.update();
        expect(wrapper.find({
            message: `Account for ${username} created`,
            open: true,
        })).toHaveLength(1);
        wrapper.instance().closeFeedback();
        wrapper.update();
        expect(wrapper.find({
            message: `Account for ${username} created`,
            open: false,
        })).toHaveLength(1);
    });

    test('password validation', () => {
        // tests only if short password is indicated
        const deepWrapper = mount(<ProfileForm />);
        const password = deepWrapper.find('PasswordField').find('input');
        password.instance().value = 'short';

        password.simulate('change');
        expect(deepWrapper.find('PasswordField')
            .find('FormHelperText').length).toBe(1);
    });

    test('username validation', () => {
        const deepWrapper = mount(<ProfileForm />);

        const username = deepWrapper.find({
            name: 'username',
            label: 'Username',
        }).find('input');
        username.instance().value = 'a';
        username.simulate('change');
        expect(deepWrapper.find({
            name: 'username',
            label: 'Username',
        }).prop('error')).toBe(true);
        username.instance().value = 'abc';
        username.simulate('change');
        expect(deepWrapper.find({
            name: 'username',
            label: 'Username',
        }).prop('error')).toBe(false);
    });

    test('screen name validation', () => {
        const deepWrapper = mount(<ProfileForm />);
        // this is not the good way to find the element though
        // if label is changed for example
        const nickname = deepWrapper.find({
            name: 'nickname',
            label: 'Screen name',
        }).find('input');
        nickname.instance().value = 'ab';
        nickname.simulate('change');
        expect(deepWrapper.find({
            name: 'nickname',
            label: 'Screen name',
        }).prop('error')).toBe(true);
        nickname.instance().value = 'abcd';
        nickname.simulate('change');
        expect(deepWrapper.find({
            name: 'nickname',
            label: 'Screen name',
        }).prop('error')).toBe(false);
    });

    test('skills chosen', () => {
        const deepWrapper = mount(<ProfileForm />);
        const skillsSelect = deepWrapper.find('SelectInput').find('input');
        skillsSelect.simulate('change');
        // deepWrapper.update();
        // expect(onChangeEvent).toHaveBeenCalled();
    });
});

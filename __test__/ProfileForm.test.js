import React from 'react';
import { mount } from 'enzyme';
import ProfileForm from '../src/ProfileForm';

describe('ProfileForm', () => {
    let props;
    let mountedProfileForm;
    const profileForm = () => {
        if (!mountedProfileForm) {
            mountedProfileForm =
            mount(<ProfileForm {...props} />);
        }
        return mountedProfileForm;
    };

    it('always renders radio buttons', () => {
        const radios = profileForm.find('RadioGroup');
        expect(radios.length).toBeGreaterThan(0);
        expect(radios.at(0).props().name).to.equal('account');
        expect(radios.at(0).props().onChange).to.equal('account');
    });
    describe('When the button is checked', () => {
        beforeEach(() => {
            props.updateValue = jest.fn;
        });
    });
    it('always renders textfields', () => {
        const texts = profileForm.find('TextField');
        expect(texts.length).toBeGreaterThan(4);
    });
    it('always renders a password field', () => {
        const passwd = profileForm.find('PasswordField');
        expect(passwd.length).toBeGreaterThan(0);
    });
    it('always renders checkboxes', () => {
        const checks = profileForm.find('CheckboxGroup');
        expect(checks.length).toBeGreaterThan(1);
    });
    it('always renders button', () => {
        const btn = profileForm.find('Button');
        expect(btn.length).toBeGreaterThan(0);
    });
});

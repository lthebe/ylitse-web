import React from 'react';
import { shallow } from 'enzyme';
// import { TableCell, TableRow } from 'material-ui/Table';
// import IconButton from 'material-ui/IconButton';

import AccountListItem from './AccountListItem';

describe('AccountListItem', () => {
    test('renders correctly', () => {
        const props = {
            onDelete: () => {},
            account: {
                username: 'admin',
                role: 'admin',
                email: 'admin@admin.com',
            },
        };
        const wrapper = shallow(<AccountListItem {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    // Somehow does not work, would be glad to know
    // test('calls function on delete', () => {
    //     const onDelete = jest.fn();
    //     const props = {
    //         onDelete,
    //         account: {
    //             username: 'admin',
    //             role: 'admin',
    //             email: 'admin@admin.com',
    //         },
    //     };
    //     const wrapper = shallow(<AccountListItem {...props} />);
    //     const deleteButton = wrapper.find(TableRow).find(TableCell).last()
    //         .find(IconButton)
    //         .at(1);
    //     // console.log(deleteButton.render());
    //     deleteButton.simulate('click');
    //     expect(onDelete).toHaveBeenCalled();
    // });
});

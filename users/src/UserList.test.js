import {render, screen, within} from '@testing-library/react';
import UserList from './UserList';

test('render one row per user', () => {
    // render component
    const users = [
        {name: 'jane', email: 'jane@jane.com'},
        {name: 'sam', email: 'sam@sam.com'}
    ];
    const {container} = render(<UserList users={users}/>);

    // Find all the rows in the table
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const rows = container.querySelectorAll('tbody tr');

    // using data-testid
    //--------------------------------------
    // const rows = within(screen.getByTestId('users')).getAllByRole('row');

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {

});
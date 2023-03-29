import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', async () => {
    const user = userEvent.setup();
    // render the component
    render(<UserForm onUserAdd={jest.fn()}/>);

    // Manipulate the component or find an element in it
    const allInputs = screen.getAllByRole('textbox');
    const allButton = screen.getAllByRole('button');

    // Assertion - make sure the component is doing what we expect it to do
    expect(allInputs).toHaveLength(2);
    expect(allButton).toHaveLength(1);
});

test('it calls onUserAdd when the form is submitted', async () => {
    // mock function
    const mock = jest.fn();
    const user = userEvent.setup();
    // render component
    render(<UserForm onUserAdd={mock}/>);

    // Find the two inputs
    const nameInput = screen.getByRole('textbox', {name: 'Name'});
    const emailInput = screen.getByRole('textbox', {name: 'Email'});

    // Simulate typing in a name
    await user.clear(nameInput);
    await user.type(nameInput, "asdf");

    // Simulate typing in an email
    await user.clear(emailInput);
    await user.type(emailInput, "asdf@email.com");

    // Find the button
    const button = screen.getByRole('button');

    // Simulate clicking the button
    await user.click(button);

    // Assertion to make sure 'onUserAdd' is called
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: 'asdf', email: 'asdf@email.com'});
});

test('empties the two inputs when form is submitted', async () => {
    
    const user = userEvent.setup();
    render(<UserForm onUserAdd={jest.fn()}/>);

    const nameInput = screen.getByRole('textbox', {name: /name/i});
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    const button = screen.getByRole('button');

    await user.clear(nameInput);
    await user.type(nameInput, 'jane');
    await user.clear(emailInput);
    await user.type(emailInput, 'jane@jane.com');

    await user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

});
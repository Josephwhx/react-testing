import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('can recieve a new user and show it on a list', async () => {
  const user = userEvent.setup();
  render(<App/>);
  
  const nameInput = screen.getByRole('textbox', {
    name: /name/i
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i
  });
  const submitButton = screen.getByRole('button');

  await user.clear(nameInput);
  await user.type(nameInput, 'jane');
  await user.clear(emailInput);
  await user.type(emailInput, 'jane@jane.com');

  await user.click(submitButton);

  // get name and email input
  const name = screen.getByRole('cell', {name: 'jane'});
  const email = screen.getByRole('cell', {name: 'jane@jane.com'});
  
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  
});

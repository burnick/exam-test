import { cleanup, render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import TestComponent from 'components/TestComponent';
import userEvent from '@testing-library/user-event';
import Login from './Login';

beforeAll(() => {});
afterEach(cleanup);
afterAll(() => {});

test('renders Login Component', async () => {
  const { getByRole, getByPlaceholderText } = await render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  const buttonElements = getByRole('button', {
    name: /login/i,
  });

  const branchIdElement = getByPlaceholderText('Branch Id');
  const userNameElement = getByPlaceholderText('User name');
  const passwordElement = getByPlaceholderText('Password');

  expect(buttonElements).toBeVisible();
  expect(branchIdElement).toBeVisible();
  expect(passwordElement).toBeVisible();
  expect(userNameElement).toBeVisible();
});

test('test Branch Id Input for Number input', async () => {
  const { getByPlaceholderText } = render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  const inputNode = getByPlaceholderText('Branch Id');
  fireEvent.change(inputNode, { target: { value: '2323' } });
  await act(async () => {
    expect((inputNode as HTMLInputElement).value).toBe('2323');
  });
});

test('test Branch Id Input for Letter input', async () => {
  const { getByPlaceholderText } = render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  const inputNode = getByPlaceholderText('Branch Id');
  fireEvent.change(inputNode, { target: { value: 'abcde' } });
  await act(async () => {
    expect((inputNode as HTMLInputElement).value).toBe('');
  });
});

test('test User name Input for empty', async () => {
  const errorMessageUserName = 'Error: userName is a required field';
  const { getByPlaceholderText, getByText } = render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  const user = userEvent.setup();

  const inputBranchId = getByPlaceholderText('Branch Id');
  fireEvent.change(inputBranchId, { target: { value: '123456' } });
  const buttonNode = screen.getByRole('button', { name: /login/i });
  const inputUsername = getByPlaceholderText('User name');
  fireEvent.change(inputUsername, { target: { value: '' } });

  await user.click(buttonNode);

  await waitFor(() => {
    const errorText = screen.getByText(errorMessageUserName);
    expect(buttonNode).toBeDisabled();
    expect(errorText).toBeVisible();
  });
});

test('submit empty form, test Button submit should be disabled', async () => {
  render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  const user = userEvent.setup();
  const buttonNode = screen.getByRole('button', { name: /login/i });
  await user.type(screen.getByPlaceholderText('Branch Id'), 'John');
  await user.click(buttonNode);
  await waitFor(() => expect(buttonNode).toBeDisabled());
});

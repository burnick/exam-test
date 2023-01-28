import React from 'react';
import { cleanup, render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import TestComponent from 'components/TestComponent';
import userEvent from '@testing-library/user-event';
import Login from './Login';

afterEach(cleanup);

test('rendersLogin Component', async () => {
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

test('test Branch Id Input  for Number input', async () => {
  const { getByPlaceholderText } = render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  fireEvent.change(getByPlaceholderText('Branch Id'), {
    target: { value: '123456789' },
  });

  await act(async () => {
    const { getByPlaceholderText } = await render(
      <TestComponent>
        <Login />
      </TestComponent>,
    );
    const inputNode = getByPlaceholderText('Branch Id');
    fireEvent.change(inputNode, { target: { value: '2323' } });
    expect((inputNode as HTMLInputElement).value).toBe('2323');
  });
});

test('test Branch Id Input  for Letter input', async () => {
  const { getByPlaceholderText } = render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  fireEvent.change(getByPlaceholderText('Branch Id'), {
    target: { value: '123456789' },
  });

  await act(async () => {
    const { getByPlaceholderText } = await render(
      <TestComponent>
        <Login />
      </TestComponent>,
    );
    const inputNode = getByPlaceholderText('Branch Id');
    fireEvent.change(inputNode, { target: { value: 'abcde' } });
    expect((inputNode as HTMLInputElement).value).toBe('');
  });
});

test('test Button submit for empty form', async () => {
  render(
    <TestComponent>
      <Login />
    </TestComponent>,
  );
  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText('Branch Id'), 'John');
  await user.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() =>
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled(),
  );
});

import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserProps, LoginFormProps, UsersState } from 'types';

const initialState: UsersState = {
  users: [
    {
      branchId: 10001,
      userName: 'testuser01',
      password: 'pa55w0rd001',
      firstName: 'John',
      middleName: 'Sanchez',
      lastName: 'Doe',
      position: 'Developer',
    },
    {
      branchId: 10002,
      userName: 'testuser02',
      password: 'pa55w0rd002',
      firstName: 'Ricardo',
      middleName: 'Dubov',
      lastName: 'Martinez',
      position: 'Lead Developer',
    },
    {
      branchId: 10003,
      userName: 'testuser03',
      password: 'pa55w0rd003',
      firstName: 'Gol',
      middleName: 'Denver',
      lastName: 'Roger',
      position: 'Project Manager',
    },
  ],
  foundUser: false,
  loggedInUser: [],
};

export const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    findUser: (state, action: PayloadAction<LoginFormProps>) => {
      const { branchId, password, userName } = action.payload;
      const currentUser = current(state);
      const loggedInUser = currentUser.users.filter(
        (user) =>
          user.branchId === parseInt(branchId.toString()) &&
          user.password === password &&
          user.userName === userName,
      );
      return {
        users: currentUser.users,
        foundUser: loggedInUser.length > 0,
        loggedInUser,
      };
    },
    addUser: (state, action: PayloadAction<UserProps>) => {
      const currentState = current(state);
      return {
        ...currentState,
        users: [...currentState.users, action.payload],
      };
    },
    removeUser: (state, action: PayloadAction<number>) => {
      const currentState = current(state);

      return {
        ...currentState,
        users: currentState.users.filter((user) => user.branchId !== action.payload),
      };
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { findUser, addUser, removeUser, logoutUser } = UsersSlice.actions;

export default UsersSlice.reducer;

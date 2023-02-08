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
      const currentState = current(state);

      const loggedInUser = currentState.users.filter(
        (user: UserProps) =>
          user.branchId === parseInt(branchId.toString()) &&
          user.password === password &&
          user.userName === userName,
      );

      const modifiedState = {
        users: currentState.users,
        foundUser: loggedInUser.length > 0,
        loggedInUser,
      };
      localStorage.setItem('rootState', JSON.stringify(modifiedState));
      return modifiedState;
    },
    addUser: (state, action: PayloadAction<UserProps>) => {
      const currentState = current(state);
      const rootState = localStorage.getItem('rootState');
      const currentRootState = rootState ? JSON.parse(rootState) : currentState;
      const findUser = currentRootState.users.find(
        (user: UserProps) => user.userName === action.payload.userName,
      );

      const modifiedState = {
        users: findUser
          ? currentRootState.users
          : [...currentRootState.users, action.payload],
        foundUser: currentRootState.foundUser,
        loggedInUser: currentRootState.loggedInUser,
      };

      localStorage.setItem('rootState', JSON.stringify(modifiedState));

      return modifiedState;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      const currentState = current(state);
      const rootState = localStorage.getItem('rootState');
      const currentRootState = rootState ? JSON.parse(rootState) : currentState;

      const modifiedState = {
        users: currentRootState.users.filter(
          (user: UserProps) => user.branchId !== action.payload,
        ),
        foundUser: currentRootState.foundUser,
        loggedInUser: currentRootState.loggedInUser,
      };
      localStorage.setItem('rootState', JSON.stringify(modifiedState));
      return modifiedState;
    },
    logoutUser: () => {
      localStorage.setItem('rootState', JSON.stringify(initialState));
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { findUser, addUser, removeUser, logoutUser } = UsersSlice.actions;

export default UsersSlice.reducer;

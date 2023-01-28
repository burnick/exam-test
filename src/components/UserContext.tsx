import React, { createContext, useContext } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { UsersState } from 'types';

export const UserContext = createContext<UsersState>({
  users: [],
  foundUser: false,
  loggedInUser: [],
});

export const UserContextProvider = (props: { children?: React.ReactNode }) => {
  const value = useSelector((state: RootState) => state);
  const { children } = props;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;

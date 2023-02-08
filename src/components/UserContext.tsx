import React, { createContext, useContext, useMemo } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { UsersState } from "types";

export const UserContext = createContext<UsersState>({
  users: [],
  foundUser: false,
  loggedInUser: [],
});

export const UserContextProvider = (props: { children?: React.ReactNode }) => {
  const value = useSelector((state: RootState) => state);

  const { children } = props;
  const currentValue = useMemo(() => {
    const rootState = localStorage.getItem("rootState");
    const currentRootState = rootState ? JSON.parse(rootState) : {};

    return currentRootState && currentRootState.foundUser
      ? { ...value, ...currentRootState }
      : value;
  }, [value]);

  return (
    <UserContext.Provider value={currentValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;

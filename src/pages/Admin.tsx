import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { useAppDispatch } from 'store/hooks';
import { logoutUser, removeUser } from 'store/slice/users';
import Table from 'components/Table';
import useUserContext from 'components/UserContext';
import UserForm from 'components/UserForm';
import { VariantButton } from 'types';
import ShoppingCart from './ShoppingCart';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { users, loggedInUser } = useUserContext();
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleRemoveUser = useCallback(
    (branchId: number) => {
      if (branchId) {
        dispatch(removeUser(branchId));
      }
    },
    [dispatch],
  );

  return (
    <Container>
      <GridStyled>
        <GridItem>{loggedInUser[0].userName}</GridItem>
        <GridItemRight>
          <Button
            variant={VariantButton.SECONDARY}
            label={'logout'}
            onClick={handleLogout}
            disabled={false}
          />
        </GridItemRight>
        <GridItem>
          <UserForm />
        </GridItem>
        <GridItemRight>
          <Table
            users={users}
            onClick={handleRemoveUser}
            userId={loggedInUser[0].branchId}
          />
        </GridItemRight>
      </GridStyled>
      <GridStyled>
        <GridSpan>
          <ShoppingCart />
        </GridSpan>
      </GridStyled>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100;
  align-items: start;
  justify-content: start;
  padding: 10px;
  height: 100%;
  overflow: hidden;
`;

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  height: 100%;
  width: 100%;
  @media only screen and (hover: none) and (pointer: coarse) and (orientation: portrait) {
    grid-template-columns: 100%;
  }
`;

const GridItem = styled.div`
  display: flex;
  width: auto;
  padding: 10px;
  min-width: 300px;
`;

const GridItemRight = styled.div`
  display: flex;
  padding: 10px;
  text-align: right;
  justify-content: right;
`;

const GridSpan = styled.div`
  padding: 10px;
  box-sizing: border-box;
  grid-column: span 2;
`;

export default AdminPage;

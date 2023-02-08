import styled from 'styled-components';
import { UserProps } from 'types';
import hexToRgb from 'utils/hexToRgb';

interface SimpleTableProps {
  users: UserProps[];
  onClick: (branchId: number) => void;
  userId: number;
}

const SimpleTable = ({ users, onClick, userId }: SimpleTableProps) => {
  return (
    <TableStyled>
      <thead>
        <tr>
          <th>#</th>
          <th>Branch ID</th>
          <th>Username</th>
          <th>Name</th>
          <th>Position</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: UserProps, index: number) => (
          <tr key={index}>
            <TdStyled height="10%">{index + 1}</TdStyled>
            <TdStyled>{user.branchId}</TdStyled>
            <TdStyled>{user.userName}</TdStyled>
            <TdStyled>
              {`${user.firstName} ${user.middleName.charAt(0)}. ${user.lastName}`}
            </TdStyled>
            <TdStyled>{user.position}</TdStyled>
            <TdStyled>
              <Button
                onClick={() => onClick(user?.branchId)}
                disabled={userId === user.branchId}
              >
                REMOVE
              </Button>
            </TdStyled>
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};

const TableStyled = styled.table`
  border: 1px solid ${hexToRgb('#000000', 0.2)};
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-height: 100px;
  font: normal 13px Arial, sans-serif;
  thead th {
    text-align: left;
    padding: 5px;
    border: 0.5px solid ${hexToRgb('#000000', 0.2)};
  }
  @media only screen and (hover: none) and (pointer: coarse) {
    font-size: 8px;
  }
`;

const TdStyled = styled.td`
  text-align: left;
  color: #333;
  height: 10px;
  overflow: hidden;
  padding: 5px;
  border: 1px solid ${hexToRgb('#000000', 0.1)};
  text-shadow: 1px 1px 1px #00fff;
`;
const Button = styled.button`
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }
  @media only screen and (hover: none) and (pointer: coarse) {
    font-size: 8px;
  }
`;

export default SimpleTable;

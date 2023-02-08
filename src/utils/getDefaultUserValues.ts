import { UserProps } from 'types';

export default function getDefaultUserValues(): UserProps {
  return {
    branchId: 0,
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
    password: '',
  };
}

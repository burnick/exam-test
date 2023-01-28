export enum VariantButton {
  PRIMARY,
  SECONDARY,
  CUSTOM,
  RESET,
  SIMPLE,
}

export interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: VariantButton;
  label?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

export interface LoginFormProps {
  branchId: number;
  userName: string;
  password: string;
}

export interface InputTextProps {
  placeHolder?: string;
  type?: string;
  name?: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<unknown>) => void;
  value: string | number;
}

export interface UserProps extends LoginFormProps {
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
}

export interface UsersState {
  users: UserProps[];
  foundUser: boolean;
  loggedInUser: UserProps[];
}

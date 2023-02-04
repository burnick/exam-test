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
export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface CartProps {
  items: Item[];
}

export type CartEvent =
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'CHECKOUT' }
  | { type: 'CANCEL' }
  | { type: 'CHECKOUT_SUCCESS' }
  | { type: 'CHECKOUT_ERROR' }
  | { type: 'CLEAR_CART' };

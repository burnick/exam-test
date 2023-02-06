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

export enum CartEventTypes {
  DELETE_ITEM = 'DELETE_ITEM',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ONE_ITEM = 'REMOVE_ONE_ITEM',
  CHECKOUT = 'CHECKOUT',
  CANCEL = 'CANCEL',
  CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS',
  CHECKOUT_ERROR = 'CHECKOUT_ERROR',
  CLEAR_CART = 'CLEAR_CART',
  TRY_CHECKOUT = 'TRY_CHECKOUT',
}

export type CartEventItem = {
  type: CartEventTypes,
  item: Item
}  

export type CartEventItemId = {
  type: CartEventTypes,
  id: string
} 

export type CartEvent =
  | CartEventItem
  | CartEventItemId
  | { type: CartEventTypes };

 
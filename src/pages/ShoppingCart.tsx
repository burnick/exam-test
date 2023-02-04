import React, { useCallback } from 'react';
import { useMachine } from '@xstate/react';
import shoppingCartMachine from 'machines/shoppingCart';
import styled from 'styled-components';
import { Item } from 'types';

const Cart: React.FC = () => {
  const machine = React.useMemo(() => shoppingCartMachine, []);

  const [current, send] = useMachine(machine);

  const { items } = current.context;

  const handleAddItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, item: Item) => {
      evt.preventDefault();
      if (item) {
        send({ type: 'ADD_ITEM', item });
      }
    },
    [send],
  );

  const handleRemoveItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, id: string) => {
      evt.preventDefault();

      if (id) {
        send({ type: 'REMOVE_ITEM', id });
      }
    },
    [send],
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`li-${index}-${item.id}`}>
            {item.name} {item.quantity}
            <Button
              key={`button-${index}-${item}`}
              onClick={(evt) => handleRemoveItem(evt, item.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <button
        onClick={(evt) => handleAddItem(evt, { id: '1', name: 'apple', quantity: 1 })}
      >
        Add Apple
      </button>
      <button
        onClick={(evt) => handleAddItem(evt, { id: '2', name: 'banana', quantity: 1 })}
      >
        Add Banana
      </button>
    </div>
  );
};

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

export default Cart;

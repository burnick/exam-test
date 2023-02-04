import React, { useCallback, useMemo, useState } from 'react';
import { useMachine } from '@xstate/react';
import shoppingCartMachine from 'machines/shoppingCart';
import styled from 'styled-components';
import { Item, CartEventTypes } from 'types';

const Products = [
  { id: '1', name: 'apple', quantity: 1 },
  { id: '2', name: 'banana', quantity: 1 },
];

const Cart: React.FC = () => {
  const [isCartDisabled, setIsCartDisabled] = useState(false);
  const machine = useMemo(() => shoppingCartMachine, []);
  const [current, send, service] = useMachine(machine);
  const currentXstateValue = service.getSnapshot().value;
  const { items } = current.context;
  React.useEffect(() => {
    setIsCartDisabled(currentXstateValue !== 'idle');
  }, [currentXstateValue]);

  const handleAddItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, item: Item) => {
      evt.preventDefault();
      if (item) {
        send({ type: CartEventTypes.ADD_ITEM, item });
      }
    },
    [send],
  );

  const handleDeleteItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, id: string) => {
      evt.preventDefault();

      if (id) {
        send({ type: CartEventTypes.DELETE_ITEM, id });
      }
    },
    [send],
  );

  const handleRemoveItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, id: string) => {
      evt.preventDefault();

      if (id) {
        send({ type: CartEventTypes.REMOVE_ONE_ITEM, id });
      }
    },
    [send],
  );

  const handleCheckout = useCallback(() => {
    // console.log('CHECKOUT')
    send({ type: CartEventTypes.CHECKOUT });
  }, [send]);

  const handleClearCart = useCallback(() => {
    // console.log('CHECKOUT')
    send({ type: CartEventTypes.CLEAR_CART });
  }, [send]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`li-${index}-${item.id}`}>
            <ProductContainer>
              <ProductTitle>
                Name:
                {item.name} Quantity: {item.quantity}
              </ProductTitle>
              <Button
                key={`button-remove-${index}-${item}`}
                onClick={(evt) => handleRemoveItem(evt, item.id)}
                disabled={isCartDisabled}
              >
                Remove 1
              </Button>
              <Button
                key={`button-delete-${index}-${item}`}
                onClick={(evt) => handleDeleteItem(evt, item.id)}
                disabled={isCartDisabled}
              >
                Delete
              </Button>
            </ProductContainer>
          </li>
        ))}
      </ul>
      {Products.map((product) => (
        <button
          key={`button-${product.id}`}
          onClick={(evt) => handleAddItem(evt, product)}
          disabled={isCartDisabled}
        >
          Add {product.name}
        </button>
      ))}
      {items.length > 0 && (
        <button onClick={handleCheckout}>
          {currentXstateValue === 'idle' ? 'Start' : 'End'} Checkout
        </button>
      )}
      {items.length > 0 && (
        <button onClick={handleClearCart} disabled={items.length <= 0}>
          Clear cart
        </button>
      )}
    </div>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px;
`;

const ProductTitle = styled.div`
  text-transform: uppercase;

  margin-right: 10px;
  font-size: 12px;
  font-weight: bold;
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

export default Cart;

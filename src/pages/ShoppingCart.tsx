import React, { useCallback, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import shoppingCartMachine from 'machines/shoppingCart';
import styled from 'styled-components';
import { Item, CartEventTypes } from 'types';

const Products = [
  { id: '1', name: 'apple', quantity: 1 },
  { id: '2', name: 'banana', quantity: 1 },
];

const Cart: React.FC = () => {
  const machine = useMemo(() => shoppingCartMachine, []);

  const [current, send] = useMachine(machine);

  const { items } = current.context;

  // React.useEffect(() => {
  //   if (items.length > 0) {
  //     send({ type: 'HANDLE_ITEM_ADDED', payload: items[0] });
  //   }
  // }, [send, items]);

  const handleAddItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, item: Item) => {
      evt.preventDefault();
      if (item) {
        send({ type: CartEventTypes.ADD_ITEM, item });
      }
    },
    [send],
  );

  const handleRemoveItem = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>, id: string) => {
      evt.preventDefault();

      if (id) {
        send({ type: CartEventTypes.REMOVE_ITEM, id });
      }
    },
    [send],
  );

  const handleCheckout = useCallback(() => {
    send({ type: CartEventTypes.CHECKOUT });
  }, [send]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`li-${index}-${item.id}`}>
            <ProductContainer>
              <ProductTitle>
                {item.name} {item.quantity}
              </ProductTitle>
              <Button
                key={`button-${index}-${item}`}
                onClick={(evt) => handleRemoveItem(evt, item.id)}
              >
                Remove
              </Button>
            </ProductContainer>
          </li>
        ))}
      </ul>
      {Products.map((product) => (
        <button
          key={`button-${product.id}`}
          onClick={(evt) => handleAddItem(evt, product)}
        >
          Add {product.name}
        </button>
      ))}
      <button onClick={handleCheckout} disabled={items.length <= 0}>
        Checkout
      </button>
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

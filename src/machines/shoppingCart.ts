import { createMachine, assign } from 'xstate';
import {
  CartProps,
  CartEvent,
  CartEventItem,
  CartEventItemId,
  Item,
  CartEventTypes,
} from 'types';

const findItemById = (items: Item[], id: string) => {
  return items.findIndex((item) => item.id === id);
};

const shoppingCartMachine = createMachine<CartProps, CartEvent>(
  {
    id: 'shoppingCartMachine',
    initial: 'idle',
    predictableActionArguments: true,
    context: {
      items: [],
    },
    states: {
      idle: {
        on: {
          ADD_ITEM: { actions: ['addItem', 'sendTelemetry'] },
          REMOVE_ONE_ITEM: {
            target: 'idle',
            actions: ['handleRemove1Item', 'sendTelemetry'],
          },

          DELETE_ITEM: {
            actions: ['deleteItem', 'sendTelemetry'],
          },
          CLEAR_CART: { target: 'idle', actions: ['clearCart', 'sendTelemetry'] },
          TRY_CHECKOUT: 'hasItems',
        },
      },
      hasItems: {
        on: {
          CHECKOUT: { target: 'idle', actions: ['handleCheckout', 'clearCart'] },
          CLEAR_CART: { target: 'idle', actions: ['clearCart'] },
          CHECKOUT_SUCCESS: 'success',
          CHECKOUT_ERROR: 'failure',
        },
      },
      success: {
        type: 'final',
      },
      failure: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      addItem: assign((context, event) => {
        const itemEvt = event as CartEventItem;
        const findIndex = findItemById(context.items, itemEvt.item.id);
        if (findIndex === -1) {
          context.items.push(itemEvt.item);
        }

        if (findIndex !== -1) {
          context.items[findIndex] = {
            ...itemEvt.item,
            quantity: context.items[findIndex].quantity + 1,
          };
        }

        return context;
      }),
      handleRemove1Item: assign((context, event) => {
        const { id } = event as CartEventItemId;

        const findIndex = context.items.findIndex(
          (item) => item.id === id && item.quantity > 1,
        );
        if (findIndex === -1) {
          context.items = [...context.items.filter((item) => item.id !== id)];
        }

        if (findIndex !== -1) {
          context.items[findIndex] = {
            ...context.items[findIndex],
            quantity: context.items[findIndex].quantity - 1,
          };
        }

        return context;
      }),
      deleteItem: assign((context, event) => {
        const { id } = event as CartEventItemId;

        return {
          items: [...context.items.filter((item) => item.id !== id)],
        };
      }),
      handleCheckout: assign((context) => {
        /**TO DO: Handle checkout */
        return context;
      }),
      clearCart: assign((context) => {
        return { items: context.items.filter((item) => item.quantity < 1) };
      }),
      sendTelemetry: (_, event) => {
        /**
         * We log events here after we process them so that we know the correct data.
         */
        const eventPropsId = event as CartEventItemId;
        const eventPropsItem = event as CartEventItem;

        if (
          eventPropsId.type === CartEventTypes.REMOVE_ONE_ITEM ||
          eventPropsId.type === CartEventTypes.DELETE_ITEM
        ) {
          console.info('type: ', eventPropsId.type, 'Item ID: ', eventPropsId.id);
        }

        if (
          eventPropsId.type !== CartEventTypes.REMOVE_ONE_ITEM &&
          eventPropsId.type !== CartEventTypes.DELETE_ITEM
        ) {
          console.info('type: ', eventPropsItem.type, 'Item: ', eventPropsItem.item);
        }

        console.info('evt time:', Date.now());
      },
    },
  },
);

export default shoppingCartMachine;

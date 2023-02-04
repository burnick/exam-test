import { createMachine, assign } from 'xstate';
import { CartProps, CartEvent, Item } from 'types';

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
            actions: ['deleteItem'],
          },
          CLEAR_CART: { target: 'idle', actions: ['clearCart'] },
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
        console.info(event.type)
        if (event.type !== 'ADD_ITEM') {
          return context;
        }
        const itemEvt = event.item as Item;

        const findIndex = context.items.findIndex((item) => item.id === itemEvt.id);
        if (findIndex !== -1) {
          context.items[findIndex] = {
            ...itemEvt,
            quantity: context.items[findIndex].quantity + 1,
          };
        } else {
          context.items.push(itemEvt);
        }

        return context;
      }),
      handleRemove1Item: assign((context, event) => {
        if (event.type !== 'REMOVE_ONE_ITEM') {
          return context;
        }

        const itemEvtId = event.id as string;

        const findIndex = context.items.findIndex(
          (item) => item.id === itemEvtId && item.quantity > 1,
        );
        if (findIndex !== -1) {
          context.items[findIndex] = {
            ...context.items[findIndex],
            quantity: context.items[findIndex].quantity - 1,
          };
        } else {
          context.items = [...context.items.filter((item) => item.id !== itemEvtId)];
        }

        return context;
      }),
      deleteItem: assign((context, event) => {
        if (event.type !== 'DELETE_ITEM') {
          return context;
        }

        const itemEvt = event.id as string;
        return {
          items: [...context.items.filter((item) => item.id !== itemEvt)],
        };
      }),
      handleCheckout: assign((context) => {
        /**TO DO: Handle checkout */
        return context;
      }),
      clearCart: assign((context) => {
        return { items: context.items.filter((item) => item.quantity < 1) };
      }),
      sendTelemetry: () => {
        console.info('time:', Date.now());
      },
    },
  },
);

export default shoppingCartMachine;

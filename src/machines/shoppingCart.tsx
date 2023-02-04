import { createMachine, assign } from 'xstate';
import { CartProps, CartEvent, Item } from 'types';

const shoppingCartMachine = createMachine<CartProps, CartEvent>({
  id: 'shoppingCartMachine',
  initial: 'idle',
  context: {
    items: [],
  },
  states: {
    idle: {
      on: {
        ADD_ITEM: {
          actions: assign((context, event) => {
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
        },
        REMOVE_ITEM: {
          actions: assign((context, event) => {
            const itemEvt = event.id as string;
            return {
              items: [...context.items.filter((item) => item.id !== itemEvt)],
            };
          }),
        },
      },
    },
    hasItems: {
      on: {
        CHECKOUT: {
          // actions: assign((context, _) => {
          //   console.log(context)
          //   return context;
          // }),
          target: 'idle',
        },
        CLEAR_CART: {
          target: 'idle',
        },
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
});

export default shoppingCartMachine;

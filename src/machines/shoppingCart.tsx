import { createMachine, assign } from 'xstate';
import { CartProps, CartEvent, Item } from 'types';

const shoppingCartMachine = createMachine<CartProps, CartEvent>({
  id: 'shoppingCartMachine',
  initial: 'idle',
  predictableActionArguments: true,
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
        REMOVE_ONE_ITEM:{
          actions: assign((context, event) => {
            const itemEvtId = event.id as string;

            const findIndex = context.items.findIndex((item) => item.id === itemEvtId && item.quantity > 1 );
            if (findIndex !== -1) {
              context.items[findIndex] = {
                ...context.items[findIndex],
                quantity:  context.items[findIndex].quantity - 1 ,
              };
            }
            
            else {
              context.items = [
              ...context.items.filter((item) => item.id !== itemEvtId)
              ]
            }

            return context;
          }),
          target: 'idle'
        },
        
        DELETE_ITEM: {
          actions: assign((context, event) => {
            const itemEvt = event.id as string;
            return {
              items: [...context.items.filter((item) => item.id !== itemEvt)],
            };
          }),
        },
        CLEAR_CART: {
          actions: assign((context) => {
            return {items: context.items.filter((item) => item.quantity < 1)};

          }),
          target: 'idle',
        },
        CHECKOUT: 'hasItems',
      },
    },
    hasItems: {
      on: {
        CHECKOUT: {
          actions: assign((context) => {
            return  context

          }),
          target: 'idle',
        },
        CLEAR_CART: {
          actions: assign((context) => {
            return {items: context.items.filter((item) => item.quantity < 1)};

          }),
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

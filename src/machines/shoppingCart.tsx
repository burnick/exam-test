import { createMachine, assign } from 'xstate';
import { CartProps, CartEvent, Item } from 'types';

const shoppingCartMachine = createMachine<CartProps, CartEvent>({
  id: 'cart',
  initial: 'idle',
  context: {
    items: [],
  },
  states: {
    idle: {
      on: {
       
        ADD_ITEM: {
          actions: assign((ctx, event) => {
            const itemEvt = event.item as Item;

            const findIndex = ctx.items.findIndex((item) => item.id === itemEvt.id);
            if (findIndex !== -1) {
             ctx.items[findIndex] = {
                ...itemEvt,
                quantity: ctx.items[findIndex].quantity + 1,
              };
              
            } else {
              ctx.items.push(itemEvt);
            }

            return ctx;
          })
        },
        REMOVE_ITEM: {
          actions: assign((ctx, event) => {
            const itemEvt = event.id as string;
                    return {
              items: [
                ...ctx.items.filter(item => item.id !== itemEvt)
              ]
            }

          }),
          target: 'idle',
        },
      },
    },
    hasItems: {
    
    },
  },
});

export default shoppingCartMachine;

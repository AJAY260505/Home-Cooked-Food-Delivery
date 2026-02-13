import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    // ✅ ADD ITEM
    case "ADD": {
      const existingItem = state.find(
        (item) => item.id === action.id && item.size === action.size
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.id && item.size === action.size
            ? {
                ...item,
                qty: item.qty + action.qty
              }
            : item
        );
      }

      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          unitPrice: action.price,   // ✅ store base price only
          qty: action.qty,
          size: action.size,
          img: action.img,
        },
      ];
    }

    // ✅ REMOVE ITEM
    case "REMOVE": {
      return state.filter((_, index) => index !== action.index);
    }

    // ✅ UPDATE QUANTITY (for + / - buttons)
    case "UPDATE_QTY": {
      return state
        .map((item, index) =>
          index === action.index
            ? { ...item, qty: action.qty }
            : item
        )
        .filter((item) => item.qty > 0); // remove if qty 0
    }

    // ✅ CLEAR CART
    case "DROP":
      return [];

    default:
      return state; // ⚠️ VERY IMPORTANT (prevents white screen)
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

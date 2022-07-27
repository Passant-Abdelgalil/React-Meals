import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "CLEAR") return defaultCartState;
  let updatedItems = [...state.items];
  let updatedTotlaPrice = state.totalPrice;
  const itemIdx = updatedItems.findIndex((item) => item.id === action.data.id);
  const item = itemIdx === -1 ? action.data : updatedItems[itemIdx];
  if (itemIdx === -1 && action.type !== "ADD_ITEM") return { ...state };

  const processItem = (add) => {
    /* in/decrease the total cart price by the total price of the item */
    updatedTotlaPrice = add
      ? updatedTotlaPrice + item.price * action.data.amount
      : updatedTotlaPrice - item.price * action.data.amount;

    /* if the item doesn't already exist in the cart, add a new entry */
    if (itemIdx === -1) {
      updatedItems = updatedItems.concat(item);
      return [updatedTotlaPrice, updatedItems];
    }

    /* else update the amount of the cart item by the requested amount */
    updatedItems[itemIdx] = {
      ...item,
      amount: item.amount + (add ? action.data.amount : -action.data.amount),
    };

    /* remove the item entry from the cart if its amount is non positive*/
    if (updatedItems[itemIdx].amount <= 0) updatedItems.splice(itemIdx, 1);

    return [updatedTotlaPrice, updatedItems];
  };
  switch (action.type) {
    case "ADD_ITEM":
      [updatedTotlaPrice, updatedItems] = processItem(true);
      break;
    case "REMOVE_ITEM":
      [updatedTotlaPrice, updatedItems] = processItem(false);
      break;
    default:
  }

  state = { items: updatedItems, totalPrice: updatedTotlaPrice };
  return state;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addCartItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      data: item,
    });
  };

  const removeCartItemHandler = (item) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      data: item,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addToCart: addCartItemHandler,
    removeFromCart: removeCartItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

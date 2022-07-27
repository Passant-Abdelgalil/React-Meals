import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addToCart: (item) => {},
  removeFromCart: (item) => {},
  clearCart: () => {},
});

export default CartContext;

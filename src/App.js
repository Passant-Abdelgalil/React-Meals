/* React Components */
import { useState } from "react";

/* Styles */

/* Components */
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import MealsList from "./components/MealsList/MealsList";
import CartProvider from "./Context/CartProvider";

/* Implementation */
function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    document.body.classList.add("no-scroll");
    setShowCart(true);
  };

  const hideCartHandler = () => {
    document.body.classList.remove("no-scroll");
    setShowCart(false);
  };

  return (
    <CartProvider>
      <Header showCart={showCartHandler} />
      {showCart && <Cart hideCart={hideCartHandler} />}
      <Landing />
      <MealsList />
    </CartProvider>
  );
}

export default App;

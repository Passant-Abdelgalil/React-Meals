/* React Components */
import { useContext } from "react";
import CartContext from "../../Context/cart-context";
/* Styles */
import styles from "./CartItem.module.css";

/* Components */

/* Implementation */
const CartItem = (props) => {
  const cartContext = useContext(CartContext);

  const item = {
    id: props.id,
    title: props.title,
    amount: props.amount,
    price: props.price,
  };

  const price = `$${item.price.toFixed(2)}`;

  const decreaseCartItemHandler = () => {
    cartContext.removeFromCart({ ...item, amount: 1 });
  };
  const increaseCartItemHandler = () => {
    cartContext.addToCart({ ...item, amount: 1 });
  };

  const removeCartItemHandler = () => {
    cartContext.removeFromCart(item);
  };

  return (
    <li className={styles["cart-item"]}>
      <div className={styles["cart-item__info"]}>
        <p className={styles["cart-item__title"]}>{item.title}</p>
        <p className={styles["cart-item__price"]}>{price}</p>
        <p className={styles["cart-item__amount"]}>x {item.amount}</p>
      </div>
      <div className={styles["cart-item__actions"]}>
        <button
          className={styles["cart-item--dec"]}
          onClick={decreaseCartItemHandler}
        >
          -
        </button>
        <button
          className={styles["cart-item--inc"]}
          onClick={increaseCartItemHandler}
        >
          +
        </button>
        <button
          className={styles["cart-item--remove"]}
          onClick={removeCartItemHandler}
        >
          delete
        </button>
      </div>
    </li>
  );
};

export default CartItem;

/* React Components */
import { useContext, useEffect, useState } from "react";
/* Styles */
import styles from "./HeaderCartCounter.module.css";
/* Components */
import CartContext from "../../Context/cart-context";
import Button from "../UI/Button/Button";
/* Implementation */

const HeaderCartCounter = (props) => {
  const [runAnimation, setRunAnimation] = useState(false);
  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;
  const cartItemsCount = items.reduce(
    (prevCount, currItem) => prevCount + currItem.amount,
    0
  );

  useEffect(() => {
    if (items.length === 0) return;
    setRunAnimation(true);

    // remove the animation class after the animation period
    const timer = window.setTimeout(() => {
      setRunAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <Button
      className={`${styles["cart-counter"]} ${runAnimation ? styles.bump : ""}`}
      onClick={props.onClick}
    >
      <i className={styles["cart-counter__logo"]}></i>
      <p className={styles["cart-counter__title"]}>Your Cart</p>
      <span className={styles["cart-counter__value"]}>{cartItemsCount}</span>
    </Button>
  );
};

export default HeaderCartCounter;

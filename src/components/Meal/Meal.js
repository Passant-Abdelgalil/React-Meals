/* React Components */
import { useRef, useState, useContext } from "react";

/* Styles */
import styles from "./Meal.module.css";

/* Components */
import CartContext from "../../Context/cart-context";
import Button from "../UI/Button/Button";

/* Implementation */
const Meal = (props) => {
  /* Error state to include a flag and the error message */
  const [errorState, setErrorState] = useState({ flag: false, message: "" });

  /* get access to cart context */
  const cartCtx = useContext(CartContext);

  const addToCart = (amount) => {
    cartCtx.addToCart({
      id: props.id,
      title: props.title,
      amount: amount,
      price: props.price,
    });
  };

  /* Ref to input field of meal amount, used to access the entered value*/
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = Number(amountInputRef.current.value);

    if (!enteredAmount) {
      setErrorState({ flag: true, message: "Amount can not be empty" });
      return;
    }
    if (enteredAmount < 1 || enteredAmount > 5) {
      setErrorState({ flag: true, message: "Amount must be in range [1-5]" });
      return;
    }
    addToCart(enteredAmount);
  };

  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles["meal-item"]}>
      <div className={styles["meal-item__info"]}>
        <p className={styles["meal-item__title"]}>{props.title}</p>
        <p className={styles["meal-item__desc"]}>{props.description}</p>
        <p className={styles["meal-item__price"]}>{price}</p>
      </div>
      <form className={styles["meal-item__form"]} onSubmit={submitHandler}>
        <div className={styles["meal-item__amount"]}>
          <label
            className={styles["meal-item__amount__title"]}
            htmlFor={props.id}
          >
            Amount
          </label>
          <input
            ref={amountInputRef}
            id={props.id}
            className={`${styles["meal-item__amount__value"]} ${
              errorState.flag && styles["error"]
            }`}
            type="number"
            min="1"
            max="5"
            step="1"
            defaultValue="1"
          />
        </div>
        <Button
          name="+ Add"
          className={styles["meal-item--add"]}
          type="submit"
        />

        {errorState.flag && (
          <p className={styles["error-msg"]}>{errorState.message}</p>
        )}
      </form>
    </li>
  );
};

export default Meal;

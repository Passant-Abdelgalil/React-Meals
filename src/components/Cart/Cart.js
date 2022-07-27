/* React Components */
import { Fragment, useContext, useEffect, useState, useReducer } from "react";
import ReactDOM from "react-dom";

/* Styles */
import styles from "./Cart.module.css";

/* Components */
import CartItem from "../CartItem/CartItem";
import CartContext from "../../Context/cart-context";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import SuccessMessage from "../UI/SuccessMessage/SuccessMessage";
import Button from "../UI/Button/Button";

/* DATA */
const ORDERS_URL =
  "https://react-http-e728b-default-rtdb.firebaseio.com/orders.json";

const initialState = {
  loading: false,
  error: { flag: false, message: "" },
  success: false,
};

/* Implementation */
const Cart = (props) => {
  /* get access to cart context */
  const cartCtx = useContext(CartContext);

  /* state flag to control show/hiding of checkout form */
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  /* reuder frunction */
  const reducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return {
          success: false,
          loading: true,
          error: { flag: false, message: "" },
        };
      case "ERROR":
        return {
          success: false,
          loading: false,
          error: { flag: true, message: action.data },
        };
      case "SUCCESS":
        return {
          success: true,
          loading: false,
          error: { flag: false, message: "" },
        };
      default:
        return state;
    }
  };

  /* state to manage errors & loading */
  const [state, dispatchState] = useReducer(reducer, initialState);

  /* function to  submit checkout form */
  const submitForm = (userData) => {
    dispatchState({ type: "LOADING" });

    const sendRequest = async () => {
      /* send request to the server */
      const response = await fetch(ORDERS_URL, {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      });
      if (!response.ok) throw new Error(await response.text());

      dispatchState({ type: "SUCCESS" });
    };
    sendRequest()
      .then(() => {
        cartCtx.clearCart();
      })
      .catch((error) => {
        dispatchState({ type: "ERROR", data: error.message });
      });
  };

  /* set checkout form flag to false whenever the cart is empty */
  useEffect(() => {
    if (cartCtx.items.length === 0) setShowCheckoutForm(false);
  }, [cartCtx.items.length]);

  /* flag to indicate if the cart is empty,
    used to do/don't render the cart list
  */
  const hasItems = cartCtx.items && cartCtx.items.length > 0;

  // calculate total price from items in cart context
  const totalPrice = hasItems
    ? cartCtx.items
        .reduce((prevPrice, item) => prevPrice + item.price * item.amount, 0)
        .toFixed(2)
    : 0;

  const orderHandler = () => {
    setShowCheckoutForm(true);
  };

  const cartItemsList = (
    <ul className={styles["cart-list"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            amount={item.amount}
          />
        );
      })}
    </ul>
  );
  const cartContent = (
    <Fragment>
      {hasItems && cartItemsList}
      <footer className={styles["cart-footer"]}>
        <div className={styles["cart-footer__info"]}>
          <p className={styles["cart-footer__title"]}>Total Amount</p>
          <p className={styles["cart-footer__price"]}>${totalPrice}</p>
        </div>
        {showCheckoutForm && (
          <CheckoutForm hideCart={props.hideCart} submitForm={submitForm} />
        )}
        {!showCheckoutForm && (
          <div className={styles["cart-footer__actions"]}>
            <Button
              name="Close"
              className={styles["cart-footer--close"]}
              onClick={props.hideCart}
            />
            {hasItems && (
              <Button
                name="Order"
                className={styles["cart-footer--confirm"]}
                onClick={orderHandler}
              />
            )}
          </div>
        )}
      </footer>
    </Fragment>
  );
  const showRegularContent =
    !state.loading && !state.error.flag && !state.success;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div
          className={styles.overlay}
          onClick={props.hideCart}
          aria-hidden="true"
        ></div>,
        document.getElementById("overlays")
      )}
      <div className={styles.cart}>
        {state.loading && <LoadingSpinner />}
        {state.error.flag && <ErrorMessage message={state.error.message} />}
        {state.success && (
          <SuccessMessage message="Items are successfully ordered" />
        )}
        {showRegularContent && cartContent}
      </div>
    </Fragment>
  );
};

export default Cart;

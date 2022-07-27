/* React Imports */
import React from "react";
import { useState } from "react";

/* Styles */
import styles from "./CheckoutForm.module.css";
import cartStyles from "../Cart/Cart.module.css";

/* Components */
import InputField from "../InputField/InputField";
import Button from "../UI/Button/Button";

/* Implementation */
const CheckoutForm = (props) => {
  /* submit form handler */
  const confirmHandler = (event) => {
    event.preventDefault();

    /* if a submit is request although the form is invalid return */
    if (!formValidity) return;

    /* get user data entered */
    const userData = {
      name: nameRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
      postalCode: postalRef.current.value,
    };

    /* pass entered user data to submit function */
    props.submitForm(userData);
  };
  /* states to manage validity of form fields and hence the overall form */
  const [nameIsValid, setNameIsValid] = useState(false);
  const [streetIsValid, setStreetIsValid] = useState(false);
  const [cityIsValid, setCityIsValid] = useState(false);
  const [postalCodeIsValid, setPostalCodeIsValid] = useState(false);

  /* refs to access input components value */
  const nameRef = React.createRef();
  const streetRef = React.createRef();
  const cityRef = React.createRef();
  const postalRef = React.createRef();

  /* functions to be called by each corresponding input field component 
  to set the corresponding state flag according to the component validation */
  const setNameValidity = (validity) => {
    setNameIsValid(validity);
  };
  const setStreetValidity = (validity) => {
    setStreetIsValid(validity);
  };
  const setPostalCodeValidity = (validity) => {
    setPostalCodeIsValid(validity);
  };
  const setCityValidity = (validity) => {
    setCityIsValid(validity);
  };

  /* Rules for every input field */
  const nameRules = [
    {
      regex: /.{3,}/,
      message: "Name must be at least 3 letters",
    },
    {
      regex: /^[a-zA-Z]+$/,
      message: "Name must contain only letters",
    },
  ];
  const streetRules = [
    {
      regex: /.{3,}/,
      message: "Street must be at least 3 letters",
    },
    {
      regex: /^[a-zA-Z]+$/,
      message: "Street must contain only letters",
    },
  ];
  const cityRules = [
    {
      regex: /.{3,}/,
      message: "City must be at least 3 letters",
    },
    {
      regex: /^[a-zA-Z]+$/,
      message: "City must contain only letters",
    },
  ];
  const postalCodeRules = [
    {
      regex: /^[0-9]{5}(?:-[0-9]{4})?$/,
      message: "Please enter a valid postal code",
    },
  ];

  /* flag to hold validity of the form */
  const formValidity =
    nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

  return (
    <form className={styles["checkout-form"]}>
      <InputField
        id="name"
        label="Your Name"
        type="text"
        ref={nameRef}
        className={`${styles["checkout-form__input"]}`}
        rules={nameRules}
        setValidity={setNameValidity}
      />
      <InputField
        id="street"
        label="Street"
        type="text"
        ref={streetRef}
        className={`${styles["checkout-form__input"]}`}
        rules={streetRules}
        setValidity={setStreetValidity}
      />

      <InputField
        id="postal-code"
        label="Postal Code"
        type="text"
        ref={postalRef}
        className={`${styles["checkout-form__input"]}`}
        rules={postalCodeRules}
        setValidity={setPostalCodeValidity}
      />

      <InputField
        id="city"
        label="City"
        type="text"
        ref={cityRef}
        className={`${styles["checkout-form__input"]}`}
        rules={cityRules}
        setValidity={setCityValidity}
      />

      <div
        className={`${styles["checkout-form__actions"]} ${cartStyles["cart-footer__actions"]}`}
      >
        <Button
          name="Cancel"
          type="button"
          className={cartStyles["cart-footer--close"]}
          onClick={props.hideCart}
        />
        {formValidity && (
          <Button
            name="Confirm"
            type="submit"
            className={cartStyles["cart-footer--confirm"]}
            onClick={confirmHandler}
          />
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;

/* React Imports */
import React from "react";
import { useState } from "react";
/* Styles */
import styles from "./InputField.module.css";

/* Implementation */
const InputField = React.forwardRef((props, ref) => {
  // const inputRef = useRef();
  const [error, setError] = useState({ flag: false, message: "" });

  const isValid = (value) => {
    for (const rule of props.rules) {
      if ("regex" in rule && !rule.regex.test(value))
        return { flag: false, error: rule.message };
    }
    return { flag: true, error: "" };
  };

  const onBlurHandler = () => {
    const validity = isValid(ref.current.value);
    setError({ flag: !validity.flag, message: validity.error });
    props.setValidity(validity.flag);
  };

  const onFocusHandler = () => {
    setError({ flag: false, message: "" });
  };
  return (
    <div className={props.className}>
      <label htmlFor={props.id} className={styles.label}>
        {props.label}{" "}
      </label>
      <input
        id={props.id}
        type={props.type}
        ref={ref}
        className={`${error.flag ? styles.error : ""} ${styles.input}`}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
      {error.flag && <p className={styles["error-msg"]}>{error.message}</p>}
    </div>
  );
});

export default InputField;

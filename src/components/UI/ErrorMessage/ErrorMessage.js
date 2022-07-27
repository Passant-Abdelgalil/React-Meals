import styles from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  return (
    <div className={styles["error-div"]}>
      <p className={styles["error-msg"]}>{props.message}</p>
      <span className={styles["error-icon"]}></span>
    </div>
  );
};

export default ErrorMessage;

import styles from "./SuccessMessage.module.css";

const SuccessMessage = (props) => {
  return (
    <div className={styles["success-div"]}>
      <p className={styles["success-msg"]}>{props.message}</p>
      <span className={styles["success-icon"]}></span>
    </div>
  );
};

export default SuccessMessage;

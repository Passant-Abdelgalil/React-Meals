import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      {props.name ? props.name : ""}
      {props.children}
    </button>
  );
};

export default Button;

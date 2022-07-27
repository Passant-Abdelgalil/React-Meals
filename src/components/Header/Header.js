/* React Components */

/* Styles */
import HeaderCartCounter from "../HeaderCartCounter/HeaderCartCounter";
import styles from "./Header.module.css";
/* Components */

/* Implementation */

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.logo}>ReactMeals</h1>
        <HeaderCartCounter onClick={props.showCart} />
      </div>
    </header>
  );
};

export default Header;

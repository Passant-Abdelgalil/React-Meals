/* React Components */

/* Styles */
import styles from "./Landing.module.css";
/* Components */

/* Implementation */

const Landing = (props) => {
  return (
    <section className={styles.landing}>
      <div className={styles.intro}>
        <h1 className={styles["intro__heading"]}>
          Delicious Food, Delivered To You
        </h1>
        <p className={styles["intro__paragraph"]}>
          Choose your favorite meal from out broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p className={styles["intro__paragraph"]}>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </div>
    </section>
  );
};

export default Landing;

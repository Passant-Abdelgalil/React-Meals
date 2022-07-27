/* React Components */
import { useEffect, useReducer } from "react";
/* Styles */
import styles from "./MealsList.module.css";

/* Components */
import Meal from "../Meal/Meal";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

/* DATA */
const MEALS_URL =
  "https://react-http-e728b-default-rtdb.firebaseio.com/meals.json";

const initialMealsState = {
  meals: [],
  loading: false,
  error: { flag: false, message: "" },
};

/* Implementation */
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: { flag: false, message: "" } };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: { flag: true, message: action.data },
      };
    case "SUCCESS":
      return {
        meals: action.data,
        loading: false,
        error: { flag: false, message: "" },
      };

    default:
      return state;
  }
};

const MealsList = () => {
  const [mealsState, dispatchMeals] = useReducer(reducer, initialMealsState);

  useEffect(() => {
    const fetchMeals = async () => {
      dispatchMeals({ type: "LOADING" });
      const response = await fetch(MEALS_URL);

      if (!response.ok) throw new Error(await response.text());

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({ id: key, ...responseData[key] });
      }
      dispatchMeals({ type: "SUCCESS", data: loadedMeals });
    };

    fetchMeals().catch((error) => {
      dispatchMeals({ type: "ERROR", data: error.message });
    });
  }, []);

  const hasMeals = mealsState.meals.length > 0;
  const showMeals = hasMeals && !mealsState.error.flag && !mealsState.loading;

  return (
    <div className={styles["content"]}>
      <div className={`container ${styles.container}`}>
        {mealsState.loading && <LoadingSpinner />}
        {mealsState.error.flag && (
          <ErrorMessage message={mealsState.error.message} />
        )}
        {!hasMeals && !mealsState.error.flag && !mealsState.loading && (
          <ErrorMessage message="No available meals" />
        )}
        {showMeals && (
          <ul className={styles["meals-list"]}>
            {mealsState.meals.map((meal) => {
              return (
                <Meal
                  id={`meal-amount-${meal.id}`}
                  key={meal.id}
                  title={meal.title}
                  description={meal.description}
                  price={+meal.price}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MealsList;

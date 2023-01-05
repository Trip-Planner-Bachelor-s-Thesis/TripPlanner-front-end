import styles from "./Pages.module.css";
import TripDetailsFavoriteTest from "./TripDetailsFavoriteTest";

const TripDetailsAllPage = (props) => {
  return (
    <main className={styles["main-container"]}>
      {props.isTest ? <TripDetailsFavoriteTest /> : <TripDetailsFavorite />}  
    </main>
  );
};

export default TripDetailsAllPage;

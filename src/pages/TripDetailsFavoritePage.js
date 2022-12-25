import styles from "./Pages.module.css";
import TripDetailsFavorite from "../components/TripDetailsFavorite/TripDetailsFavorite";

const TripDetailsAllPage = () => {
  return (
    <main className={styles["main-container"]}>
      <TripDetailsFavorite />
    </main>
  );
};

export default TripDetailsAllPage;

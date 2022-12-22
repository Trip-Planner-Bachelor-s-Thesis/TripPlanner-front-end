import styles from "./Pages.module.css";
import TripDetailsMy from "../components/TripDetailsMy/TripDetailsMy";

const TripDetailsMyPage = () => {
  return (
    <main className={styles["main-container"]}>
      <TripDetailsMy />
    </main>
  );
};

export default TripDetailsMyPage;

import styles from "./Pages.module.css";
import NewTripTest from "./NewTripTest";

const NewTripPageTest = (props) => {
  return (
    <main className={styles["main-container"]}>
      <NewTripTest />
    </main>
  );
};

export default NewTripPageTest;

import styles from "./Pages.module.css";
import Home from "../components/Home/Home";

const HomePage = () => {
  return (
    <main className={styles["home-container"]}>
      <Home />
    </main>
  );
};

export default HomePage;

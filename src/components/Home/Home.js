import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles["home-page-container"]}>
      <h1 className={styles["greeting-text"]}>Welcome on Board!</h1>
      <div className={styles["images-container"]}>
        <div className={styles["car-background"]}></div>
        <div className={styles["bike-background"]}></div>
      </div>
      <footer className={styles["authors-footer"]}>{`Noman Noor \u00A0\u00A0 Marcin Świerkot \u00A0\u00A0 Nader Tavana`}</footer>
    </section>
  );
};

export default Home;

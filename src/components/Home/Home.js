import classes from './Home.module.css';

const Home = () => {
  return (
    <section className={classes["home-page-container"]}>
      <h1 className={classes["greeting-text"]}>Welcome on Board!</h1>
      <div className={classes["images-container"]}>
        <div className={classes["car-background"]}></div>
        <div className={classes["bike-background"]}></div>
      </div>
      <footer className={classes["authors-footer"]}>{`Noman Noor \u00A0\u00A0 Marcin Świerkot \u00A0\u00A0 Nader Tavana`}</footer>
    </section>
  );
};

export default Home;

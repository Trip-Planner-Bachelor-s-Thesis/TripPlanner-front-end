import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import styles from "./Home.module.css";
import LogRegisterContext from "../../contexts/log-register-context";

const Home = () => {
  const logRegisterContext = useContext(LogRegisterContext);
  const navigate = useNavigate();

  const closeModal = () => {
    logRegisterContext.updateFirstLogin();
  };
  const closeModalRedirect = () => {
    logRegisterContext.updateFirstLogin();
    navigate("/help", { replace: true });
  };

  return (
    <section className={styles["home-page-container"]}>
      <Modal show={logRegisterContext.firstLogin} onHide={closeModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>First time on our page?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click Go to button to get to know more about the functionalities</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModalRedirect}>Go to</Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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

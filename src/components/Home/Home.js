import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Sheet from "@mui/joy/Sheet"
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";

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
      {/* <Modal show={logRegisterContext.firstLogin} onHide={closeModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>First time on our page?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click Go to button to get to know more about the functionalities</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModalRedirect}>Go to</Button>
          <Button variant="secondary" onClick={closeModal} data-testid="close">
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal
        open={logRegisterContext.firstLogin}
        onClose={closeModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxHeight: "80%",
            width: "25%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "white",
            }}
          />
          <Typography level="h6" sx ={{textAlign: "center", mb: 1}}>First time on our page?</Typography>
          <Typography level="body1" sx ={{textAlign: "center", mb: 2}}>Click Go to button to get to know more about the functionalities</Typography>
          <Sheet sx={{display: "flex", justifyContent: "center"}}>
          <Button color="primary" variant="soft" onClick={closeModalRedirect} sx={{mr: 1}}>Go to</Button>
          <Button color="primary" variant="soft" onClick={closeModal} sx={{ml: 1}}>Close</Button>
          </Sheet>
        </Sheet>
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

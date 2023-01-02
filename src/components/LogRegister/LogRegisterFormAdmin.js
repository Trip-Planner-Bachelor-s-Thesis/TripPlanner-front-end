import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import fetchUrls from "../../helpers/fetch_urls";
import styles from "./LogRegisterForm.module.css";
import LogRegisterContext from "../../contexts/log-register-context";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const LogRegisterForm = () => {
  const [isSendingRequest, setisSendingRequest] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const logRegisterContext = useContext(LogRegisterContext);

  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const toggleErrorMessage = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setisSendingRequest(true);

    let url;
    let payload = {
      userName: username,
      password: password,
    };
    console.log(payload);
    url = fetchUrls.login;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.status);
        setisSendingRequest(false);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.token && logRegisterContext.setAdmin(data.token, true);
        data.token && navigate("/admin-panel", { replace: true });
      })
      .catch((error) => {
        setErrorMessage("Incorrect login or password")
        console.log(error);
      });
  };

  return (
    <section className={styles.forms}>
      <Sheet
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "20%",
          m: "0 auto",
          p: 2,
          borderRadius: "sm",
          boxShadow: "sm",
        }}
      >
        <Typography level="h6" sx={{ mb: 3 }}>
          Admin Login
        </Typography>
        <form className={styles["form-element"]} onSubmit={submitHandler}>
          <TextField
            sx={{ mb: 1.5 }}
            startDecorator={<PersonRoundedIcon />}
            placeholder="Username"
            type="text"
            variant="soft"
            required
            onChange={usernameHandler}
            error={!!(errorMessage)}
            onFocus={toggleErrorMessage}
          />
          <TextField
            sx={{ mb: 3 }}
            startDecorator={<LockRoundedIcon />}
            placeholder="Password"
            type="password"
            variant="soft"
            required
            onChange={passwordHandler}
            error={!!(errorMessage)}
            helperText={errorMessage}
            onFocus={toggleErrorMessage}
          />
          <Button sx={{ mb: 1, width: "100%" }} type="submit" loading={isSendingRequest}>
            Login
          </Button>
        </form>
      </Sheet>
    </section>
  );
};

export default LogRegisterForm;

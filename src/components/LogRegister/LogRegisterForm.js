import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import fetchUrls from "../../helpers/fetch_urls";
import styles from "./LogRegisterForm.module.css";
import LogRegisterContext from "../../contexts/log-register-context";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const LogRegisterForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSendingRequest, setisSendingRequest] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const logRegisterContext = useContext(LogRegisterContext);

  const navigate = useNavigate();

  const toggleHandler = () => {
    setIsLoginForm((previousState) => !previousState);
    setErrorMessage("");
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const toggleErrorMessage = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setisSendingRequest(true);

    let url;
    let payload = {
      userName: username,
      password: password,
    };
    !isLoginForm && (payload.email = email);
    console.log(payload);
    isLoginForm ? (url = fetchUrls.login) : (url = fetchUrls.register);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!isLoginForm && response.status === 409) {
          setErrorMessage("Username is already taken");
        }
        if (!isLoginForm && response.status === 400) {
          setErrorMessage(
            "Password has to contain at least one digit, one capital ltter and one special character"
          );
        }
        if (isLoginForm && response.status === 401) {
          setErrorMessage("Incorrect login or password");
        }
        setisSendingRequest(false);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.token &&
          isLoginForm &&
          logRegisterContext.login(data.token, false, false);
        data.token &&
          !isLoginForm &&
          logRegisterContext.login(data.token, true, false);
        data.token && navigate("/", { replace: true });
      })
      .catch((error) => {
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
          {isLoginForm ? "Login" : "Sign up"}
        </Typography>
        <form className={styles["form-element"]} onSubmit={submitHandler}>
          {!isLoginForm && (
            <TextField
              sx={{ mb: 1.5 }}
              startDecorator={<EmailRoundedIcon />}
              placeholder="Email"
              type="email"
              variant="soft"
              required
              onChange={emailHandler}
            />
          )}
          <TextField
            sx={{ mb: 1.5 }}
            startDecorator={<PersonRoundedIcon />}
            placeholder="Username"
            type="text"
            variant="soft"
            required
            onChange={usernameHandler}
            error={
              errorMessage === "Username is already taken" ||
              errorMessage === "Incorrect login or password"
                ? true
                : false
            }
            helperText={
              errorMessage === "Username is already taken"
                ? errorMessage
                : ""
            }
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
            error={
              errorMessage ===
                "Password has to contain at least one digit, one capital ltter and one special character" ||
              errorMessage === "Incorrect login or password"
                ? true
                : false
            }
            helperText={
              errorMessage ===
                "Password has to contain at least one digit, one capital ltter and one special character" ||
              errorMessage === "Incorrect login or password"
                ? errorMessage
                : ""
            }
            onFocus={toggleErrorMessage}
          />
          <Button
            sx={{ mb: 1.5, width: "100%" }}
            type="submit"
            loading={isSendingRequest}
          >
            {isLoginForm ? "Login" : "Create"}
          </Button>
          {isLoginForm && (
            <Link data-testid="no-account" onClick={toggleHandler}>Don't have an account yet?</Link>
          )}
          {!isLoginForm && (
            <Link data-testid="existing-account" onClick={toggleHandler}>Login with existing account</Link>
          )}
        </form>
      </Sheet>
    </section>
  );
};

export default LogRegisterForm;

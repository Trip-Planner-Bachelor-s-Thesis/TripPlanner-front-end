import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import fetchUrls from "../../helpers/fetch_urls";
import styles from "./LogRegisterForm.module.css";
import LogRegisterContext from "../../contexts/log-register-context";
import SpinnerBox from "../Utils/SpinnerBox";

const LogRegisterForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSendingRequest, setisSendingRequest] = useState(false);
  const logRegisterContext = useContext(LogRegisterContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const toggleHandler = () => {
    setIsLoginForm((previousState) => !previousState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setisSendingRequest(true);

    let url;
    let payload = {
      userName: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    !isLoginForm && (payload.email = emailRef.current.value);
    console.log(payload);
    isLoginForm ? (url = fetchUrls.login) : (url = fetchUrls.register);
    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   setisSendingRequest(false);
    //   const data = await response.json();

    //   if (!response.ok) {
    //     console.log(response.status);
    //     let errorMessage = "Authentication failed!";
    //     throw new Error(errorMessage);
    //   }
    //   isLoginForm && logRegisterContext.login(data.idToken, false);
    //   !isLoginForm && logRegisterContext.login(data.idToken, true);
    //   navigate("/", { replace: true });
    // } catch (err) {
    //   alert(err.message);
    // }
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
        data.token && isLoginForm && logRegisterContext.login(data.token, false);
        data.token && !isLoginForm && logRegisterContext.login(data.token, true);
        data.token && navigate("/trips", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles.forms}>
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>
          {isLoginForm ? "Login" : "Sign up"}
        </h1>
        <form className={styles["form-element"]} onSubmit={submitHandler}>
          {!isLoginForm && (
            <input
              type="email"
              id="email"
              placeholder="Email"
              ref={emailRef}
              required
            ></input>
          )}
          <input
            type="text"
            id="username"
            placeholder="Username"
            ref={usernameRef}
            required
          ></input>
          <input
            type="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
            required
          ></input>
          {isSendingRequest && <SpinnerBox />}
          {!isSendingRequest && (
            <button className={styles["submit-button"]} type="submit">
              {isLoginForm ? "Login" : "Create"}
            </button>
          )}
          {isLoginForm && (
            <button
              className={styles["toggle-button"]}
              type="button"
              onClick={toggleHandler}
            >
              Don't have an account yet?
            </button>
          )}
          {!isLoginForm && (
            <button
              className={styles["toggle-button"]}
              type="button"
              onClick={toggleHandler}
            >
              Login with existing account
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default LogRegisterForm;

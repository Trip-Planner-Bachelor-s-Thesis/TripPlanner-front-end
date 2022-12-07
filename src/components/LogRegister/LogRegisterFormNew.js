import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LogRegisterContext from "../../contexts/log-register-context";
import styles from "./LogRegisterFormNew.module.css";

const LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAh7CrGjATeyccm4Yw8dTpxNd4ZdS6aN0";
const REGISTER_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAh7CrGjATeyccm4Yw8dTpxNd4ZdS6aN0";

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

    const enteredUsername = !isLoginForm && usernameRef.current.value;
    console.log(enteredUsername);

    setisSendingRequest(true);
    let url;
    isLoginForm ? (url = LOGIN_URL) : (url = REGISTER_URL);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setisSendingRequest(false);
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
      isLoginForm && logRegisterContext.login(data.idToken, false);
      !isLoginForm && logRegisterContext.login(data.idToken, true);      
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className={styles.forms}>
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>{isLoginForm ? "Login" : "Sign up"}</h1>
        <form className={styles["form-element"]} onSubmit={submitHandler}>
          {!isLoginForm && <input type="text" id="username" placeholder="Username" ref={usernameRef} required></input>}
          <input type="email" id="email" placeholder="Email" ref={emailRef} required></input>
          <input type="password" id="password" placeholder="Password" ref={passwordRef} required></input>
          {isSendingRequest && <p className={styles["send-request-paragraph"]}>Sending request</p>}
          {!isSendingRequest && (
            <button className={styles["submit-button"]} type="submit">
              {isLoginForm ? "Login" : "Create"}
            </button>
          )}
          {isLoginForm && (
            <button className={styles["toggle-button"]} type="button" onClick={toggleHandler}>
              Don't have an account yet?
            </button>
          )}
          {!isLoginForm && (
            <button className={styles["toggle-button"]} type="button" onClick={toggleHandler}>
              Login with existing account
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default LogRegisterForm;

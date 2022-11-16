import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSendingRequest, setisSendingRequest] = useState(false);

  const authCtx = useContext(AuthContext);

  const toggleHandler = () => {
    setIsLoginForm((previousState) => !previousState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = !isLoginForm && usernameInputRef.current.value;
    console.log(enteredUsername);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setisSendingRequest(true);
    let url;
    if (isLoginForm) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAh7CrGjATeyccm4Yw8dTpxNd4ZdS6aN0";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAh7CrGjATeyccm4Yw8dTpxNd4ZdS6aN0";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoginForm(false);
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }

      const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
      authCtx.login(data.idToken, expirationTime.toISOString());
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className={classes.forms}>
      <div className={classes["form-container"]}>
        <h1>{isLoginForm ? "Login" : "Sign up"}</h1>
        <form className={classes["form-element"]} onSubmit={submitHandler}>
          {!isLoginForm && <input type="text" id="username" placeholder="Username" ref={usernameInputRef} required></input>}
          <input type="email" id="email" placeholder="Email" ref={emailInputRef} required></input>
          <input type="password" id="password" placeholder="Password" ref={passwordInputRef} required></input>
          {isSendingRequest && <p className={classes["send-request-paragraph"]}>Sending request</p>}
          {!isSendingRequest && (
            <button className={classes["submit-button"]} type="submit">
              {isLoginForm ? "Login" : "Create"}
            </button>
          )}
          {isLoginForm && (
            <button className={classes["toggle-button"]} type="button" onClick={toggleHandler}>
              Create new account
            </button>
          )}
          {!isLoginForm && (
            <button className={classes["toggle-button"]} type="button" onClick={toggleHandler}>
              Login with existing account
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default AuthForm;

import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import styles from "./LogRegisterForm.module.css";
//import LogRegisterContext from "../../contexts/log-register-context";
import SpinnerBox from "../Utils/SpinnerBox";

const LogRegisterFormAdmin = () => {
  const [isSendingRequest, setisSendingRequest] = useState(false);
  //const logRegisterContext = useContext(LogRegisterContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  //const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    // const enteredUsername = !isLoginForm && usernameRef.current.value;
    // console.log(enteredUsername);

    setisSendingRequest(true);
    // let url;
    // isLoginForm ? (url = LOGIN_URL) : (url = REGISTER_URL);
    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value,
    //       returnSecureToken: true,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   setisSendingRequest(false);
    //   const data = await response.json();

    //   if (!response.ok) {
    //     let errorMessage = "Authentication failed!";
    //     throw new Error(errorMessage);
    //   }
    //   isLoginForm && logRegisterContext.login(data.idToken, false);
    //   !isLoginForm && logRegisterContext.login(data.idToken, true);
    //   navigate("/", { replace: true });
    // } catch (err) {
    //   alert(err.message);
    // }
  };

  return (
    <section className={styles.forms}>
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>Admin Login</h1>
        <form className={styles["form-element"]} onSubmit={submitHandler}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            ref={emailRef}
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
              Login
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default LogRegisterFormAdmin;

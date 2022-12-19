import { useState, useEffect, useContext } from "react";

import styles from "./UserProfile.module.css";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const UserProfile = () => {
  const { token } = useContext(LogRegisterContext);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetch(fetchUrls["current-user"], {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <section className={styles["profile-container"]}>
      <div className={styles["profile-information"]}>
        {currentUser && (
          <>
            <h1 className={styles["form-title"]}>User profile</h1>
            <div>Email: {currentUser.email}</div>
            <div>Username: {currentUser.userName}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfile;

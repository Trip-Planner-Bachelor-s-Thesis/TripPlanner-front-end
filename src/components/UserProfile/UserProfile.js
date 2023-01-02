import { useState, useEffect, useContext } from "react";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Button from "@mui/joy/Button";

import styles from "./UserProfile.module.css";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";
import Preferences from "../Preferences/Preferences";

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
            <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: 'lg' }}>
  <TabList>
    <Tab>Car Trip</Tab>
    <Tab>Bike Trip</Tab>
    <Tab>Walking</Tab>
  </TabList>
  <TabPanel value={0} sx={{ p: 1 }}>
    <Preferences />
    <Button size="small">Save</Button>
  </TabPanel>
  <TabPanel value={1} sx={{ p: 1 }}>
  <Preferences />
  <Button size="small">Save</Button>
  </TabPanel>
  <TabPanel value={2} sx={{ p: 1 }}>
  <Preferences />
  <Button size="small">Save</Button>
  </TabPanel>
</Tabs>
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfile;

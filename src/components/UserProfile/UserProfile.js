import { useState, useEffect, useContext } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

//import styles from "./UserProfile.module.css";
import SpinnerBox from "../Utils/SpinnerBox";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";
import Preferences from "../Preferences/Preferences";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

const UserProfile = () => {
  const { token } = useContext(LogRegisterContext);
  const [index, setIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSendingRequest, setisSendingRequest] = useState(true);
  const [allPreferences, setAllPreferences] = useState(null);
  const [preferencesCar, setPreferencesCar] = useState(null);
  const [preferencesBike, setPreferencesBike] = useState(null);
  const [preferencesFoot, setPreferencesFoot] = useState(null);

  useEffect(() => {
    fetch(fetchUrls["current-user"], {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        setisSendingRequest(false);
        setCurrentUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const [test, setTest] = useState(0);
  console.log(test);

  const savePreferences = () => {
    setTest((previousState) => previousState + 1);
  };

  return (
    <section style={{ height: "100%" }}>
      {isSendingRequest && <SpinnerBox />}
      {currentUser && (
        <>
          <Typography level="h6" sx={{ mb: 4, textAlign: "center" }}>
            User profile
          </Typography>
          <Sheet sx={{ mb: 2, textAlign: "center" }}>
            <Typography level="body1">Email: {currentUser.email}</Typography>
            <Typography level="body1">
              Username: {currentUser.userName}
            </Typography>
          </Sheet>
          <Sheet sx={{ width: "50%", m: "0 auto", mb: 4 }}>
            <Tabs
              aria-label="Outlined tabs"
              value={index}
              sx={{ borderRadius: "lg" }}
              onChange={(event, value) => {
                setIndex(value);
                // if (value === 0) {
                //   setAllTrips(createdFutureTrips);
                // }
                // if (value === 1) {
                //   setAllTrips(joinedFutureTrips);
                // }
                // if (value === 2) {
                //   setAllTrips(createdPastTrips);
                // }
                // if (value === 3) {
                //   setAllTrips(joinedPastTrips);
                // }
              }}
            >
              <TabList variant="outlined">
                <Tab
                  variant={index === 0 ? "soft" : "plain"}
                  color={index === 0 ? "primary" : "neutral"}
                >
                  Car trip
                </Tab>
                <Tab
                  variant={index === 1 ? "soft" : "plain"}
                  color={index === 1 ? "primary" : "neutral"}
                >
                  Bike ride
                </Tab>
                <Tab
                  variant={index === 2 ? "soft" : "plain"}
                  color={index === 2 ? "primary" : "neutral"}
                >
                  Hiking trip
                </Tab>
              </TabList>
              <TabPanel
                value={0}
                sx={{
                  mt: 2,
                  width: 400,
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <Preferences
                  onSavePreferences={savePreferences}
                  entertainment={2}
                  sightseeing={0}
                  exploring={0}
                  culture={0}
                  history={6}
                  freeride={0}
                  training={0}
                  nature={6}
                />
              </TabPanel>
              <TabPanel
                value={1}
                sx={{
                  mt: 2,
                  width: 400,
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <Preferences
                  onSavePreferences={savePreferences}
                  entertainment={2}
                  sightseeing={0}
                  exploring={0}
                  culture={0}
                  history={0}
                  freeride={0}
                  training={0}
                  nature={0}
                />
              </TabPanel>
              <TabPanel
                value={2}
                sx={{
                  mt: 2,
                  width: 400,
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <Preferences
                  onSavePreferences={savePreferences}
                  entertainment={2}
                  sightseeing={0}
                  exploring={0}
                  culture={0}
                  history={0}
                  freeride={0}
                  training={0}
                  nature={0}
                />
              </TabPanel>
            </Tabs>
          </Sheet>
        </>
      )}
    </section>
  );
};

export default UserProfile;

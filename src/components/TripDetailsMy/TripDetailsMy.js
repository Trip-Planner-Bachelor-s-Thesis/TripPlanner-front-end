import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

import styles from "./TripDetailsMy.module.css";
// import TripInformation from "../Utils/TripInformationSingle";
import TripInformation from "./TripInformation";
import TripParticipants from "./TripParticipants";
import Map from "../Map/Map";

const TripDetailsMy = () => {
  const [trip, setTrip] = useState(null);
  const [index, setIndex] = useState(0);
  const { tripId } = useParams();

  useEffect(() => {
    fetch(
      `https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips/${tripId}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        console.log(data);
      });
  }, [tripId]);

  return (
    <section className={styles["new-trip-section"]}>
      <div className={styles["new-trip"]}>
        {trip && <TripInformation tripData={trip} />}
        {trip && (
          <div className={styles["tabs-container"]}>
            <Tabs
              aria-label="Outlined tabs"
              value={index}
              onChange={(event, value) => setIndex(value)}
              sx={{ borderRadius: "lg" }}
            >
              <TabList variant="outlined">
                <Tab
                  variant={index === 0 ? "soft" : "plain"}
                  color={index === 0 ? "primary" : "neutral"}
                >
                  Show Route
                </Tab>
                <Tab
                  variant={index === 1 ? "soft" : "plain"}
                  color={index === 1 ? "primary" : "neutral"}
                >
                  Show Participants
                </Tab>
              </TabList>
            </Tabs>
          </div>
        )}
        {trip && index === 0 && (
          <Map userWaypointsInput={trip.waypoints} staticMap={true} />
        )}
        {trip && index === 1 && <TripParticipants />}
      </div>
    </section>
  );
};

export default TripDetailsMy;

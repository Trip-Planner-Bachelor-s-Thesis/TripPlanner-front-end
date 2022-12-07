import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import styles from "./TripDetailsAll.module.css";
import TripInformation from "../Utils/TripInformationSingle";
import TripParticipants from "./TripParticipants";
import Map from "../Map/Map";

const TripDetailsAll = () => {
  const [trip, setTrip] = useState(null);
  // const [isDisplayingMap, setIsDisplayingMap] = useState(true);
  const [tab, setTab] = useState("route");
  const { tripId } = useParams();

  useEffect(() => {
    fetch(`https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips/${tripId}.json`)
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
        {/* {trip && (
          <button type="button" className={styles["button-switch-display-users"]} onClick={toggleHandler}>
            {isDisplayingMap ? "Show participants" : "Show route"}
          </button>
        )} */}
        {trip && (
          <div className={styles["tabs-container"]}>
            <Tabs activeKey={tab} onSelect={(tabName) => setTab(tabName)} id="justify-tab-example" justify>
              <Tab eventKey="route" title="Show Route"></Tab>
              <Tab eventKey="participants" title="Show Participants"></Tab>
            </Tabs>
          </div>
        )}
        {trip && tab === "route" && <Map userWaypointsInput={trip.waypoints} />}
        {trip && tab === "participants" && <TripParticipants />}
      </div>
    </section>
  );
};

export default TripDetailsAll;

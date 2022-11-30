import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import styles from "./TripDetailsMy.module.css";
import TripInformation from "./TripInformation";
import TripParticipants from "./TripParticipants";
// import Map from "../Map/Map";
import MapNew from "../Map/MapNew";

const TripDetailsMy = () => {
  const [trip, setTrip] = useState(null);
  const [tab, setTab] = useState("route");
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
              activeKey={tab}
              onSelect={(tabName) => setTab(tabName)}
              id="justify-tab-example"
              justify
            >
              <Tab eventKey="route" title="Show Route"></Tab>
              <Tab eventKey="participants" title="Show Participants"></Tab>
            </Tabs>
          </div>
        )}
        {trip && tab === "route" && (
          <MapNew userWaypointsInput={trip.waypoints} />
        )}
        {trip && tab === "participants" && <TripParticipants />}
      </div>
    </section>
  );
};

export default TripDetailsMy;

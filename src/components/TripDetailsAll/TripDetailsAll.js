import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./TripDetailsAll.module.css";
import TripInformation from "./TripInformation";
import TripParticipants from "./TripParticipants";
import Map from "../Map/Map";

const TripDetailsAll = () => {
  const [trip, setTrip] = useState(null);
  const [isDisplayingMap, setIsDisplayingMap] = useState(true);
  const { tripId } = useParams();

  useEffect(() => {
    fetch(`https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips/${tripId}.json`)
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        console.log(data);
      });
  }, [tripId]);

  const toggleHandler = () => {
    setIsDisplayingMap((previousState) => !previousState);
  };

  // const submitFormHandler = async () => {
  //   let tripData = {
  //     type: enteredType,
  //     preferences: enteredPreferences,
  //     date: enteredDate,
  //     waypoints: enteredWaypoints,
  //   };
  //   const response = await fetch("https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json", {
  //     method: "POST",
  //     body: JSON.stringify(tripData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await response.json();
  //   if (!response.ok) {
  //     alert(data.message || "Could not create quote.");
  //   } else {
  //     navigate("/my-trips", { replace: true });
  //   }
  // };

  return (
    <section className={classes["new-trip-section"]}>
      <div className={classes["new-trip"]}>
        {trip && <TripInformation tripData={trip} />}
        {trip && (
          <button type="button" className={classes["button-switch-display-users"]} onClick={toggleHandler}>
            {isDisplayingMap ? "Show participants" : "Show route"}
          </button>
        )}
        {trip && isDisplayingMap && <Map userWaypointsInput={trip.waypoints} />}
        {trip && !isDisplayingMap && <TripParticipants />}
      </div>
    </section>
  );
};

export default TripDetailsAll;

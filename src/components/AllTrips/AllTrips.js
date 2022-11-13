import { useState, useEffect } from "react";

import classes from "./AllTrips.module.css";
import SingleTrip from "./SingleTrip";

const AllTrips = () => {
  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    fetch("https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json")
      .then((response) => response.json())
      .then((data) => {
        let trips = [];
        for (const key in data) {
          const trip = {
            id: key,
            ...data[key],
          };
          trips.push(trip);
        }
        setAllTrips(trips);
      });
  }, []);

  return (
    <section className={classes.container}>
      <ul className={classes.list}>
        {allTrips.map((trip) => (
          <SingleTrip
            key={trip.id}
            id={trip.id}
            date={trip.date}
            type={trip.type}
            preferences={trip.preferences}
            start={trip.waypoints[0].name}
            end={trip.waypoints[trip.waypoints.length - 1].name}
          ></SingleTrip>
        ))}
      </ul>
    </section>
  );
};

export default AllTrips;

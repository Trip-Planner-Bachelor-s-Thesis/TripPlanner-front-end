import { useState, useEffect } from "react";

import styles from "./AllTrips.module.css";
import SingleTrip from "./SingleTrip";
import FilterTrips from "./FilterTrips";

const AllTrips = () => {
  const [allFetchedTrips, setAllFetchedTrips] = useState(null);
  const [allTrips, setAllTrips] = useState(null);

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
        setAllFetchedTrips(trips);
        setAllTrips(trips);
      });
  }, []);

  const filterHandler = (filteredTrips) => {
    setAllTrips(filteredTrips);
  };

  console.log(allTrips);

  return (
    <section>
      {allTrips && <FilterTrips onFilterHandler={filterHandler} trips={allFetchedTrips}></FilterTrips>}
      {allTrips &&
        (allTrips.length === 0 ? (
          <p className={styles["no-trips-found"]}>No trips found</p>
        ) : (
          <ul className={styles["list-of-trips"]}>
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
        ))}
    </section>
  );
};

export default AllTrips;

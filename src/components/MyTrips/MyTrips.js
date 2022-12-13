import { useState, useEffect, useReducer } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

import styles from "./MyTrips.module.css";
import SingleTrip from "./SingleTrip";
// import FilterTrips from "./FilterTrips";
import PaginationList from "../Utils/PaginationList";
import SpinnerBox from "../Utils/SpinnerBox";

const initialState = {
  tripsPerPage: 4,
  currentPage: 1,
  firstIndex: 0,
  lastIndex: 4,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        currentPage: Number(state.currentPage) + 1,
        firstIndex: Number(state.currentPage) * Number(state.tripsPerPage),
        lastIndex: Number(state.currentPage) * Number(state.tripsPerPage) + 4,
      };
    case "decrement":
      return {
        ...state,
        currentPage: Number(state.currentPage) - 1,
        firstIndex:
          (Number(state.currentPage) - 2) * Number(state.tripsPerPage),
        lastIndex:
          (Number(state.currentPage) - 2) * Number(state.tripsPerPage) + 4,
      };
    case "change":
      return {
        ...state,
        currentPage: Number(action.page),
        firstIndex: (Number(action.page) - 1) * Number(state.tripsPerPage),
        lastIndex: Number(action.page) * Number(state.tripsPerPage),
      };
    default:
      throw new Error();
  }
};

const MyTrips = () => {
  //const [allFetchedTrips, setAllFetchedTrips] = useState(null);
  const [index, setIndex] = useState(0);
  const [allTrips, setAllTrips] = useState(null);
  const [isSendingRequest, setisSendingRequest] = useState(true);
  const [paginationState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(
      "https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json"
    )
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
        setisSendingRequest(false);
        //setAllFetchedTrips(trips);
        setAllTrips(trips);
      });
  }, []);

  //   const filterHandler = (filteredTrips) => {
  //     setAllTrips(filteredTrips);
  //   };
  const nextClickHandler = () => {
    dispatch({ type: "increment" });
  };
  const previousClickHandler = () => {
    dispatch({ type: "decrement" });
  };
  const pageNumberClickHandler = (pageNumber) => {
    dispatch({ type: "change", page: pageNumber });
  };

  return (
    <section>
      {isSendingRequest && <SpinnerBox />}
      {allTrips && (
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
                Created future trips
              </Tab>
              <Tab
                variant={index === 1 ? "soft" : "plain"}
                color={index === 1 ? "primary" : "neutral"}
              >
                Joined future trips
              </Tab>
              <Tab
                variant={index === 2 ? "soft" : "plain"}
                color={index === 2 ? "primary" : "neutral"}
              >
                Created past trips
              </Tab>
              <Tab
                variant={index === 3 ? "soft" : "plain"}
                color={index === 3 ? "primary" : "neutral"}
              >
                Joined past trips
              </Tab>
            </TabList>
          </Tabs>
        </div>
      )}
      {allTrips &&
        (allTrips.length === 0 ? (
          <p className={styles["no-trips-found"]}>No trips found</p>
        ) : (
          <ul className={styles["list-of-trips"]}>
            {allTrips
              .slice(paginationState.firstIndex, paginationState.lastIndex)
              .map((trip) => (
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
      {allTrips && allTrips.length > 4 && (
        <PaginationList
          sumOfTrips={allTrips.length}
          paginationState={paginationState}
          onPreviousHandler={previousClickHandler}
          onNextHandler={nextClickHandler}
          onPageNumberHandler={pageNumberClickHandler}
        />
      )}
    </section>
  );
};

export default MyTrips;

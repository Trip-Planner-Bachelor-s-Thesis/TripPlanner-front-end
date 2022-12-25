import { useState, useEffect, useReducer, useContext } from "react";

import styles from "./FavoriteTrips.module.css";
import List from "@mui/joy/List";
import SingleTrip from "./SingleTrip";
import FilterTrips from "../Utils/FilterTrips";
import PaginationList from "../Utils/PaginationList";
import SpinnerBox from "../Utils/SpinnerBox";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const numberTripsPerPage = 4

const initialState = {
  tripsPerPage: numberTripsPerPage,
  currentPage: 1,
  firstIndex: 0,
  lastIndex: numberTripsPerPage,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        currentPage: Number(state.currentPage) + 1,
        firstIndex: Number(state.currentPage) * Number(state.tripsPerPage),
        lastIndex: Number(state.currentPage) * Number(state.tripsPerPage) + state.tripsPerPage,
      };
    case "decrement":
      return {
        ...state,
        currentPage: Number(state.currentPage) - 1,
        firstIndex:
          (Number(state.currentPage) - 2) * Number(state.tripsPerPage),
        lastIndex:
          (Number(state.currentPage) - 2) * Number(state.tripsPerPage) + state.tripsPerPage,
      };
    case "change":
      if (action.page === undefined) {
        return { ...state };
      } else {
        return {
          ...state,
          currentPage: Number(action.page),
          firstIndex: (Number(action.page) - 1) * Number(state.tripsPerPage),
          lastIndex: Number(action.page) * Number(state.tripsPerPage),
        };
      }
    case "reset":
      return {
        ...state,
        currentPage: 1,
        firstIndex: 0,
        lastIndex: state.tripsPerPage,
      };
    default:
      throw new Error();
  }
};

const AllTrips = () => {
  const { token } = useContext(LogRegisterContext);
  const [allFetchedTrips, setAllFetchedTrips] = useState(null);
  const [allTrips, setAllTrips] = useState(null);
  const [isSendingRequest, setisSendingRequest] = useState(true);
  const [paginationState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(fetchUrls["get-favorite-trips"], {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        let trips = [];
        for (const trip of data.trips) {
          trips.push(trip);
        }
        setisSendingRequest(false);
        setAllFetchedTrips(trips);
        setAllTrips(trips);
        console.log(trips);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const filterHandler = (filteredTrips) => {
    setAllTrips(filteredTrips);
  };
  const nextClickHandler = () => {
    dispatch({ type: "increment" });
  };
  const previousClickHandler = () => {
    dispatch({ type: "decrement" });
  };
  const pageNumberClickHandler = (pageNumber) => {
    dispatch({ type: "change", page: pageNumber });
  };
  const resetPage = () => {
    dispatch({ type: "reset" });
  };

  return (
    <section>
      {isSendingRequest && <SpinnerBox />}
      {allTrips && (
        <FilterTrips
          onFilterHandler={filterHandler}
          onResetPage={resetPage}
          trips={allFetchedTrips}
        ></FilterTrips>
      )}
      {allTrips &&
        (allTrips.length === 0 ? (
          <p className={styles["no-trips-found"]}>No trips found</p>
        ) : (
          <List sx={{width: "40%", p: 0, m: "0 auto", mb: 2}}>
            {allTrips
              .slice(paginationState.firstIndex, paginationState.lastIndex)
              .map((trip) => (
                <SingleTrip key={trip.tripId} tripData={trip}></SingleTrip>
              ))}
          </List>
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

export default AllTrips;

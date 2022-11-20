import { useState } from "react";

import classes from "./FilterTrips.module.css";
import { optionsCar } from "../../helpers/helpers";
import { optionsBike } from "../../helpers/helpers";

const DropdownList = (props) => {
  const [enteredType, setEnteredType] = useState("");
  const [enteredPreferences, setEnteredPreferences] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");

  const typeDropDownHandler = (event) => {
    setEnteredType(event.target.value);
  };

  const preferencesDropDownHandler = (event) => {
    setEnteredPreferences(event.target.value);
  };

  const startDateDropDownHandler = (event) => {
    setEnteredStartDate(event.target.value);
    console.log(new Date(event.target.value).getDate());
    console.log(new Date(event.target.value).getFullYear());
    console.log(new Date(event.target.value).getMonth() + 1);
  };

  const endDateDropDownHandler = (event) => {
    setEnteredEndDate(event.target.value);
  };

  const clickHandler = (event) => {
    event.preventDefault();
    let filteredTrips = props.trips;
    if (enteredType) {
      filteredTrips = filteredTrips.filter(checkType.bind(this, enteredType));
    }
    if (enteredPreferences) {
      filteredTrips = filteredTrips.filter(checkPreferences.bind(this, enteredPreferences));
    }
    if (enteredStartDate) {
      filteredTrips = filteredTrips.filter(checkStartDate.bind(this, enteredStartDate));
    }
    if (enteredEndDate) {
      filteredTrips = filteredTrips.filter(checkEndDate.bind(this, enteredEndDate));
    }
    props.onFilterHandler(filteredTrips);
  };

  const resetHandler = () => {
    setEnteredStartDate("");
    setEnteredEndDate("");
    setEnteredType("");
    setEnteredPreferences("");
    props.onFilterHandler(props.trips);
  };

  return (
    <div className={classes["new-trip__control"]}>
      <div className={classes["form-container"]}>
        <div className={classes["label-box"]}>
          <label htmlFor="startDate">Start date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max="2023-12-31"
            onChange={startDateDropDownHandler}
            value={enteredStartDate}
            id="startDate"
          />
        </div>
        <div className={classes["label-box"]}>
          <label htmlFor="endDate">End date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max="2023-12-31"
            onChange={endDateDropDownHandler}
            value={enteredEndDate}
            id="endDate"
          />
        </div>

        <div className={classes["label-box"]}>
          <label htmlFor="type">Trip type</label>
          <select id="type" onChange={typeDropDownHandler} value={enteredType}>
            <option value="" hidden>
                Choose
            </option>
            <option value="car">Car trip</option>
            <option value="bike">Bike ride</option>
          </select>
        </div>

        <div className={classes["label-box"]}>
          <label htmlFor="preferences">Trip preferences</label>
          <select id="preferences" onChange={preferencesDropDownHandler} disabled={!enteredType} value={enteredPreferences}>
            <option value="" hidden>
              Choose
            </option>
            {enteredType &&
              enteredType === "car" &&
              optionsCar.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            {enteredType &&
              enteredType === "bike" &&
              optionsBike.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>

        <button type="button" onClick={clickHandler}>
          Filter
        </button>
        <button type="button" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </div>
  );
};

function checkType(type, trip) {
  return trip.type === type;
}

function checkPreferences(preference, trip) {
  return trip.preferences === preference;
}

function checkStartDate(startDate, trip) {
  return new Date(trip.date) >= new Date(startDate);
}

function checkEndDate(endDate, trip) {
  return new Date(trip.date) <= new Date(endDate);
}

export default DropdownList;

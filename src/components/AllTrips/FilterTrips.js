import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import styles from "./FilterTrips.module.css";
import { optionsCar } from "../../helpers/helpers";
import { optionsBike } from "../../helpers/helpers";

const DropdownList = (props) => {
  const [enteredType, setEnteredType] = useState("");
  const [enteredPreferences, setEnteredPreferences] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");

  const typeDropDownHandler = (event, value) => {
    setEnteredType(value);
  };

  const preferencesDropDownHandler = (event, value) => {
    setEnteredPreferences(value);
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

  const filterHandler = (event) => {
    event.preventDefault();
    let filteredTrips = props.trips;
    if (enteredType) {
      filteredTrips = filteredTrips.filter(checkType.bind(this, enteredType));
    }
    if (enteredPreferences) {
      filteredTrips = filteredTrips.filter(
        checkPreferences.bind(this, enteredPreferences)
      );
    }
    if (enteredStartDate) {
      filteredTrips = filteredTrips.filter(
        checkStartDate.bind(this, enteredStartDate)
      );
    }
    if (enteredEndDate) {
      filteredTrips = filteredTrips.filter(
        checkEndDate.bind(this, enteredEndDate)
      );
    }
    props.onFilterHandler(filteredTrips);
    props.onResetPage();
  };

  const resetHandler = () => {
    setEnteredStartDate("");
    setEnteredEndDate("");
    setEnteredType("");
    setEnteredPreferences("");
    props.onFilterHandler(props.trips);
    props.onResetPage();
  };

  return (
    <div className={styles["new-trip__control"]}>
      <Typography level="h6" sx={{ mb: 2 }}>
        Browse through trips
      </Typography>
      <div className={styles["form-container"]}>
        {/* <div className={styles["label-box"]}>
          <label htmlFor="startDate">Start date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max="2023-12-31"
            onChange={startDateDropDownHandler}
            value={enteredStartDate}
            id="startDate"
          />
        </div> */}
        <FormControl  sx={{ mx: 1 }}>
          {/* <FormLabel sx={{ alignSelf: "center" }}>Trip date</FormLabel> */}
          <Input
            type="date"
            onChange={startDateDropDownHandler}
            value={enteredStartDate}
            className={styles["start-date"]}
          />
        </FormControl>
        {/* <div className={styles["label-box"]}>
          <label htmlFor="endDate">End date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max="2023-12-31"
            onChange={endDateDropDownHandler}
            value={enteredEndDate}
            id="endDate"
          />
        </div> */}
        <FormControl  sx={{ mx: 1 }}>
          {/* <FormLabel sx={{ alignSelf: "center" }}>Trip date</FormLabel> */}
          <Input
            type="date"
            onChange={endDateDropDownHandler}
            value={enteredEndDate}
            className={styles["end-date"]}
          />
        </FormControl>

        {/* <div className={styles["label-box"]}>
          <label htmlFor="type">Trip type</label>
          <select id="type" onChange={typeDropDownHandler} value={enteredType}>
            <option value="" hidden>
                Choose
            </option>
            <option value="car">Car trip</option>
            <option value="bike">Bike ride</option>
          </select>
        </div> */}

        <FormControl  sx={{ mx: 1 }}>
          {/* <FormLabel sx={{ alignSelf: "center" }}>Trip type</FormLabel> */}
          <Select
            placeholder="Choose type"
            onChange={typeDropDownHandler}
            value={enteredType}
            data-testid="type"
          >
            <Option value="car">Car trip</Option>
            <Option value="bike">Bike ride</Option>
            <Option value="foot">Hiking trip</Option>
          </Select>
        </FormControl>

        {/* <div className={styles["label-box"]}>
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
        </div> */}

        <FormControl sx={{ mx: 1 }}>
          {/* <FormLabel sx={{ alignSelf: "center" }}>Trip type</FormLabel> */}
          <Select
            placeholder="Choose tags"
            onChange={preferencesDropDownHandler}
            value={enteredPreferences}
            data-testid="type"
          >
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Sightseeing">Sightseeing</Option>
            <Option value="Training">Training</Option>
          </Select>
        </FormControl>
        {/* 
        <button type="button" onClick={filterHandler}>
          Filter
        </button>
        <button type="button" onClick={resetHandler}>
          Reset
        </button> */}

        <Button
          color="primary"
          type="button"
          onClick={filterHandler}
          sx={{ mx: 1 }}
        >
          Filter
        </Button>
        <Button
          color="primary"
          type="button"
          onClick={resetHandler}
          sx={{ mx: 1 }}
        >
          Reset
        </Button>
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

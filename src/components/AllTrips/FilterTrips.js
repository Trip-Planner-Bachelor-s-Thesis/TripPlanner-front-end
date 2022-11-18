import { useState } from "react";

import classes from "./FilterTrips.module.css";
import { optionsCar } from "../../helpers/helpers";
import { optionsBike } from "../../helpers/helpers";

const DropdownList = () => {
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
  };

  const endDateDropDownHandler = (event) => {
    setEnteredEndDate(event.target.value);
  };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onSubmitFormHandler();
//   };

  return (
    <div className={classes["new-trip__control"]}>
        <div className={classes["form-container"]}>
          <input type="date" min={new Date().toISOString().split("T")[0]} max="2023-12-31" onChange={startDateDropDownHandler} />
          <input type="date" min={new Date().toISOString().split("T")[0]} max="2023-12-31" onChange={endDateDropDownHandler} />

          <select onChange={typeDropDownHandler}>
            <option value="" hidden>
              Trip type
            </option>
            <option value="car">Car trip</option>
            <option value="bike">Bike ride</option>
          </select>

          <select onChange={preferencesDropDownHandler} disabled={!enteredType}>
            <option value="" hidden>
              Preferences
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

          <button type="button">
            Filter
          </button>
        </div>
    </div>
  );
};

export default DropdownList;

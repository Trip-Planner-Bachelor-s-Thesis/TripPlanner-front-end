import classes from "./DropdownList.module.css";
import { optionsCar } from "../../helpers/helpers";
import { optionsBike } from "../../helpers/helpers";

const DropdownList = (props) => {
  const typeDropDownHandler = (event) => {
    props.onTypeHandler(event.target.value);
  };

  const preferencesDropDownHandler = (event) => {
    props.onPreferencesHandler(event.target.value);
  };

  const dateDropDownHandler = (event) => {
    props.onDateHandler(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmitFormHandler();
  };

  return (
    <div className={classes["new-trip__control"]}>
      <form onSubmit={submitHandler}>
        <div className={classes["form-container"]}>
          <div className={classes["label-box"]}>
            <label htmlFor="tripDate">Trip date</label>
            <input type="date" id="tripDate" min={new Date().toISOString().split("T")[0]} max="2023-12-31" onChange={dateDropDownHandler} />
          </div>

          <div className={classes["label-box"]}>
            <label htmlFor="type">Type</label>
            <select id="type" onChange={typeDropDownHandler}>
              <option value="" hidden>
                Choose
              </option>
              <option value="car">Car trip</option>
              <option value="bike">Bike ride</option>
            </select>
          </div>

          <div className={classes["label-box"]}>
            <label htmlFor="preferences">Preferences</label>
            <select id="preferences" onChange={preferencesDropDownHandler} disabled={!props.enteredType}>
              <option value="" hidden>
                Choose
              </option>
              {props.enteredType &&
                props.enteredType === "car" &&
                optionsCar.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              {props.enteredType &&
                props.enteredType === "bike" &&
                optionsBike.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" disabled={!props.enableCreateButtonFlag}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default DropdownList;

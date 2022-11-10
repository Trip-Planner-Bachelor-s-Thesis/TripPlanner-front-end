import classes from "./DropdownList.module.css";

const DropdownList = (props) => {
  const optionsBike = [
    {
      label: "Training",
      value: "training",
    },
    {
      label: "Free ride",
      value: "freeride",
    },
  ];

  const optionsCar = [
    {
      label: "Sightseeing",
      value: "sightseeing",
    },
    {
      label: "Entertainment",
      value: "entertainment",
    },
  ];

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
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max="2023-12-31"
            onChange={dateDropDownHandler}
          />

          <select onChange={typeDropDownHandler}>
            <option value="" hidden>
              Choose trip type
            </option>
            <option value="car">Car trip</option>
            <option value="bike">Bike ride</option>
          </select>

          <select
            onChange={preferencesDropDownHandler}
            disabled={!props.enteredType}
          >
            <option value="" hidden>
              Choose preferences
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

          <button type="submit" disabled={!props.enableCreateButtonFlag}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default DropdownList;

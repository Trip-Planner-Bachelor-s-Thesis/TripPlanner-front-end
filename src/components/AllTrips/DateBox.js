import classes from "./DateBox.module.css";

function DateBox(props) {
  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className={classes["expense-date"]}>
      <div className={classes["expense-date__month"]}>{month}</div>
      <div className={classes["expense-date__year"]}>{year}</div>
      <div className={classes["expense-date__day"]}>{day}</div>
    </div>
  );
}

export default DateBox;
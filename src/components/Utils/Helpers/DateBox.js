import styles from "./DateBox.module.css";

function DateBox(props) {
  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className={styles["trip-date"]}>
      <div className={styles["trip-date-month"]} data-testid="month">{month}</div>
      <div className={styles["trip-date-year"]} data-testid="year">{year}</div>
      <div className={styles["trip-date-day"]} data-testid="day">{day}</div>
      {/* <input className={styles["trip-date-month"]} value={month} disabled></input>
      <input className={styles["trip-date-year"]} value={year} disabled></input>
      <input className={styles["trip-date-day"]} value={day} disabled></input> */}
    </div>
  );
}

export default DateBox;

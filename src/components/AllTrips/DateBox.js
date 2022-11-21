import styles from "./DateBox.module.css";

function DateBox(props) {
  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className={styles["trip-date"]}>
      <div className={styles["trip-date-month"]}>{month}</div>
      <div className={styles["trip-date-year"]}>{year}</div>
      <div className={styles["trip-date-day"]}>{day}</div>
    </div>
  );
}

export default DateBox;

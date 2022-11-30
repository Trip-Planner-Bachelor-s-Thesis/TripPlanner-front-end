import styles from "./TripParticipants.module.css";

const TripParticipants = () => {
  return (
    <div className={styles["trip-participants-control"]}>
      <div className={styles["trip-organiser-container"]}>
        <div className={styles["title-underline"]}>Organiser</div>
        <ul>
          <li className={styles["single-participant"]}>{`Bob Ross \u00A0\u00A0 4.2${String.fromCodePoint(0x2B50)}`}</li>
        </ul>
      </div>
      <div className={styles["trip-participants-container"]}>
      <div className={styles["title-underline"]}>Participants</div>
        <ul>
          <li className={styles["single-participant"]}>{`John Smith \u00A0\u00A0 4.3${String.fromCodePoint(0x2B50)}`}</li>
          <li className={styles["single-participant"]}>{`Jack Miller \u00A0\u00A0 4.1${String.fromCodePoint(0x2B50)}`}</li>
          <li className={styles["single-participant"]}>{`Tom Evans \u00A0\u00A0 4.5${String.fromCodePoint(0x2B50)}`}</li>
        </ul>
      </div>
    </div>
  );
};

export default TripParticipants;

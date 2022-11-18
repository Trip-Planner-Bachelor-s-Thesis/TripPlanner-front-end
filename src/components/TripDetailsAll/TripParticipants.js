import classes from "./TripParticipants.module.css";

const TripParticipants = () => {
  return (
    <div className={classes["trip-participants-control"]}>
      <div className={classes["trip-organiser-container"]}>
        <div className={classes["title-underline"]}>Organiser</div>
        <ul>
          <li className={classes["single-participant"]}>{`Bob Ross \u00A0\u00A0 4.2${String.fromCodePoint(0x2B50)}`}</li>
        </ul>
      </div>
      <div className={classes["trip-participants-container"]}>
      <div className={classes["title-underline"]}>Participants</div>
        <ul>
          <li className={classes["single-participant"]}>{`John Smith \u00A0\u00A0 4.3${String.fromCodePoint(0x2B50)}`}</li>
          <li className={classes["single-participant"]}>{`Jack Miller \u00A0\u00A0 4.1${String.fromCodePoint(0x2B50)}`}</li>
          <li className={classes["single-participant"]}>{`Tom Evans \u00A0\u00A0 4.5${String.fromCodePoint(0x2B50)}`}</li>
        </ul>
      </div>
    </div>
  );
};

export default TripParticipants;

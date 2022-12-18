import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Chip from '@mui/joy/Chip';

import styles from "./TripDetailsMy.module.css";
import TripInformationChat from "./TripInformationChat";
import PreferencesDescriptionChat from "./PreferencesDescriptionChat";
import Map from "../Map/Map";

const TripDetailsMy = () => {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();

  useEffect(() => {
    fetch(
      `https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips/${tripId}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        console.log(data);
      });
  }, [tripId]);

  return (
    <section className={styles["new-trip-section"]}>
      <div className={styles["new-trip"]}>
        {trip && <TripInformationChat tripData={trip} />}
        {trip && (
          <div className={styles["map-details-container"]}>
            <PreferencesDescriptionChat tripData={trip} />
            <div className={styles["map-only-container"]}>
              <Sheet
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: "sm",
                  mb: 2,
                }}
              >
                <Typography sx={{ mb: 1.5 }} level="body1">
                  Tags associated with the trip
                </Typography>

                <List
                  row
                  wrap
                  sx={{
                    "--List-gap": "16px",
                    "--List-item-radius": "20px",
                  }}
                >
                  {trip.preferences.map((item) => (
                    <ListItem key={item}>
                    <Chip variant="soft">{item}</Chip>
                    </ListItem>
                  ))}
                </List>
              </Sheet>

              <Map
                userWaypointsInput={trip.waypoints}
                staticMap={true}
                onWaypointsHandler={null}
                onCalculatedTripDataHandler={null}
                typeOfTransport={trip.type}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TripDetailsMy;

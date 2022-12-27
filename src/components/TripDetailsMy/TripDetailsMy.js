import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Chip from "@mui/joy/Chip";

import styles from "./TripDetailsMy.module.css";
import TripInformation from "../Utils/TripInformation";
import PreferencesDescription from "../Utils/PreferencesDescription";
import Map from "../Map/Map";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const TripDetailsMy = () => {
  const { token } = useContext(LogRegisterContext);
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();

  useEffect(() => {
    fetch(`${fetchUrls["get-all-trips"]}/${tripId}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tripId, token]);

  return (
    <section className={styles["new-trip-section"]}>
      <div className={styles["new-trip"]}>
        {trip && <TripInformation tripData={trip} />}
        {trip && (
          <div className={styles["map-details-container"]}>
            <PreferencesDescription
              tripData={trip}
              isJoined={true}
              isFavorite={true}
            />
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
                    <ListItem key={item.id}>
                      <Chip variant="soft">{item.preferenceStr}</Chip>
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

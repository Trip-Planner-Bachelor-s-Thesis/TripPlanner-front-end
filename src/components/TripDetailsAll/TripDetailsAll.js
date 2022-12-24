import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Chip from "@mui/joy/Chip";

import styles from "./TripDetailsAll.module.css";
import TripInformationJoin from "./TripInformationJoin";
import PreferencesDescriptionJoin from "./PreferencesDescriptionJoin";
import Map from "../Map/Map";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const TripDetailsAll = () => {
  const { token } = useContext(LogRegisterContext);
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

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

  const joinHandler = async () => {
    fetch(`${fetchUrls["get-all-trips"]}/${tripId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    await new Promise((r) => setTimeout(r, 1000));
    navigate("/my-trips", { replace: true });
  };

  const addFavoritesHandler = async () => {
    fetch(`${fetchUrls["add-favorite-trips"]}/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    await new Promise((r) => setTimeout(r, 1000));
    navigate("/favorite-trips", { replace: true });
  };

  return (
    <section className={styles["new-trip-section"]}>
      <div className={styles["new-trip"]}>
        {trip && <TripInformationJoin tripData={trip} />}
        {trip && (
          <div className={styles["map-details-container"]}>
            <PreferencesDescriptionJoin
              tripData={trip}
              onJoinHandler={joinHandler}
              onAddFavoritesHandler={addFavoritesHandler}
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

export default TripDetailsAll;

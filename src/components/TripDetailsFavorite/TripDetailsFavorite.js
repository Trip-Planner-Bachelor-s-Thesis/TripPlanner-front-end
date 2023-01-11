import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Chip from "@mui/joy/Chip";

import styles from "./TripDetailsFavorite.module.css";
import TripInformation from "../Utils/TripInformation";
import PreferencesDescription from "../Utils/PreferencesDescription";
import Map from "../Map/Map";
//import MapReactLeaflet from "../Map/MapReactLeaflet";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const TripDetailsFavorite = () => {
  const { token, updateJoinedTrip } = useContext(LogRegisterContext);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
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
    setIsLoadingJoin(true);
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
        updateJoinedTrip(true);
        setIsLoadingJoin(false);
        navigate("/my-trips", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pinsHandler = (value) => {
    console.log(value);
    let pinData = {
      tripId: tripId,
      pins: [{ lat: value.lat, lng: value.lng, name: value.name }],
    };
    fetch(fetchUrls.pins, {
      method: "POST",
      body: JSON.stringify(pinData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("test");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles["new-trip-section"]}>
      <div className={styles["new-trip"]}>
        {trip && <TripInformation tripData={trip} />}
        {trip && (
          <div className={styles["map-details-container"]}>
            <PreferencesDescription
              tripData={trip}
              onJoinHandler={joinHandler}
              isJoined={trip.isJoinedByCurrentUser}
              isFavorite={trip.isFavoriteForCurrentUser}
              isCreated={trip.isCreatedByCurrentUser}
              isLoadingJoin={isLoadingJoin}
              isLoadingFavorites={false}
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
                onPinsHandler={pinsHandler}
                userPinsInput={trip.pins}
                isCreatedByCurrentUser={trip.isCreatedByCurrentUser}
                isJoinedByCurrentUser={trip.isJoinedByCurrentUser}
                isTripCreated={false}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TripDetailsFavorite;

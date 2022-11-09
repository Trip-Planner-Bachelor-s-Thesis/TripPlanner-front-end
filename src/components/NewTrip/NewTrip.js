import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import { useEffect, useState } from "react";

import classes from "./NewTrip.module.css";

const NewTripPage = () => {
  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }

    var map = L.map("map").setView([52.2297, 21.0122], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var control = L.Routing.control({
      waypoints: [
        L.Routing.waypoint(
          L.latLng(53.7767239, 20.477780523409734),
          "Olsztyn, powiat olsztyński, województwo warmińsko-mazurskie, Polska"
        ),
        L.Routing.waypoint(
          L.latLng(54.3706858, 18.61298210330077),
          "Gdańsk, województwo pomorskie, Polska"
        ),
      ],
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
    })
      .on("routeselected", function (e) {
        var route = e.route;
        let userWaypoints = [];
        route.inputWaypoints.forEach((element) => {
          let waypoint = {
            lat: element.latLng.lat,
            lng: element.latLng.lng,
            name: element.name,
          };
          userWaypoints.push(waypoint);
        });
        setEnteredWaypoints(userWaypoints);
        for (const element of userWaypoints) {
          console.log(element);
        }
        alert(
          "Showing route between waypoints:\n" +
            JSON.stringify(route.inputWaypoints, null, 2)
        );
      })
      .addTo(map);

    map.on("click", function (e) {
      var container = L.DomUtil.create("div"),
        startBtn = createButton("Start from this location", container),
        destBtn = createButton("Go to this location", container);

      L.popup().setContent(container).setLatLng(e.latlng).openOn(map);

      L.DomEvent.on(startBtn, "click", function () {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, "click", function () {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });
    });
  }, []);

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

  const [enteredType, setEnteredType] = useState("");
  const [enteredPreferences, setEnteredPreferences] = useState("");
  const [enteredWaypoints, setEnteredWaypoints] = useState([]);
  let enableCreateButtonFlag = !!(
    enteredType &&
    enteredPreferences &&
    enteredWaypoints.length
  );

  const typeDropDownHandler = (event) => {
    setEnteredType(event.target.value);
  };

  const preferencesDropDownHandler = (event) => {
    setEnteredPreferences(event.target.value);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    let tripData = {
      type: enteredType,
      preferences: enteredPreferences,
      waypoints: enteredWaypoints,
    };
    const response = await fetch(
      "https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json",
      {
        method: "POST",
        body: JSON.stringify(tripData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      // throw new Error(data.message || "Could not create quote.");
      alert(data.message || "Could not create quote.");
    }

    //return null;
  };

  return (
    <section>
      <div className={classes["new-trip"]}>
        <div className={classes["new-trip__control"]}>
          <form onSubmit={submitFormHandler}>
            <div className={classes["form-container"]}>
              <input
                type="date"
                // id="start"
                // name="trip-start"
                // value="2018-07-22"
                min={new Date().toISOString().split("T")[0]}
                max="2023-12-31"
              ></input>
              <select
                onChange={typeDropDownHandler}
                defaultValue="Choose trip type"
              >
                <option value="" hidden>
                  Choose trip type
                </option>
                <option value="car">Car trip</option>
                <option value="bike">Bike ride</option>
              </select>
              <select
                onChange={preferencesDropDownHandler}
                disabled={!enteredType}
                defaultValue="Choose preferences"
              >
                <option value="" hidden>
                  Choose preferences
                </option>
                {enteredType &&
                  enteredType === "car" &&
                  optionsCar.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                {enteredType &&
                  enteredType === "bike" &&
                  optionsBike.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
              <button type="submit" disabled={!enableCreateButtonFlag}>
                Create
              </button>
            </div>
          </form>
        </div>
        <div id="map" className={classes.map} />
      </div>
    </section>
  );
};

function createButton(label, container) {
  var btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

export default NewTripPage;

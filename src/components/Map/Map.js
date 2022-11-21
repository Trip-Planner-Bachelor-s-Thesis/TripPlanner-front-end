import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import { useEffect } from "react";

import styles from "./Map.module.css";

const Map = (props) => {
  let onWaypointsHandler = props.onWaypointsHandler;
  let userWaypointsInput = props.userWaypointsInput;
  if (userWaypointsInput.length === 0) {
    userWaypointsInput = false;
  }

  console.log("aaaaa");

  useEffect(() => {
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }

    var map = L.map("map").setView([52.2297, 21.0122], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let userWaypointsInputTransformed = [];
    if (userWaypointsInput) {
      userWaypointsInput.forEach((element) => {
        let waypoint = L.Routing.waypoint(L.latLng(element.lat, element.lng), element.name);
        userWaypointsInputTransformed.push(waypoint);
      });
    }

    console.log("test");

    var control = L.Routing.control({
      waypoints: userWaypointsInputTransformed,
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
    })
      .on("routeselected", function (e) {
        if (!userWaypointsInput) {
          var route = e.route;
          let userWaypointsReturn = [];
          route.inputWaypoints.forEach((element) => {
            let waypoint = {
              lat: element.latLng.lat,
              lng: element.latLng.lng,
              name: element.name,
            };
            userWaypointsReturn.push(waypoint);
          });
          onWaypointsHandler(userWaypointsReturn);
          // for (const element of userWaypoints) {
          //   console.log(element);
          // }
          // alert(
          //   "Showing route between waypoints:\n" +
          //     JSON.stringify(route.inputWaypoints, null, 2)
          // );
        }
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
  }, [onWaypointsHandler, userWaypointsInput]);

  return <div id="map" className={styles.map} />;
};

function createButton(label, container) {
  var btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

export default Map;

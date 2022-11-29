import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "lrm-graphhopper";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import styles from "./Map.module.css";
import { useState } from "react";

const Map = (props) => {
  return (
    <MapContainer className={styles.map} center={[52.2297, 21.0122]} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingControl onWaypointsHandler={props.onWaypointsHandler} userWaypointsInput={props.userWaypointsInput} />
    </MapContainer>
  );
};

const RoutingControl = (props) => {
  const map = useMap();
  const [isRouting, setIsRouting] = useState(false);
  let control;

  let userWaypointsInputTransformed = [];
  if (props.userWaypointsInput.length !== 0) {
    props.userWaypointsInput.forEach((element) => {
      let waypoint = L.Routing.waypoint(L.latLng(element.lat, element.lng), element.name);
      userWaypointsInputTransformed.push(waypoint);
    });
  }

  console.log("test");

  if (!isRouting) {
    control = L.Routing.control({
      waypoints: userWaypointsInputTransformed,
      routeWhileDragging: false,
      router: L.Routing.graphHopper("44c78c7e-16d3-4fd5-80a9-fa1b12807da7"),
      geocoder: L.Control.Geocoder.nominatim(),
    })
      .on("routeselected", function (e) {
        if (props.userWaypointsInput.length === 0) {
          let route = e.route;
          let userWaypointsReturn = [];
          route.inputWaypoints.forEach((element) => {
            let waypoint = {
              lat: element.latLng.lat,
              lng: element.latLng.lng,
              name: element.name,
            };
            userWaypointsReturn.push(waypoint);
          });
          props.onWaypointsHandler(userWaypointsReturn);
        }
      })
      .addTo(map);

    map.on("click", function (e) {
      let container = L.DomUtil.create("div"),
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
    setIsRouting(true);
  }
};

function createButton(label, container) {
  let btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

export default Map;

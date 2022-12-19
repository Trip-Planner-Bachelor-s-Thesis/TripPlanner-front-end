import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "lrm-graphhopper";
import { useEffect } from "react";

import styles from "./Map.module.css";

const Map = (props) => {
  let onWaypointsHandler = props.onWaypointsHandler;
  let userWaypointsInput = props.userWaypointsInput;
  let calculatedTripDataHandler = props.onCalculatedTripDataHandler;
  let isMapStatic = props.staticMap;
  let typeOfTransport = props.typeOfTransport ? props.typeOfTransport : "car";
  if (userWaypointsInput.length === 0) {
    userWaypointsInput = false;
  }

  useEffect(() => {
    var container = L.DomUtil.get("map");
    // container.remove(routingControl);
    if (container != null) {
      container._leaflet_id = null;
    }

    let map = L.map("map").setView([52.2297, 21.0122], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let userWaypointsInputTransformed = [];
    if (userWaypointsInput) {
      userWaypointsInput.forEach((element) => {
        let waypoint = L.Routing.waypoint(
          L.latLng(element.lat, element.lng),
          element.name
        );
        userWaypointsInputTransformed.push(waypoint);
      });
    }

    let control = L.Routing.control({
      waypoints: userWaypointsInputTransformed,
      routeWhileDragging: true,
      router: L.Routing.graphHopper("44c78c7e-16d3-4fd5-80a9-fa1b12807da7", {
        urlParameters: {
          vehicle: typeOfTransport,
        },
      }),
      geocoder: L.Control.Geocoder.nominatim(),
    })
      .on("routesfound", function (e) {
        if (!userWaypointsInput && !isMapStatic) {
          let routes = e.routes;
          let summary = routes[0].summary;
          let hours = Math.floor(summary.totalTime / 3600);
          let minutes = Math.round((summary.totalTime - hours * 3600) / 60);
          let tripData = {
            distance: Math.round(summary.totalDistance / 1000),
            totalTime: summary.totalTime,
            timeHours: hours,
            timeMinutes: minutes,
          };
          calculatedTripDataHandler(tripData);
        }
      })
      .on("routeselected", function (e) {
        if (!userWaypointsInput && !isMapStatic) {
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
          if (onWaypointsHandler) {
            onWaypointsHandler(userWaypointsReturn);
          }
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

    if (isMapStatic) {
      let waypoints = document.getElementsByClassName(
        "leaflet-routing-geocoder"
      );
      for (let waypoint of waypoints) {
        waypoint.style.pointerEvents = "none";
      }
      let buttonAdd = document.getElementsByClassName(
        "leaflet-routing-add-waypoint"
      );
      for (let button of buttonAdd) {
        button.style.visibility = "hidden";
      }
    }
  }, [
    onWaypointsHandler,
    userWaypointsInput,
    isMapStatic,
    calculatedTripDataHandler,
    typeOfTransport,
  ]);

  return <div id="map" className={styles.map} />;
};

function createButton(label, container) {
  let btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

export default Map;

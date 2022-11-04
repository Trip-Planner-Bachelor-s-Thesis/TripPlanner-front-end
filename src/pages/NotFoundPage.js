import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import { useEffect } from "react";

const NotFoundPage = () => {
  const style = {
    width: "90%",
    height: "500px",
    margin: "5rem auto",
  };

  useEffect(() => {
    var map = L.map("map").setView([52.2297, 21.0122], 13);
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
        console.log(route.inputWaypoints[0].name);
        // alert(
        //   "Showing route between waypoints:\n" +
        //     JSON.stringify(route.inputWaypoints, null, 2)
        // );
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

  return (
    // <div className='centered'>
    //   <p>Page not found!</p>
    // </div>
    <div id="map" style={style} />
  );
};

function createButton(label, container) {
  var btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

export default NotFoundPage;

import { useState, useEffect, Fragment } from "react";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";

const api = {
  key: "c23ad1b9d46f16263053c161aa3bf09e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState({});

  let lat = 1;
  let lon = 1;

  console.log(props.enteredWayPoints);
  function weatherClickHandler() {
    setIsOpen(true);
  }
  
  if(props.enteredWayPoints){
    lat = props.enteredWayPoints.lat;
    lon = props.enteredWayPoints.lng;
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  }, [lat, lon]);

  console.log(weather);

  return (
    <Fragment>
      <Button
        color="primary"
        variant="soft"
        sx={{ width: "100%" }}
        onClick={weatherClickHandler}
      >
        Check weather
      </Button>

      {props.isDestinantion &&  <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxHeight: "80%",
            width: "25%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "white",
            }}
          />
          {weather.main && (
            <div>
              <Typography level="body1">
                Temp: {Math.round(weather.main.temp)} C
              </Typography>
              <Typography level="body1">
                Weather Condition: {weather.weather[0].main}
              </Typography>
            </div>
          )}
        </Sheet>
      </Modal>}
    </Fragment>
  );
}

export default Weather;

import Slider from "@mui/joy/Slider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { Fragment, useRef, useState } from "react";

function Preferences(props) {
  let textWidth = 133;
  let alignText = "center";
  const [entertainment, setEntertainment] = useState(props.entertainment);
  const [sightseeing, setSightseeing] = useState(props.sightseeing);
  const [exploring, setExploring] = useState(props.exploring);
  const [culture, setCulture] = useState(props.culture);
  const [history, setHistory] = useState(props.history);
  const [freeride, setFreeride] = useState(props.freeride);
  const [training, setTraining] = useState(props.training);
  const [nature, setNature] = useState(props.nature);
  const [test, setTest] = useState(0);
  console.log(test);

  const savePreferences = () => {
    setTest((previousState) => previousState + 1);
    props.onSavePreferences();
  };

  return (
    <Fragment>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Entertainment</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={entertainment}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Sightseeing</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={sightseeing}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Exploring</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={exploring}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Culture</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={culture}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>History</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={history}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Free ride</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={freeride}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Training</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={training}
        />
      </Sheet>
      <Sheet sx={{ display: "flex", alignItems: "center", gap: 4, mb: 0.15 }}>
        <div style={{ width: textWidth, textAlign: alignText }}>
          <Typography sx={{ width: textWidth }}>Nature</Typography>
        </div>
        <Slider
          aria-label="Small steps"
          step={2}
          marks
          min={0}
          max={6}
          valueLabelDisplay="auto"
          defaultValue={nature}
        />
      </Sheet>
      <Button
        color="primary"
        variant="soft"
        sx={{ width: 100, mt: 2 }}
        onClick={savePreferences}
      >
        Save
      </Button>
    </Fragment>
  );
}

export default Preferences;

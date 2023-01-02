import Slider from "@mui/joy/Slider";
import { Typography } from "@mui/joy";

function Preferences() {
  return (
    <div>
      <Typography>Entertainment</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
      <Typography>Sightseeing</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
      <Typography>Free Ride</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
      <Typography>Training</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
      <Typography>Exploring</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
      <Typography>Culture</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
      <Typography>History</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={0}
        step={2}
        marks
        min={0}
        max={6}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default Preferences;

import { Fragment } from "react";
// import styles from "./SingleUserLeaderboard.module.css";
// import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import NumbersIcon from "@mui/icons-material/Numbers";
// import Avatar from "@mui/joy/Avatar";
// import Tooltip from "@mui/joy/Tooltip";
// import IconButton from "@mui/joy/IconButton";
// import StarIcon from "@mui/icons-material/Star";
// import Sheet from "@mui/joy/Sheet";

const SingleUserLeaderboard = (props) => {
  return (
    <Fragment>
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        {/* <Sheet
          variant="outlined"
          sx={{
            width: "33%",
            borderRadius: "sm",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "md",
          }}
        > */}
          {props.index === 0 && <EmojiEventsIcon sx={{ mr: 0.25 }} />}
          <PersonIcon />
          &#160;
          {props.username}&#160;&#160;&#160;
          {props.type === 0 && <SportsScoreIcon sx={{ mr: 0.25 }} />}
          {props.type === 0 && `${props.distance}km`}
          {props.type === 1 && <NumbersIcon sx={{ mr: 0.25 }} />}
          {props.type === 1 && `${props.numTripsCreated}`}
          {props.type === 2 && <NumbersIcon sx={{ mr: 0.25 }} />}
          {props.type === 2 && `${props.numTripsJoined}`}
          {props.type === 3 && `${props.organizerRating.toFixed(2)}`}
          {props.type === 3 && <StarIcon sx={{ ml: 0.25 }} />}
          {props.type === 4 && `${props.userRating.toFixed(2)}`}
          {props.type === 4 && <StarIcon sx={{ ml: 0.25 }} />}
        {/* </Sheet> */}
      </ListItem>
    </Fragment>
  );
};

export default SingleUserLeaderboard;

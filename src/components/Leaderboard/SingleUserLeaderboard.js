import { Fragment } from "react";
// import styles from "./SingleUserLeaderboard.module.css";
// import ListDivider from "@mui/joy/ListDivider";
//import ListItem from "@mui/joy/ListItem";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
//import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
//import SportsScoreIcon from "@mui/icons-material/SportsScore";
//import NumbersIcon from "@mui/icons-material/Numbers";
// import Avatar from "@mui/joy/Avatar";
// import Tooltip from "@mui/joy/Tooltip";
// import IconButton from "@mui/joy/IconButton";
// import StarIcon from "@mui/icons-material/Star";
// import Sheet from "@mui/joy/Sheet";

const SingleUserLeaderboard = (props) => {
  return (
    <Fragment>
      {props.type === 0 && (
        <tr>
          {props.index === 0 && (
            <td>
              {<EmojiEventsIcon sx={{ mr: 0.25 }} />}
              {props.index + 1}
            </td>
          )}
          {props.index !== 0 && <td>{props.index + 1}</td>}
          <td>{props.username}</td>
          <td>{props.distance}km</td>
          <td>{props.numTripsCreated}</td>
          <td>{props.numTripsJoined}</td>
          <td>
            {props.organizerRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>
            {props.userRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
        </tr>
      )}
      {props.type === 1 && (
        <tr>
          {props.index === 0 && (
            <td>
              {<EmojiEventsIcon sx={{ mr: 0.25 }} />}
              {props.index + 1}
            </td>
          )}
          {props.index !== 0 && <td>{props.index + 1}</td>}
          <td>{props.username}</td>
          <td>{props.numTripsCreated}</td>
          <td>{props.numTripsJoined}</td>
          <td>
            {props.organizerRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>
            {props.userRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>{props.distance}km</td>
        </tr>
      )}
      {props.type === 2 && (
        <tr>
          {props.index === 0 && (
            <td>
              {<EmojiEventsIcon sx={{ mr: 0.25 }} />}
              {props.index + 1}
            </td>
          )}
          {props.index !== 0 && <td>{props.index + 1}</td>}
          <td>{props.username}</td>
          <td>{props.numTripsJoined}</td>
          <td>{props.numTripsCreated}</td>
          <td>
            {props.organizerRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>
            {props.userRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>{props.distance}km</td>
        </tr>
      )}
      {props.type === 3 && (
        <tr>
          {props.index === 0 && (
            <td>
              {<EmojiEventsIcon sx={{ mr: 0.25 }} />}
              {props.index + 1}
            </td>
          )}
          {props.index !== 0 && <td>{props.index + 1}</td>}
          <td>{props.username}</td>
          <td>
            {props.organizerRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>
            {props.userRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>{props.numTripsCreated}</td>
          <td>{props.numTripsJoined}</td>
          <td>{props.distance}km</td>
        </tr>
      )}
      {props.type === 4 && (
        <tr>
          {props.index === 0 && (
            <td>
              {<EmojiEventsIcon sx={{ mr: 0.25 }} />}
              {props.index + 1}
            </td>
          )}
          {props.index !== 0 && <td>{props.index + 1}</td>}
          <td>{props.username}</td>
          <td>
            {props.userRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>
            {props.organizerRating.toFixed(2)}
            {<StarIcon sx={{ ml: 0.25 }} />}
          </td>
          <td>{props.numTripsCreated}</td>
          <td>{props.numTripsJoined}</td>
          <td>{props.distance}km</td>
        </tr>
      )}
    </Fragment>
  );
};

export default SingleUserLeaderboard;

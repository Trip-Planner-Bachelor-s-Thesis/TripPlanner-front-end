import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import TerrainIcon from "@mui/icons-material/Terrain";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Avatar from "@mui/joy/Avatar";
import StarIcon from "@mui/icons-material/Star";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import styles from "./PreferencesDescription.module.css";

const PreferencesDescription = (props) => {
  let userListWidth = 175;
  let rateButtonWidth = 150;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let hours = Math.floor(props.tripData.totalTime / 3600);
  let minutes = Math.round((props.tripData.totalTime - hours * 3600) / 60);

  const showParticipantsHandler = () => {
    setIsOpen(true);
  };

  const chatHandler = () => {
    navigate("chat");
  };

  const joinHandler = () => {
    props.onJoinHandler();
  };

  const addFavoritesHandler = async () => {
    props.onAddFavoritesHandler();
  };

  const rateUser = (username, isParticpant, index) => {
    console.log(username);
    isParticpant &&
      console.log(document.getElementById(`participant${index}`).innerHTML);
    !isParticpant &&
      console.log(document.getElementById(`organizer`).innerHTML);
    document.getElementById(`participant-div${index}`).style.visibility =
      "hidden";
  };

  return (
    <div className={styles["content-container"]}>
      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: "sm",
          mb: 2,
        }}
      >
        <Typography level="body1">
          Trip distance: {props.tripData.distance} km
        </Typography>
        <Typography level="body1">
          Estimated time: {hours} h {minutes} min
        </Typography>
      </Sheet>

      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: "sm",
          height: "65%",
          mb: 2,
          overflow: "auto",
        }}
      >
        <Typography
          startDecorator={<TerrainIcon />}
          level="body1"
          sx={{ mb: 1 }}
        >
          What is the organiser's plan?
        </Typography>
        <Typography level="body1">{props.tripData.description}</Typography>
      </Sheet>

      <Button
        color="primary"
        variant="soft"
        sx={{ mb: 1, width: "100%" }}
        onClick={showParticipantsHandler}
      >
        Show participants
      </Button>
      {(props.isJoined || props.isCreated) && (
        <Button
          color="primary"
          variant="soft"
          sx={{ mb: 1, width: "100%" }}
          onClick={chatHandler}
        >
          Open chat
        </Button>
      )}
      {!props.isJoined && !props.isCreated && (
        <Button
          color="primary"
          variant="soft"
          sx={{ mb: 1, width: "100%" }}
          onClick={joinHandler}
          loading={props.isLoadingJoin}
        >
          Join trip
        </Button>
      )}
      {!props.isFavorite && (
        <Button
          color="primary"
          variant="soft"
          sx={{ mb: 1, width: "100%" }}
          onClick={addFavoritesHandler}
          loading={props.isLoadingFavorites}
        >
          Add to favorites
        </Button>
      )}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxHeight: "80%",
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
          <Typography level="body1" sx={{ mb: 1, textAlign: "center" }}>
            Organiser
          </Typography>
          <Sheet sx={{ px: 2 }}>
            <List
              column="true"
              wrap
              sx={{
                "--List-gap": "8px",
                "--List-item-radius": "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <ListItem key={props.tripData.creator.email}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: userListWidth,
                    overflowX: "auto",
                  }}
                >
                  <ListItemDecorator sx={{ mr: 0 }}>
                    <Avatar size="sm" />
                  </ListItemDecorator>
                  <div style={{ verticalAlign: "center" }}>
                    {props.tripData.creator.username}
                  </div>
                  &#160; &#160;
                  <div style={{ verticalAlign: "center" }}>
                    {props.tripData.creator.organizerRating.toFixed(2)}
                  </div>
                  <StarIcon sx={{ ml: 0.25 }} />
                </div>
                <div
                  id="organizer-div"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: rateButtonWidth,
                  }}
                >
                  <Select size="sm" placeholder="-" id="organizer">
                    <Option value="-">-</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="4">5</Option>
                  </Select>
                  <Button
                    id="organizer-button"
                    size="sm"
                    variant="soft"
                    sx={{ ml: 1 }}
                    onClick={(event) => {
                      let isParticpant = false;
                      event.preventDefault();
                      rateUser(props.tripData.creator.username, isParticpant);
                    }}
                  >
                    Rate
                  </Button>
                </div>
              </ListItem>
            </List>
          </Sheet>
          <Typography level="body1" sx={{ my: 1, mt: 2, textAlign: "center" }}>
            Participants
          </Typography>
          <Sheet sx={{ maxHeight: 300, overflowY: "auto", px: 2 }}>
            <List
              column="true"
              wrap
              sx={{
                "--List-gap": "8px",
                "--List-item-radius": "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {props.tripData.members.map(
                (item, index) =>
                  item.username !== props.tripData.creator.username && (
                    <ListItem key={item.email}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: userListWidth,
                          overflowX: "auto",
                        }}
                      >
                        <ListItemDecorator sx={{ mr: 0 }}>
                          <Avatar size="sm" />
                        </ListItemDecorator>
                        <div style={{ verticalAlign: "center" }}>
                          {item.username}
                        </div>
                        &#160; &#160;
                        <div style={{ verticalAlign: "center" }}>
                          {item.organizerRating.toFixed(2)}
                        </div>
                        <StarIcon sx={{ ml: 0.25 }} />
                      </div>
                      <div
                        id={`participant-div${index}`}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: rateButtonWidth,
                        }}
                      >
                        <Select
                          size="sm"
                          placeholder="-"
                          id={`participant${index}`}
                        >
                          <Option value="-">-</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                          <Option value="4">4</Option>
                          <Option value="4">5</Option>
                        </Select>
                        <Button
                          id={`participant-button${index}`}
                          size="sm"
                          variant="soft"
                          sx={{ ml: 1 }}
                          onClick={(event) => {
                            let isParticpant = true;
                            event.preventDefault();
                            rateUser(item.username, isParticpant, index);
                          }}
                        >
                          Rate
                        </Button>
                      </div>
                    </ListItem>
                  )
              )}
            </List>
          </Sheet>
        </Sheet>
      </Modal>
    </div>
  );
};

export default PreferencesDescription;

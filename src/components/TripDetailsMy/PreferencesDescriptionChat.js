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

import styles from "./PreferencesDescriptionChat.module.css";

const PreferencesDescriptionChat = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let hours = Math.floor(props.tripData.totalTime / 3600);
  let minutes = Math.round((props.tripData.totalTime - hours * 3600) / 60);

  const showParticipantsHandler = () => {
    setIsOpen(true);
  };

  const chatHandler = () => {
    navigate("chat");
  }

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
      <Button color="primary" variant="soft" sx={{ mb: 1, width: "100%" }} onClick={chatHandler}>
        Open chat
      </Button>

      <Modal
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
          <Typography level="body1" sx={{ mb: 1, textAlign: "center" }}>
            Organiser
          </Typography>
          <Sheet>
            <List
              column
              wrap
              sx={{
                "--List-gap": "8px",
                "--List-item-radius": "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <Avatar size="sm" />
                </ListItemDecorator>
                Kevin Ross
              </ListItem>
            </List>
          </Sheet>
          <Typography level="body1" sx={{ my: 1, textAlign: "center" }}>
            Participants
          </Typography>
          <Sheet sx={{ maxHeight: 400, overflow: "auto" }}>
            <List
              column
              wrap
              sx={{
                "--List-gap": "8px",
                "--List-item-radius": "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <ListItem sx={{ m: 0 }}>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <Avatar size="sm" />
                </ListItemDecorator>
                Kevin Ross
              </ListItem>
              {/* <ListDivider inset="gutter" sx={{my: 0}}  /> */}
              <ListItem sx={{ m: 0 }}>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <Avatar size="sm" />
                </ListItemDecorator>
                John Smith
  
              </ListItem>
              {/* <ListDivider inset="gutter" sx={{my: 0}} /> */}
              <ListItem sx={{ m: 0 }}>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <Avatar size="sm" />
                </ListItemDecorator>
                Kevin Ross
              </ListItem>
              {/* <ListDivider inset="gutter" sx={{my: 0}}  /> */}
              <ListItem sx={{ m: 0 }}>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <Avatar size="sm" />
                </ListItemDecorator>
                John Smith
              </ListItem>
              {/* <ListDivider inset="gutter" sx={{my: 0}}  /> */}
              
            </List>
          </Sheet>
        </Sheet>
      </Modal>
    </div>
  );
};

export default PreferencesDescriptionChat;

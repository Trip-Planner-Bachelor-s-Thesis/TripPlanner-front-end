import { useState, useEffect, Fragment, useContext } from "react";
import List from "@mui/joy/List";
import styles from "./AllUsers.module.css";
import SingleUser from "./SingleUser";
import LogRegisterContext from "../../contexts/log-register-context";
import SpinnerBox from "../Utils/SpinnerBox";
import fetchUrls from "../../helpers/fetch_urls";

const AllUsers = (props) => {
  const { token } = useContext(LogRegisterContext);
  const [allFetchedUsers, setAllFetchedUsers] = useState(null);
  const [isSendingRequest, setisSendingRequest] = useState(true);
  const [isUserDeleted, setIsUserDeleted] = useState(0);

  const userDeletedHandler = (username) => {
    console.log("test");
    fetch(`${fetchUrls["delete-user"]}/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsUserDeleted((previousState) => previousState + 1);
      })
      .catch((error) => {
        console.log("test2");
        console.log(error);
      });
  };
  //const postsContainerRef = useRef();

  useEffect(() => {
    fetch(fetchUrls["get-all-users"], {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        let users = [];
        for (let user of data.users) {
          users.push(user);
        }
        let sortedUsers = users.sort(function (a, b) {
          if (a.username < b.username) {
            return -1;
          }
          if (a.username > b.username) {
            return 1;
          }
          return 0;
        });
        setisSendingRequest(false);
        setAllFetchedUsers(sortedUsers);
        //setTimeout(handleScroll, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, isUserDeleted]);

  // const handleScroll = () => {
  //   postsContainerRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // };

  return (
    <Fragment>
      <div className={styles["all-posts-container"]}>
        {isSendingRequest && <SpinnerBox />}
        {allFetchedUsers &&
          (allFetchedUsers.length === 0 ? (
            <p className={styles["no-posts-found"]}>No users created</p>
          ) : (
            <List sx={{ width: "85%", m: "0 auto", p: 0 }}>
              {allFetchedUsers.map((user) => (
                <SingleUser
                  key={user.email}
                  email={user.email}
                  username={user.username}
                  organizerRating={user.organizerRating}
                  userRating={user.userRating}
                  onDeleteHandler={userDeletedHandler}
                ></SingleUser>
              ))}
            </List>
          ))}
        {/* <div ref={postsContainerRef}></div> */}
      </div>
    </Fragment>
  );
};

export default AllUsers;

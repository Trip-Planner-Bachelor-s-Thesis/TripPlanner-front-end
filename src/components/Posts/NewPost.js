import { useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import styles from "./NewPost.module.css";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const NewPost = (props) => {
  const { token } = useContext(LogRegisterContext);
  const { tripId } = useParams();
  const postRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    let postData = {
      content: postRef.current.value,
    };

    fetch(`${fetchUrls.posts}/${tripId}`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        postRef.current.value = "";
        props.onNewPostHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles["new-post-control"]}>
      <form onSubmit={submitHandler}>
        <div className={styles["form-container"]}>
          <textarea rows="4" cols="100" ref={postRef}></textarea>
          <button type="submit" onClick={submitHandler}>
            Create post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;

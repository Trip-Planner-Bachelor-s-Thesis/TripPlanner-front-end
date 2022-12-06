import { useRef } from "react";

import styles from "./NewPost.module.css";

const NewPost = (props) => {
  const postRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    let postData = {
      author: "johnsmith96",
      content: postRef.current.value,
      publishDate: new Date().toJSON()
    };

    const response = await fetch(
      "https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Could not create post.");
    } else {
      postRef.current.value = "";
      props.onNewPostHandler();
    }
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

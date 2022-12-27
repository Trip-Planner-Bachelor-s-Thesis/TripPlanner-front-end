import { useState } from "react";

import styles from "./Posts.module.css";
import NewPost from "./NewPost";
import AllPosts from "./AllPosts";
// import Typography from "@mui/joy/Typography";

const Posts = () => {
  const [isNewPost, setIsNewPost] = useState(0);
  const newPostHandler = () => {
    setIsNewPost((previousState) => previousState + 1);
  };

  return (
    <section className={styles["posts-section"]}>
      <div className={styles["posts"]}>
        {/* <div className={styles["title-container"]}>
          <Typography level="h6">
            Browse through posts
          </Typography>
        </div> */}
        <AllPosts isNewPost={isNewPost} />
        <NewPost onNewPostHandler={newPostHandler} />
      </div>
    </section>
  );
};

export default Posts;

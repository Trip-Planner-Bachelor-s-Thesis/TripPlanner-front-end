import styles from "./Posts.module.css";
import NewPost from "./NewPost";
import AllPosts from "./AllPosts";

const Posts = () => {
  return (
    <section className={styles["posts-section"]}>
      <div className={styles["posts"]}>
        <AllPosts />
        <NewPost />
      </div>
    </section>
  );
};

export default Posts;

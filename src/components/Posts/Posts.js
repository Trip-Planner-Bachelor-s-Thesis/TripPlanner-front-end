import styles from "./Posts.module.css";
import NewPost from "./NewPost";

const Posts = () => {
  return (
    <section className={styles["posts-section"]}>
      <div className={styles["posts"]}>
        <NewPost />
      </div>
    </section>
  );
};

export default Posts;

import { Fragment } from "react";
import styles from "./SinglePost.module.css";

const SinglePost = (props) => {
  return (
    <Fragment>
    <div className={styles["post-date"]} data-testid="date">{props.day} {props.month} {props.year}</div>
    <li className={styles["single-post"]}>
      <div className={styles["post-content"]} data-testid="content">{props.content}</div>
      <div className={styles["post-author"]} data-testid="author">{props.author}</div>
    </li>
    </Fragment>
  );
};

export default SinglePost;

import styles from "./NewPost.module.css";

const NewPost = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles["new-post-control"]}>
      <form onSubmit={submitHandler}>
        <div className={styles["form-container"]}>
          <textarea rows="4" cols="100">
            At w3schools.com you will learn how to make a website. They offer
            free tutorials in all web development technologies.
          </textarea>
          <button type="submit" disabled={!props.enableCreateButtonFlag}>
            Create post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;

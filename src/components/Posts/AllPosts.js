import { useState, useEffect, useRef, Fragment } from "react";

import styles from "./AllPosts.module.css";
import SinglePost from "./SinglePost";

const AllPosts = (props) => {
  const [allFetchedPosts, setAllFetchedPosts] = useState(null);
  const postsContainerRef = useRef();
  let postNumber = props.isNewPost;

  useEffect(() => {
    fetch(
      "https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let posts = [];
        for (const key in data) {
          const post = {
            id: key,
            ...data[key],
          };
          posts.push(post);
        }
        setAllFetchedPosts(posts);
      });
    setTimeout(handleScroll, 500);
  }, [postNumber]);

  const handleScroll = () => {
    postsContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <Fragment>
      <div className={styles["all-posts-container"]}>
        {allFetchedPosts &&
          (allFetchedPosts.length === 0 ? (
            <p className={styles["no-posts-found"]}>No posts published yet</p>
          ) : (
            <ul className={styles["list-of-posts"]}>
              {allFetchedPosts.map((post) => (
                <SinglePost
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  day={new Date(post.publishDate).getDate()}
                  month={new Date(post.publishDate).toLocaleString('default', { month: 'long' })}
                  year={new Date(post.publishDate).getFullYear()}
                ></SinglePost>
              ))}
            </ul>
          ))}
        <div ref={postsContainerRef}></div>
      </div>
    </Fragment>
  );
};

export default AllPosts;

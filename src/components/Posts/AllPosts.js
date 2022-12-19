import { useState, useEffect, useRef, Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./AllPosts.module.css";
import SinglePost from "./SinglePost";
import LogRegisterContext from "../../contexts/log-register-context";
import fetchUrls from "../../helpers/fetch_urls";

const AllPosts = (props) => {
  const { token } = useContext(LogRegisterContext);
  const [allFetchedPosts, setAllFetchedPosts] = useState(null);
  const postsContainerRef = useRef();
  const { tripId } = useParams();
  let postNumber = props.isNewPost;

  useEffect(() => {
    fetch(`${fetchUrls.posts}/${tripId}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        let posts = [];
        for (let post of data.posts) {
          posts.push(post)
        }
        setAllFetchedPosts(posts);
        setTimeout(handleScroll, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postNumber, tripId, token]);

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
                  key={post.postId}
                  author={post.creatorUsername}
                  content={post.content}
                  day={new Date(post.creationDateTime).getDate()}
                  month={new Date(post.creationDateTime).toLocaleString("default", {
                    month: "long",
                  })}
                  year={new Date(post.creationDateTime).getFullYear()}
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

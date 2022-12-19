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
        console.log(data);
        // for (const key in data) {
        //   const post = {
        //     id: key,
        //     ...data[key],
        //   };
        //   posts.push(post);
        // }
        setAllFetchedPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(handleScroll, 500);
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
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  day={new Date(post.publishDate).getDate()}
                  month={new Date(post.publishDate).toLocaleString("default", {
                    month: "long",
                  })}
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

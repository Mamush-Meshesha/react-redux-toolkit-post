import React, { useEffect } from "react";
import SearchPost from "./SearchPost";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slice/postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

    const { loading, error, posts } = useSelector((state) => state.posts);

  return (
    <>
      <SearchPost />
      <div className="posts-list">
        <h1>Total Posts {posts.length}</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : 
            posts.map((post) => {
              return (
              <div key={post.id} className="post-details">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
             ) })
        }
      </div>
    </>
  );
};

export default PostsList;

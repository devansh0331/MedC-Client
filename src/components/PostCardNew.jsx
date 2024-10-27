import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SERVER_URL } from "../ServerURL";
import SinglePostCard from "./SinglePostCard";

const PostCardNew = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/newposts/posts`);
      const res = await response.json();
      console.log("Call");
      console.log(res);
      setPosts(res);
    } catch (error) {
      console.error("Failed to fetch posts");
    }
  };

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/newposts/posts?page=${page + 1}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  return (
    <div className="h-auto">
      <h1>Posts</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        className="grid grid-cols-1 gap-5"
      >
        {posts.map((post) => (
          <SinglePostCard key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostCardNew;

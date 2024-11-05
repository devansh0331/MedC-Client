import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SERVER_URL } from "../ServerURL";
import SinglePostCard from "./SinglePostCard";
import { RiGalleryFill } from "react-icons/ri";
import { Button } from "@material-tailwind/react";

const PostCardNew = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [file, setFile] = useState();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // FOR POSTING WITH A FILE
    if (file) {
      console.log("New post");
      formData.append("image", file);
      console.log(formData.get("image"));

      try {
        // console.log("Form Data: ", formData.getAll);
        const response = await fetch(`${SERVER_URL}/newposts/file-post`, {
          method: "POST",

          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Post created successfully:");
          console.log("New post: ", result);
          setFile(null);
        } else {
          console.error("Failed to create post:", result.error);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
    // FOR POSTING WITHOUT A FILE
  };

  return (
    <div className="h-auto">
      <h1>Upload Image</h1>
      <div className="flex flex-col my-1">
        <label className="text-gray-700 text-sm">Upload File</label>
        <div className="relative">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file-upload"
            className="border-2 profilepic border-gray-400 rounded-md px-3 py-0.5 w-full h-full text-sm text-gray-700 flex items-center cursor-pointer"
          >
            <RiGalleryFill className="w-5 h-5" />{" "}
            <span className="ml-2">{file ? file.name : "Upload File"}</span>
          </label>
        </div>
        <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
      </div>
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

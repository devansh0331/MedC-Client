import React, { useEffect, useState } from "react";
import SinglePostCard from "../components/SinglePostCard";
import { SERVER_URL } from "../ServerURL";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
import ProfileCard from "../components/ProfileCard";
import MorefromThem from "../components/MorefromThem";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({});
  const postId = useParams();
  const [currentUserId, setCurrentuserId] = useState(null);
  const { getPosts, userId, posts, getUser, user } = useContext(UserContext);

  useEffect(() => {
    getSinglePost();
  }, []);

  const getSinglePost = async () => {
    const response = await fetch(
      `${SERVER_URL}/post/single-post/${postId.id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const res = await response.json();
    if (!res.success) {
      console.log(res.error);
    } else {
      setPost(res.data);
      setCurrentuserId(user._id);
      setPostUser(res.data.user);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`${SERVER_URL}/post/single-post/like/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        toast.error(parsedRes.error);
      } else {
        getSinglePost();
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  return (
    <div className="w-full h-[90vh] flex overflow-hidden bg-background">
      <SideBar className="h-screen" route={"profile"} />

      <div className="flex h-full gap-6 justify-center mx-auto">
        <div className="w-80 mt-5">
        <ProfileCard 
        route="single-post" 
        user={postUser}
        profileURL={
          // post.user && post.user.profileURL ? post.user.profileURL : ""
          postUser._id
        }
        />
        </div>
        <div className="w-2/5 mt-3">  
        <SinglePostCard
          img={post.fileURL == "" ? null : post.fileURL}
          name={post.user ? post.user.name : "Unknown User"}
          profileURL={
            post.user && post.user.profileURL ? post.user.profileURL : ""
          }
          description={post.description}
          likes={post.likes ? Object.keys(post.likes).length : "0"}
          isLiked={post.likes && post.likes[currentUserId]}
          postedAt={
            post &&
            post.createdAt && (
              <ReactTimeAgo date={post.createdAt} locale="en-US" />
            )
          }
          handleLike={() => handleLike(post._id)}
          postId={postId.id}
          userId={currentUserId}
          className="shadow-md"
        />
        </div>
        <div className="w-96">
        <MorefromThem/>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

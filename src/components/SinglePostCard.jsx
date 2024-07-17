import React, { useEffect } from "react";
import { useState } from "react";
import profile from "../assets/profile.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { SERVER_URL } from "../ServerURL";
import altprofile from "../assets/altprofile.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const SinglePostCard = (props) => {
  const [comm, setComm] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const postId = props.postId;
  const user = props.userId;
  const [postMenu, setPostMenu] = useState(false);

  useEffect(() => {});
  const getComments = async (comm) => {
    if (comm == true) {
      try {
        const response = await fetch(
          `${SERVER_URL}/post/single-post/comment/all/${postId}`,
          { method: "GET" }
        );

        const res = await response.json();

        if (!res.success) {
          console.log(res.error);
        } else {
          setComments(res.data);
          setCommentsCount(res.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch comments");
      }
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/single-post/comment/post/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      const res = await response.json();
      if (!res.success) {
        console.log("Failed to comment due to: ", res.error);
      } else {
        setComment("");
        getComments(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/single-post/comment/delete/${commentId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (!res.success) {
        console.log("Failed to delete comment due to: ", res.error);
      } else {
        getComments(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="w-full m-auto p-4 my-2 bg-white rounded-md shadow-md">
        {/* NAME AND DETAILS */}
        <div className="flex justify-between">
          <div className="flex">
            <Link to={`/user/${props.profileId}`}>
              <img
                src={props.profileURL != "" ? props.profileURL : altprofile}
                alt="profile"
                className="rounded-full h-8 md:h-12 w-8 md:w-12"
              />
            </Link>
            <div className="flex flex-col ml-2 md:ml-4">
              <Link to={`/user/${props.profileId}`}>
                <p className="text-black font-semibold text-sm md:text-base ">
                  {props.name}
                </p>
              </Link>
              <p className="text-gray-600 font-normal text-sm md:text-md leading-3 md:leading-none">
                Technology
              </p>
            </div>
          </div>
          {/* TIME INFO */}
          <div className="flex flex-col-reverse md:flex-row items-end md:items-center">
            <p className="text-gray-600 font-normal text-sm md:text-sm leading-3 md:leading-none">
              {props.postedAt}
            </p>
            <button onClick={() => setPostMenu(!postMenu)}>
              <HiOutlineDotsHorizontal className="text-gray-600 ml-4 w-6 h-6" />
            </button>
            {postMenu && (
              <div class="relative inline-block text-left">
                <div
                  class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      Save
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      Delete
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      Repost
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* POST */}
        <div className="flex flex-col w-full py-4">
          <p className="text-md  text-gray-900">
            {props.description}
            <br />
            {props.readMore && (
              <button className="text-blue-500">Read More</button>
            )}
          </p>
          {props.img && (
            <img
              src={props.img}
              className="my-4 w-full mx-auto bg-gray-100  rounded-md shadow-lg"
            ></img>
          )}

          {/* LIKE AND COMMENT INFO */}
          <div className="flex justify-around text-sm md:text-md pt-4">
            <button
              onClick={props.handleLike}
              className="flex items-center justify-center cursor-pointer"
            >
              {props.isLiked ? (
                <AiFillLike className="w-5 h-5 mr-2" />
              ) : (
                <AiOutlineLike className="w-5 h-5 mr-2" />
              )}{" "}
              {props.likes}{" "}
              {props.likes == 0 || props.likes == 1 ? "Like" : "Likes"}
            </button>

            <button
              className="flex items-center cursor-pointer"
              onClick={() => {
                setComm(!comm);
                getComments(!comm);
              }}
            >
              <FaRegCommentAlt className="w-4 h-4 mr-2" />{" "}
              {commentsCount ? commentsCount : ""}{" "}
              {commentsCount === 1 ? "Comment" : "Comments"}
            </button>

            <button className="flex items-center cursor-pointer">
              <IoPaperPlaneOutline className="w-4 h-4 mr-2" /> Share
            </button>
          </div>

          {/* COMMENTS */}
          {comm && (
            <div>
              <div className="flex w-full items-center mt-2 p-2 ">
                <input
                  className="text-sm w-full border-2 border-gray-400 px-2 py-1 rounded-md text-gray-700 ml-8"
                  placeholder="Write a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={addComment}
                  className="ml-2 text-sm bg-primary rounded-full px-4 py-1 text-white"
                >
                  Post
                </button>
              </div>
              {comments &&
                comments.map((comment, key) => (
                  <div key={key} className="w-full flex flex-col my-1">
                    <div className="w-full border-t-2 mx-auto p-2">
                      <div className="flex items-center">
                        <img
                          src={
                            !comment.userId.profileURL
                              ? profile
                              : comment.userId.profileURL
                          }
                          alt="med-c user"
                          className="rounded-full h-6 w-6"
                        />
                        <div className="flex w-full justify-between">
                          <p className="ml-2 text-sm font-semibold text-gray-700">
                            {comment.userId == null
                              ? "Unknown User"
                              : comment.userId.name}
                          </p>
                          {comment.userId._id === user && (
                            <button onClick={() => deleteComment(comment._id)}>
                              <RiDeleteBin6Line className="w-4 h-4 mr-2" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 ml-8">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;

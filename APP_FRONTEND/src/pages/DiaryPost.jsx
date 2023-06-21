import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
import backgroundImage from "../assets/Purple.png";

const DiaryPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:4500/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);

      if (response.ok) {
        const json = await response.json();
        setPost(json);
      }
    };

    fetchPost();
  }, [user, id]);
  if (!post) return null;

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-[#3a1b5694] text-2xl font-vt323 text-white font-arial flex flex-col max-w-6xl items-between gap-3 items-center m-auto p-5">
        <h2 className="text-6xl">{post.title}</h2>
        <div>{format(new Date(post.date), "MMMM d, y")}</div>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default DiaryPost;

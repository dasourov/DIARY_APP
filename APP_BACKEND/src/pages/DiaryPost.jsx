import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

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
    <div className="bg-lime-300 flex flex-col gap-2 mt-4">
      <h2 className="text-2xl font-serif font-bold">{post.title}</h2>
      <div>{post.date}</div>
      <p>{post.content}</p>
    </div>
  );
};

export default DiaryPost;

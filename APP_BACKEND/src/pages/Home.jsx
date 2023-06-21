import { useState, useEffect } from "react";
import PostHead from "../components/PostHead";
import PostForm from "../components/PostForm";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4500/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    fetchPosts();
  }, [user, dispatch]);
  return (
    <>
      <div className="flex gap-60">
        <div>
          <h1 className="text-4xl">Posts</h1>
          <ul className=" max-w-2xl">
            {posts &&
              posts.map((post) => {
                return <PostHead key={post._id} post={post} />;
              })}
          </ul>
        </div>
        <div className="mt-3">
          <PostForm />
        </div>
      </div>
    </>
  );
};

export default Home;

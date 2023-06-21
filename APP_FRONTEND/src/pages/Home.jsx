import { useEffect } from "react";
import PostHead from "../components/PostHead";
import PostForm from "../components/PostForm";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import backgroundImage from "../assets/Purple.png";

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
      <div
        className="flex flex-col-reverse bg-repeat lg:flex-row gap-5 lg:gap-20  justify-around text-2xl h-screen bg-contain font-vt323"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="lg:text-6xl text-2xl text-[#9b57d6dd]">Posts</h1>
          <ul className="lg:max-w-2xl">
            {posts &&
              posts.map((post) => {
                return <PostHead key={post._id} post={post} />;
              })}
          </ul>
        </div>
        <div className="lg:mt-3">
          <PostForm />
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import { useForm } from "react-hook-form";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const post = {
      date: data.date,
      title: data.title,
      content: data.content,
    };

    try {
      const response = await fetch("http://localhost:4500/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const body = await response.text();
      const newPost = JSON.parse(body);

      if (!response.ok) setError("Something went wrong");
      if (response.ok) {
        reset({ title: "", date: "", content: "" });
        dispatch({ type: "CREATE_POST", payload: newPost });
        console.log("Success", newPost);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center mt-96 md:mt-60 lg:mt-0"
      >
        <div>
          <h3 className="text-3xl font-bold font-arial text-[#9b57d6dd]">
            Create a Post
          </h3>
        </div>
        <div className="flex flex-col justify-center w-80 lg:w-[500px] gap-2">
          <input
            className="border-4 border-[#3b2054] border-opacity-25 bg-[#9b57d6dd] text-black outline-0"
            type="text"
            placeholder="Title"
            {...register("title", { required: "required field" })}
          />
          <p>{errors.title?.message}</p>
          <input
            className="border-4 border-[#3b2054] bg-[#9b57d6dd] border-opacity-25 text-[#b6aac1e6] outline-0 "
            type="date"
            {...register("date", { required: "required field" })}
          />
          <p>{errors.date?.message}</p>
          <textarea
            className="border-4 border-[#3b2054] p-2 h-80 w-full border-opacity-25 bg-[#9b57d6dd] outline-0"
            rows="25"
            {...register("content", { required: "required field" })}
            placeholder="Enter diary content"
          />

          <p>{errors.content?.message}</p>
          <button
            type="submit"
            value="submit"
            className="bg-[#9b57d6dd] p-3 text-white cursor-pointer hover:bg-[#3b2054b7] transition-all duration-500"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;

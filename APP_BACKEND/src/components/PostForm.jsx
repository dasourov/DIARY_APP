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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <h3 className="text-2xl font-bold text-lime-500">Create a Post</h3>
        </div>
        <input
          className="border border-red-500 "
          type="text"
          placeholder="title"
          {...register("title", { required: "required field" })}
        />
        <p>{errors.title?.message}</p>
        <input
          className="border border-red-500 "
          type="date"
          {...register("date", { required: "required field" })}
        />
        <p>{errors.date?.message}</p>
        <textarea
          className="border border-red-500 p-40 h-10 w-[100%]"
          rows="25"
          {...register("content", { required: "required field" })}
          placeholder="enter diary content"
        />
        <p>{errors.content?.message}</p>
        <button
          type="submit"
          value="submit"
          className="bg-lime-600 text-white cursor-pointer"
        >
          Post
        </button>
      </form>
    </>
  );
};

export default PostForm;

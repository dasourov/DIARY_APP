import React from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signup, loading, error } = useSignup();

  const onSubmit = async (data) => {
    await signup(data.email, data.password);
    reset({ email: "", password: "" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Signup</h3>
      <input
        type="email"
        {...register("email", { required: "required field" })}
        placeholder="email"
        autoComplete="off"
      />
      <p>{errors.email?.message}</p>
      <input
        type="password"
        {...register("password", { required: "required field" })}
        placeholder="password"
        autoComplete="off"
      />
      <p>{errors.password?.message}</p>
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;

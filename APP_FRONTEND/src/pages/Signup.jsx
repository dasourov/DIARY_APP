import React from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import backgroundImage from "../assets/Background.png";

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
    <div
      className="bg-cover h-screen text-4xl font-vt323 lg:bg-center text-white flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-2 bg-[#3b205478] p-10 lg:p-[100px] md:p-[80px] rounded-lg font-arial">
          <h3 className="text-4xl mb-5">Signup</h3>
          <input
            type="email"
            {...register("email", { required: "required field" })}
            placeholder="Email"
            autoComplete="off"
            className="bg-[#3b205478] px-10 border-b-2 border-indigo-400 outline-none p-3 text-white"
          />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            {...register("password", { required: "required field" })}
            placeholder="Password"
            autoComplete="off"
            className="bg-[#3b205478] px-10 border-b-2 border-indigo-400 outline-none p-3 text-white"
          />
          <p>{errors.password?.message}</p>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#3b20545a] p-3 rounded-md hover:bg-[#3b2054b7] transition-all duration-500"
          >
            Sign Up
          </button>
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Signup;

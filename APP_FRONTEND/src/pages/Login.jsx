import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import backgroundImage from "../assets/Background.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { login, loading, error } = useLogin();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    reset({ email: "", password: "" });
  };
  return (
    <div
      className="bg-cover h-screen lg:bg-center font-vt323 text-white flex flex-col items-center justify-center text-4xl"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-2 bg-[#3b205478] p-10 lg:p-[100px] md:p-[80px] rounded-lg font-arial">
          <h3 className="text-4xl mb-5">Welcome Back</h3>

          <input
            type="email"
            {...register("email", { required: "Field is required" })}
            placeholder="Email"
            autoComplete="off"
            className="bg-[#3b205478] px-10 border-b-2 border-indigo-400 outline-none p-3 text-white"
          />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            {...register("password", { required: "Field is required" })}
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
            Log In
          </button>
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;

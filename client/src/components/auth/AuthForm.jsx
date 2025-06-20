import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { login, register } from "../../api/authAPI";
import toast from "react-hot-toast";

const AuthForm = ({ isSucces }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState(null);

  const queryClient = useQueryClient();

  const authMutation = useMutation({
    mutationFn: async ({ username, password, isSignUp }) => {
      const endpoint = isSignUp ? register : login;
      const res = await endpoint({ username, password });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setAuthError("");
      isSucces();
      queryClient.setQueryData(["authUser"], data.user);
      location.reload();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Authentication failed");
      setAuthError(error?.response?.data?.message || "Authentication failed");
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    authMutation.mutate({ username, password, isSignUp });
  };
  return (
    <form className="form px-4 py-2" onSubmit={handleOnSubmit}>
      <div className="form-control space-y-2 my-4">
        <label
          htmlFor="username"
          className="font-primary block text-base font-medium text-gray-900"
        >
          Username
        </label>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600">
          <input
            type="text"
            name="username"
            id="username"
            className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base"
            placeholder="janesmith"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="form-control space-y-2 mb-4">
        <label
          htmlFor="password"
          className="font-primary block text-base font-medium text-gray-900"
        >
          Password
        </label>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600">
          <input
            type="password"
            name="password"
            id="password"
            className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 my-2">
        <button
          type="submit"
          className="font-primary px-4 py-2 text-sm font-normal rounded-md text-white shadow-xs bg-gray-700 hover:bg-gray-800 transition-colors duration-300 mt-2 cursor-pointer"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="font-primary cursor-pointer text-red-600 text-sm">
          {authError}
        </p>
        <p
          className="font-primary underline cursor-pointer text-gray-600 text-sm"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an accout" : "Create an accout"}
        </p>
      </div>
    </form>
  );
};

export default AuthForm;

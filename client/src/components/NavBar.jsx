import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import AuthForm from "./auth/AuthForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeUser, logout } from "../api/authAPI";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { data: authUser, refetch } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await getMeUser();
      return res.data;
    },
  });

  const { mutate: authLogout } = useMutation({
    mutationFn: async () => {
      const res = await logout();
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
      queryClient.setQueryData(["authUser"], null);
      location.reload();
      refetch();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Authentication failed");
    },
  });

  return (
    <div className="w-full">
      <div className="container mx-auto flex justify-center items-center py-6">
        <div className="flex items-center space-x-12 ">
          <ul className="flex space-x-8 font-primary font-light text-lg">
            <li
              onClick={() => navigate("/")}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer duration-300 text-gray-800"
            >
              Home
            </li>
            <li
              onClick={() => {
                authUser
                  ? navigate("/", { state: { isMyRecipe: true } })
                  : setIsOpen(true);
              }}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer duration-300 text-gray-800"
            >
              My Recipe
            </li>
          </ul>

          <div onClick={() => navigate("/")}>
            <h2 className="font-primary font-light text-4xl text-gray-800 cursor-pointer">
              FOODMEAL
            </h2>
          </div>
          <ul className="flex space-x-8 font-primary font-light text-lg">
            <li
              onClick={() =>
                authUser
                  ? navigate("/", { state: { isMyFavorites: true } })
                  : setIsOpen(true)
              }
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer duration-300 text-gray-800"
            >
              Favorite
            </li>
            <li
              onClick={() => (authUser ? authLogout() : setIsOpen(true))}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer duration-300 text-gray-800"
            >
              {authUser ? "Logout" : "Login"}
            </li>
          </ul>
        </div>
      </div>
      {isOpen && (
        <>
          <Modal onClose={() => setIsOpen(false)}>
            <AuthForm
              isSucces={() => {
                setIsOpen(false), refetch();
              }}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default NavBar;

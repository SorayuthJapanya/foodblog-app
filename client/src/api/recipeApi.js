import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getRecipes = (params) => axiosInstance.get("/recipes", { params });
export const getOneRecipe = (id) => axiosInstance.get(`/recipes/${id}`);
export const putFavorite = (id) => axiosInstance.put(`/recipes/favorite/${id}`);
export const postRecipes = (data) => axiosInstance.post("/add-recipe", data);
export const putRecipes = (id, data) =>
  axiosInstance.put(`/edit-recipe/${id}`, data);
export const deleteRecipes = (id) =>
  axiosInstance.delete(`/delete-recipe/${id}`);

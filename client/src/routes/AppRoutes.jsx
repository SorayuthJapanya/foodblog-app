import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePages from "../pages/HomePages";
import AddRecipe from "../pages/AddRecipe";
import EditRecipe from "../pages/EditRecipe";
import RecipeDetail from "../pages/RecipeDetail";
import MyRecipe from "../pages/MyRecipe";
import FavoriteRecipe from "../pages/FavoriteRecipe";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/myrecipes" element={<MyRecipe />} />
          <Route path="/favrecipes" element={<FavoriteRecipe />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/editrecipe/:id" element={<EditRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;

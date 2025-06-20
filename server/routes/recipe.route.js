const express = require("express");
const router = express.Router();

const {
  getRecipes,
  getRecipesById,
  postRecipes,
  putRecipes,
  deleteRecipes,
  toggleFavorite,
} = require("../controller/recipes.controller");
const { protectAuth } = require("../middleware/protectAuth");


router.get("/recipes", getRecipes);
router.put("/recipes/favorite/:id", protectAuth, toggleFavorite);
router.get("/recipes/:id", getRecipesById);
router.post("/add-recipe",protectAuth, postRecipes);
router.put("/edit-recipe/:id",protectAuth, putRecipes);
router.delete("/delete-recipe/:id",protectAuth, deleteRecipes);

module.exports = { recipesRoutes: router };

const Recipes = require("../models/recipes.model");

exports.getRecipes = async (req, res) => {
  try {
    const { createBy, favorites } = req.query;
    const query = {};

    if (createBy) {
      query.createBy = createBy;
    }

    if (favorites) {
      query.favorites = favorites;
    }
    console.log("Query:", query);
    const recipes = await Recipes.find(query);
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in getRecipes controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);
    const recipeId = req.params.id;

    const recipe = await Recipes.findById(recipeId);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const isFav = recipe.favorites.includes(userId);

    if (isFav) {
      recipe.favorites.pull(userId);
    } else {
      recipe.favorites.push(userId);
    }

    await recipe.save();

    res.status(200).json({
      message: isFav ? "Removed from favorites" : "Added to favorites",
    });
  } catch (error) {
    console.error("Error in toggleFavorite controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

exports.getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipes.findById(id);
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error in getRecipesById controller", error);
    res.status(500).json({ message: "Internal Error " });
  }
};

exports.postRecipes = async (req, res) => {
  try {
    const { title, ingredients, instructions, time, coverImg } = req.body;
    const userId = req.user.id;

    if (
      !title ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !Array.isArray(instructions) ||
      instructions.length === 0 ||
      !time
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecipe = new Recipes({
      title,
      ingredients,
      instructions,
      time,
      coverImg,
      createBy: userId,
    });

    await newRecipe.save();

    res.status(200).json({ message: "Add recipe successfully" });
  } catch (error) {
    console.error("Error in postRecipes controller", error);
    res.status(500).json({ message: "Internal Error " });
  }
};

exports.putRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, time, coverImg } = req.body;

    console.log({ title, ingredients, instructions, time, coverImg });

    if (
      !title ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !Array.isArray(instructions) ||
      instructions.length === 0 ||
      !time
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updateRecipe = await Recipes.findByIdAndUpdate(
      id,
      {
        title,
        ingredients,
        instructions,
        time,
        coverImg,
      },
      { new: true }
    );

    if (!updateRecipe)
      return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json({ message: "Update recipe successfully" });
  } catch (error) {
    console.error("Error in putRecipes controller", error);
    res.status(500).json({ message: "Internal Error " });
  }
};

exports.deleteRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await Recipes.findByIdAndDelete(id);

    if (!deleteRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Delete recipe successfully" });
  } catch (error) {
    console.error("Error in deleteRecipes controller", error);
    res.status(500).json({ message: "Internal Error " });
  }
};

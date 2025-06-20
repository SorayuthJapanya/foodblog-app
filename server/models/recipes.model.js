const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipes", recipeSchema);

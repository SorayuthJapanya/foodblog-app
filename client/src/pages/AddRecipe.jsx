import { useMutation } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { postRecipes } from "../api/recipeApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [time, setTime] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const navigate = useNavigate()

  const { mutate: addRecipe } = useMutation({
    mutationFn: async (recipe) => {
      const response = await postRecipes(recipe);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.success || "Add Recipe Succesfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Add Recipe Failed");
    },
  });

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addInstruction = () => setInstructions([...instructions, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      title,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      instructions: instructions.filter((i) => i.trim() !== ""),
      time,
      coverImg,
    };
    // Submit logic here
    console.log(recipe);
    addRecipe(recipe);
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center w-full justify-center my-8">
        <div className="max-w-md w-full mx-auto">
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="font-primary text-3xl text-gray-800 font-normal mb-4">
              Add Recipe
            </h2>
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-md shadow-sm px-6 py-4"
            >
              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-col gap-2">
                  <label className="font-primary block text-lg font-normal text-gray-900">
                    Title
                  </label>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-400 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-primary block text-lg font-normal text-gray-900">
                    Ingredients
                  </label>
                  {ingredients.map((ingredient, idx) => (
                    <div key={idx}>
                      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-400 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600 mb-2">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) =>
                            handleIngredientChange(idx, e.target.value)
                          }
                          required
                          className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="font-primary block text-lg font-normal text-gray-600 cursor-pointer"
                  >
                    <Plus className="size-5 " />
                  </button>
                </div>
                <div>
                  <label className="font-primary block text-lg font-normal text-gray-900">
                    Instructions
                  </label>
                  {instructions.map((instruction, idx) => (
                    <div key={idx}>
                      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-400 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600 mb-2">
                        <input
                          type="text"
                          value={instruction}
                          onChange={(e) =>
                            handleInstructionChange(idx, e.target.value)
                          }
                          required
                          className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="font-primary block text-lg font-normal text-gray-600 cursor-pointer"
                  >
                    <Plus className="size-5 " />
                  </button>
                </div>
                <div>
                  <label className="font-primary block text-lg font-normal text-gray-900">
                    Time:
                  </label>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-400 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600 mb-2">
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-primary block text-lg font-normal text-gray-900">
                    Cover Image URL:
                  </label>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-400 focus-within:outline-1 focus-within:-outline-offset-2 focus-within:outline-gray-600 mb-2">
                    <input
                      type="text"
                      value={coverImg}
                      onChange={(e) => setCoverImg(e.target.value)}
                      required
                      className="font-primary w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full justify-center mt-4">
                <button
                  type="submit"
                  className="font-primary px-6 py-3 text-md font-normal rounded-md text-white shadow-xs bg-gray-700 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                >
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;

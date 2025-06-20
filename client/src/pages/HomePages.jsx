import React from "react";
import RecipeCard from "../components/RecipeCard";
import { useLocation, useNavigate } from "react-router-dom";

const HomePages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyRecipe = location.state?.isMyRecipe || false;
  const isMyFavorites = location.state?.isMyFavorites || false;

  return (
    <>
      <section className="w-full h-[80vh] bg-cover bg-no-repeat bg-center bg-[url('./assets/bg.jpg')] bg-gradient-to-b from-black/80 to-black/40 flex items-center justify-center">
        <div className="bg-white/90 rounded-lg shadow-lg p-10 flex flex-col items-center max-w-2xl">
          <h1 className="font-primary text-4xl font-meduim mb-4 text-gray-800 text-center">
            Welcome to My Food Blog
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore ad,
            beatae nesciunt earum eos debitis quasi vel architecto eveniet
            obcaecati?
          </p>
          <button
            onClick={() => navigate("/addrecipe")}
            className="px-8 py-3 bg-gray-800 text-white rounded-sm transition-all ease-in-out hover:-translate-y-1 duration-300 font-semibold cursor-pointer"
          >
            Explore Recipes
          </button>
        </div>
      </section>
      <RecipeCard isMyRecipe={isMyRecipe} isMyFavorites={isMyFavorites}/>
    </>
  );
};

export default HomePages;

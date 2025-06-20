import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import { deleteRecipes, getRecipes, putFavorite } from "../api/recipeApi";
import { AlarmClockIcon, Edit, Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RecipeCard = ({ isMyRecipe, isMyFavorites }) => {
  const [recipesData, setRecipeData] = useState([]);
  const [userId, setUserId] = useState("");
  const [favUserId, setFavUserId] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const authUser = queryClient.getQueryData(["authUser"]);

  useEffect(() => {
    if (authUser) {
      setFavUserId(authUser._id);
    }
  }, [authUser]);

  useEffect(() => {
    if (isMyRecipe) {
      const authUser = queryClient.getQueryData(["authUser"]);

      if (authUser && authUser._id) {
        setUserId(authUser._id);
      }
    } else {
      setUserId("");
    }
  }, [isMyRecipe, queryClient]);

  const {
    data: getRecipesData,
    isLoading: getRecipesDataLoading,
    isError: getRecipesDataError,
    refetch,
  } = useQuery({
    queryKey: ["getRecipe", isMyRecipe, isMyFavorites, userId, favUserId],
    queryFn: async () => {
      let params = {};
      if (isMyRecipe) {
        params.createBy = userId;
      }

      if (isMyFavorites) {
        params.favorites = favUserId;
      }

      console.log(params);
      const response = await getRecipes(params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["getRecipe"], data);
    }
  });

  const { mutate: DeleteRecipe } = useMutation({
    mutationFn: async (id) => {
      const res = await deleteRecipes(id);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Deleted recipe succesfully");
      navigate("/");
      refetch();
    },
  });

  const { mutate: FavoriteRecipe } = useMutation({
    mutationFn: async (id) => {
      const res = await putFavorite(id);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getRecipe"]);
      refetch();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something Wrong");
    },
  });

  const handleDeleteRecipe = (recipeId) => {
    DeleteRecipe(recipeId);
  };

  const handleEditRecipe = (recipeId) => {
    navigate(`/editrecipe/${recipeId}`);
  };

  const toggleFavorite = (recipeId) => {
    FavoriteRecipe(recipeId);
  };

  useEffect(() => {
    if (getRecipesData) {
      setRecipeData(getRecipesData);
    }
  }, [getRecipesData]);

  console.log(recipesData);

  if (getRecipesDataLoading) {
    return <div>Loading...</div>;
  }

  if (getRecipesDataError) {
    return <div>Error loading recipes.</div>;
  }

  return (
    <div className="card-container mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipesData &&
          recipesData.map((item, index) => (
            <div
              className="card flex flex-col gap-4 hover:bg-gray-200 px-4 py-6 duration-200"
              key={index}
            >
              <img
                src={item.coverImg}
                alt={item.title}
                className="w-full h-80 object-cover rounded-sm"
              />
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <AlarmClockIcon className="size-5 " />
                  <p>{item.time}</p>
                </div>
                <button className="cursor-pointer">
                  {isMyRecipe ? (
                    <div className="flex gap-3 items-center">
                      <Edit
                        onClick={() => handleEditRecipe(item._id)}
                        className="size-5"
                      />
                      <Trash2
                        onClick={() => handleDeleteRecipe(item._id)}
                        className="size-5"
                      />
                    </div>
                  ) : (
                    <Heart
                      onClick={() => toggleFavorite(item._id)}
                      className={`size-5 ${
                        item.favorites?.includes(favUserId)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  )}
                </button>
              </div>
              <h3 className="font-thirdary text-lg font-normal">
                {item.title}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecipeCard;

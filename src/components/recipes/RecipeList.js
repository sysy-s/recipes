import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Api";
import Recipe from "./Recipe";
import { SearchContext } from "../Context";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const {searchQuery, setSearchQuery} = useContext(SearchContext);

  function getRecipesVanilla() {
    axios.get(`${API}/recipes/all`).then((res) => {
      setRecipes(res.data);
    });
  }

  function getRecipesSearch() {
    axios.get(`${API}/recipes/all?search=${searchQuery}`).then((res) => {
      setRecipes(res.data);
    });
  }
  // magic, search bar works if this runs
  useEffect(() => {
    searchQuery ? getRecipesSearch() : getRecipesVanilla();
  }, [searchQuery]);

  return (
    <>
      {recipes &&
        recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
    </>
  );
}

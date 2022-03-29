import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Api";
import Recipe from "./Recipe";
import { SearchContext } from "../Context";
import styles from './RecipeList.module.css';

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
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            className={styles.recipe}
          />
        ))}
        {(!recipes.length || false) && <h1 className={styles.blank}>No recipes here</h1>}
    </>
  );
}

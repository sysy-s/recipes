import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Conns";
import Recipe from "./Recipe";
import { SearchContext } from "../Context";
import { TagsContext } from "../TagsContext";
import styles from "./RecipeList.module.css";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useContext(SearchContext);
  const { tagsApplied } = useContext(TagsContext);

  function getRecipes() {
    let query = "?";
    if (searchQuery) {
      query = query + "search=" + searchQuery.replace(" ", "%20");
    }

    if (tagsApplied[0] !== "") {
      tagsApplied.forEach((tag) => {
        query = query + "&tags[]=" + tag.replace(" ", "%20");
      });
    }
    axios.get(`${API}/recipes/all${query}`).then((res) => {
      setRecipes(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getRecipes();
  }, [searchQuery, tagsApplied]);

  return (
    <>
      {loading && <div className="loader">Loading...</div>}
      {!loading &&
        recipes &&
        recipes.map((recipe) => (
          <>
            <Recipe
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              image={recipe.image}
              difficulty={recipe.difficulty}
              prepTime={recipe.prepTime}
              servings={recipe.servings}
              className={styles.recipe}
            />
            <hr />
          </>
        ))}
      {!loading && (!recipes.length || false) && (
        <h1 className={styles.blank}>Sadly no recipe match your search.</h1>
      )}
    </>
  );
}

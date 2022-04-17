import { useEffect, useState } from "react";
import { API, AWS } from "../../Conns";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RecipeDetail.module.css";
import { Rating } from "react-simple-star-rating";
import { useAuth0 } from "@auth0/auth0-react";

export default function RecipeDetail() {
  const nav = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    steps: [],
    image: "",
  });
  const params = useParams();
  const { isAuthenticated } = useAuth0();

  function getRecipe() {
    axios.get(`${API}/recipes/${params.id}`).then((res) => {
      const recipe = res.data;
      setRecipe(recipe);
    });
  }

  function deleteRecipe() {
    axios
      .delete(`${API}/recipes/${params.id}`)
      .then((res) => nav("/admin"))
      .catch(() => nav("/"));
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      {recipe.title && (
        <>
          <div className={styles.imagewrapper}>
            <img
              src={`${AWS}/${recipe.image}`}
              className={styles.image}
              alt=""
            />
          </div>
          <h1>{recipe.title}</h1>
          <div className={styles.rating}>
            <p>Difficulty</p>
            <Rating readonly={true} initialValue={recipe.difficulty} />
          </div>
          <div>
            Servings: <strong>{recipe.servings}</strong>
          </div>
          <div>
            Preparation time: <strong>{recipe.prepTime}</strong>
          </div>
          <hr />
          {recipe.description && (
            <>
              <h3>Description</h3>
              <p>{recipe.description}</p>
              <hr />
            </>
          )}
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <hr />
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.substring(0, 5)}>{step}</li>
            ))}
          </ol>
          {isAuthenticated && (
          <>
            <button className={styles.delbtn} onClick={deleteRecipe}>
              Delete
            </button>
            <button
              className={styles.upbtn}
              onClick={(e) => nav(`/${params.id}/update`)}
            >
              Update
            </button>
          </>
          )}
        </>
      )}
      {!recipe.title && (
        <div>
          <h1>Nothing to see here</h1>
        </div>
      )}
    </>
  );
}

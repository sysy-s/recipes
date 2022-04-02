import { useEffect, useState } from "react";
import { API } from "../../Api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RecipeDetail.module.css";

export default function RecipeDetail(props) {
  const nav = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    steps: [],
    image: "",
  });
  const params = useParams();

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
              src={`${API}/${recipe.image}`}
              className={styles.image}
              alt=""
            />
          </div>
          <h1>{recipe.title}</h1>
          <hr />
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
          {props.admin && (
            <>
              <button className={styles.delbtn} onClick={deleteRecipe}>
                Delete
              </button>
              <button
                className={styles.upbtn}
                onClick={(e) => nav(`/admin/${params.id}/update`)}
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

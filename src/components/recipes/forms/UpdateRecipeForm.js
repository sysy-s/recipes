import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API } from "../../../Conns";
import { useNavigate, useParams } from "react-router-dom";
import { Tags } from "../../Tags";

import styles from "./NewRecipeForm.module.css";
import { Rating } from "react-simple-star-rating";

export default function NewRecipeForm() {
  const nav = useNavigate();
  const params = useParams();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const servingsRef = useRef();
  const prepRef = useRef();
  const [ingredientFields, setIngredientFields] = useState([
    { ingredient: "" },
  ]);
  const [stepFields, setStepFields] = useState([{ step: "" }]);
  const [tagFields, setTagFields] = useState([]);
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: [],
    steps: [],
    image: "",
    tags: [],
  });
  const [image, setImage] = useState();
  const [difficulty, setDifficulty] = useState(1);
  const [message, setMessage] = useState("");

  const diffChange = (diff) => {
    setDifficulty(diff / 20);
  };

  function imageChange(e) {
    setImage(e.target.files[0]);
  }

  function tagChange(index, e) {
    const data = [...tagFields];
    data[index][e.target.name] = e.target.value;
    setTagFields(data);
  }

  function addTag(e) {
    e.preventDefault();
    setTagFields([...tagFields, { tag: "" }]);
  }

  function removeTag(e) {
    e.preventDefault();
    setTagFields(tagFields.slice(0, tagFields.length - 1));
  }

  function ingredientChange(index, e) {
    const data = [...ingredientFields];
    data[index][e.target.name] = e.target.value;
    setIngredientFields(data);
  }

  function addIngredient(e) {
    e.preventDefault();
    setIngredientFields([...ingredientFields, { ingredient: "" }]);
  }

  function removeIngredient(e) {
    e.preventDefault();
    setIngredientFields(ingredientFields.slice(0, ingredientFields.length - 1));
  }

  function stepChange(e, index) {
    const data = [...stepFields];
    data[index][e.target.name] = e.target.value;
    setStepFields(data);
  }

  function addStep(e) {
    e.preventDefault();
    setStepFields([...stepFields, { step: "" }]);
  }

  function removeStep(e) {
    e.preventDefault();
    setStepFields(stepFields.slice(0, stepFields.length - 1));
  }

  function postForm(data) {
    axios({
      url: `${API}/recipes/${params.id}`,
      method: "patch",
      data: data,
      headers: { "Content-type": "multipart/form-data" },
    })
      .then((res) => {
        nav(`/${params.id}`);
      })
      .catch(() => setMessage("Invalid file type"));
  }

  function getRecipeData() {
    axios.get(`${API}/recipes/${params.id}`).then((res) => {
      const recipe = res.data;
      setRecipeData(recipe);
      setIngredientFields(
        recipe.ingredients.map((ingredient) => ({ ingredient: ingredient }))
      );
      setStepFields(recipe.steps.map((step) => ({ step: step })));
      if (recipe.tags) {
        setTagFields(recipe.tags.map((tag) => ({ tag: tag })));
      }
      setDifficulty(recipe.difficulty);
    });
  }

  function submitForm(e) {
    e.preventDefault();
    const ingredients = ingredientFields.map((field) => field.ingredient);
    const steps = stepFields.map((field) => field.step);
    const tags = tagFields.map((field) => field.tag);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const servings = servingsRef.current.value;
    const prep = prepRef.current.value;

    // creates form and fills it with fields
    let formData = new FormData();

    if (title) {
      formData.append("title", title);
    }

    if (description) {
      formData.append("description", description);
    }

    if (servings) {
      formData.append("servings", servings);
    }

    if (prep) {
      formData.append("prepTime", prep);
    }

    ingredients.forEach((ingredient) => {
      if (ingredient) {
        formData.append("ingredients", ingredient);
      }
    });

    steps.forEach((step) => {
      if (step) {
        formData.append("steps", step);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    tags.forEach((tag) => {
      if (tag) {
        formData.append("tags", tag);
      }
    });

    formData.append("difficulty", difficulty);

    postForm(formData);
  }

  useEffect(() => {
    setMessage("");
    getRecipeData();
  }, []);

  return (
    <>
      <form method="post" className={styles.recipeform}>
        <h1>Update Recipe</h1>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          ref={titleRef}
          defaultValue={recipeData.title}
        />

        <label htmlFor="description">Description (optional)</label>
        <textarea
          type="text"
          name="description"
          ref={descriptionRef}
          defaultValue={recipeData.description ? recipeData.description : ""}
        />

        <label>Servings</label>
        <input type="text" ref={servingsRef} defaultValue={recipeData.servings} />

        <label>Prep time</label>
        <input type="text" ref={prepRef} defaultValue={recipeData.prepTime} />

        <label htmlFor="ingredient">Ingredients</label>
        <div className={styles.ingredients}>
          {ingredientFields &&
            ingredientFields.map((input, index) => (
              <>
                <input
                  type="text"
                  name="ingredient"
                  key={index}
                  onChange={(e) => ingredientChange(index, e)}
                  defaultValue={input.ingredient}
                />
              </>
            ))}
        </div>
        <div>
          <button onClick={addIngredient} className={styles.addbtn}>
            +
          </button>
          {ingredientFields[1] && (
            <button onClick={removeIngredient} className={styles.removebtn}>
              -
            </button>
          )}
        </div>

        <label htmlFor="step">Steps</label>
        <div className={styles.steps}>
          {stepFields &&
            stepFields.map((input, index) => (
              <>
                <textarea
                  name="step"
                  key={index}
                  onChange={(e) => stepChange(e, index)}
                  defaultValue={input.step}
                />
              </>
            ))}
        </div>
        <div>
          <button onClick={addStep} className={styles.addbtn}>
            +
          </button>
          {stepFields[1] && (
            <button onClick={removeStep} className={styles.removebtn}>
              -
            </button>
          )}
        </div>

        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          className={styles.imageinput}
          onChange={imageChange}
        />

        <label htmlFor="difficulty">Difficulty</label>
        <Rating
          name="difficulty"
          onClick={diffChange}
          initialValue={difficulty}
        />

        <label htmlFor="tags">Tags (optional)</label>
        <div className={styles.tags}>
          {tagFields &&
            tagFields.map((input, index) => (
              <>
                <select
                  list="tags"
                  name="tag"
                  onChange={(e) => tagChange(index, e)}
                  defaultValue={input.tag}
                >
                  <option></option>
                  {Tags.map((tag) => (
                    <option>{tag}</option>
                  ))}
                </select>
              </>
            ))}
        </div>
        <div>
          <button onClick={addTag} className={styles.addbtn}>
            +
          </button>
          {tagFields[0] && (
            <button onClick={removeTag} className={styles.removebtn}>
              -
            </button>
          )}
        </div>

        <button onClick={submitForm} className={styles.submitbtn}>
          Submit
        </button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}

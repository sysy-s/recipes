import { AWS } from "../../Conns";
import styles from "./Recipe.module.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function Recipe(props) {
  const nav = useNavigate();
  function redirect() {
    return nav(`${props.id}`);
  }

  function redirectAdmin() {
    return nav(`/admin/${props.id}`);
  }

  return (
    <div
      className={styles.wrapper}
      onClick={props.admin ? redirectAdmin : redirect}
      id={props.id}
    >
      <div className={styles.imagewrapper}>
        <img
          src={`${AWS}/${props.image}`}
          className={styles.thumbnail}
          alt=""
        />
      </div>
      <div className={styles.info}>
        <div>
          <h1 className={styles.title}>{props.title}</h1>
        </div>
        <div className={styles.moreinfo}>
          <div>Preparation time: <strong>{props.prepTime}</strong></div>
          <div>Servings: <strong>{props.servings}</strong></div>
        </div>
        <div className={styles.difficulty}>
          <div>Difficulty</div>
          <br />
          <Rating readonly={true} initialValue={props.difficulty} />
        </div>
      </div>
    </div>
  );
}

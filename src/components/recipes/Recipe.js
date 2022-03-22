import { API } from "../../Api";
import styles from "./Recipe.module.css";
import { useNavigate } from "react-router-dom";

export default function Recipe(props) {
  const nav = useNavigate();
  function redirect(e) {
    return nav(`${props.id}`);
  }

  return (
    <div
      className={styles.wrapper}
      onClick={redirect}
      id={props.id}
    >
      <div className={styles.imagewrapper}>
        <img src={`${API}/${props.image}`} className={styles.thumbnail} alt='' />
      </div>
      <h1 className={styles.title}>{props.title}</h1>
      <hr />
    </div>
  );
}

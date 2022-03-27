import { API } from "../../Api";
import styles from "./Recipe.module.css";
import { useNavigate } from "react-router-dom";

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
        <img src={`${API}/${props.image}`} className={styles.thumbnail} alt='' />
      </div>
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
}

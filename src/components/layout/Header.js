import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext, useRef } from "react";
import { SearchContext } from "../Context";

export default function Header(props) {
  const nav = useNavigate();
  const searchRef = useRef();
  const { setSearchQuery } = useContext(SearchContext);

  function searchSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchRef.current.value);
    return nav("/");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Link to="/" onClick={(e) => setSearchQuery("")}>
          Logo
        </Link>
      </div>
      <div className={styles.searchbar}>
        <form>
          <input
            type="text"
            className={styles.search}
            placeholder="Search..."
            name="search"
            ref={searchRef}
          />
          <button onClick={searchSubmit} className={styles.btn}>
            Search
          </button>
        </form>
      </div>
      <div className={styles.right}>
        {props.admin && (
          <>
            {/* <div>
              <Link to="/">Dummy link</Link>
            </div> */}
            <div>
              <Link to="/admin/add">New Recipe</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

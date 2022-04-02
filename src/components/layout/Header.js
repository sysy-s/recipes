import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../Context";
import { TagsContext } from "../TagsContext";
import TagSelect from "../tags/TagSelect";
import { AnimatePresence } from "framer-motion";

export default function Header(props) {
  const nav = useNavigate();
  const [tagsVisibility, setTagsVisibility] = useState(false);
  const searchRef = useRef();
  const { setSearchQuery } = useContext(SearchContext);
  const { tagsApplied } = useContext(TagsContext);

  function searchSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchRef.current.value);
    return props.admin ? nav("/admin") : nav("/");
  }

  function showHideTags(e) {
    setTagsVisibility(!tagsVisibility);
  }

  useEffect(() => {
    setTagsVisibility(false);
  }, [tagsApplied]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Link
          to={props.admin ? "/admin" : "/"}
          onClick={(e) => setSearchQuery("")}
        >
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
        <div className={styles.tags}>
          {props.list && (
            <button className={styles.tagbtn} onClick={showHideTags}>
              {tagsVisibility ? "Cancel" : "Filter using tags"}
            </button>
          )}
          <AnimatePresence>{tagsVisibility && <TagSelect />}</AnimatePresence>
        </div>
        {props.admin && (
          <>
            <div>
              <Link to="/admin/add">New Recipe</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

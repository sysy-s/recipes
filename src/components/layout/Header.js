import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../Context";
import { TagsContext } from "../TagsContext";
import TagSelect from "../tags/TagSelect";
import { AnimatePresence } from "framer-motion";
import ReactModal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header(props) {
  const nav = useNavigate();
  const [tagsVisibility, setTagsVisibility] = useState(false);
  const searchRef = useRef();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { tagsApplied, setTagsApplied } = useContext(TagsContext);
  const { isAuthenticated } = useAuth0();

  function searchSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchRef.current.value);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return nav("/");
  }

  function showHideTags() {
    setTagsVisibility(!tagsVisibility);
  }

  useEffect(() => {
    setTagsVisibility(false);
  }, [tagsApplied]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link
            to="/"
            onClick={() => {
              setSearchQuery("");
              if (searchQuery) {
                searchRef.value = "";
              }
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            Logo
          </Link>
        </div>
        {props.list && (
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
        )}
        {props.list && !isAuthenticated && (
          <div className={styles.right}>
            <div className={styles.tags}>
              <>
                {tagsApplied[0] && (
                  <button
                    onClick={(e) => setTagsApplied([])}
                    className={`${styles.tagbtn} ${styles.clearbtn}`}
                  >
                    Clear
                  </button>
                )}
                <button className={styles.tagbtn} onClick={showHideTags}>
                  {tagsVisibility ? "Cancel" : "Filter"}
                </button>
              </>
              <AnimatePresence>
                {tagsVisibility && (
                  <ReactModal
                    isOpen={tagsVisibility}
                    onRequestClose={(e) => setTagsVisibility(false)}
                    closeTimeoutMS={200}
                    ariaHideApp={false}
                    className={styles.modal}
                  >
                    <TagSelect />
                  </ReactModal>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className={styles.right}>
            {props.list && (
              <div className={styles.tags}>
                <>
                  {tagsApplied[0] && (
                    <button
                      onClick={(e) => setTagsApplied([])}
                      className={`${styles.tagbtn} ${styles.clearbtn}`}
                    >
                      Clear
                    </button>
                  )}
                  <button className={styles.tagbtn} onClick={showHideTags}>
                    {tagsVisibility ? "Cancel" : "Filter"}
                  </button>
                </>
                <AnimatePresence>
                  {tagsVisibility && (
                    <ReactModal
                      isOpen={tagsVisibility}
                      onRequestClose={(e) => setTagsVisibility(false)}
                      closeTimeoutMS={200}
                      ariaHideApp={false}
                      className={styles.modal}
                    >
                      <TagSelect />
                    </ReactModal>
                  )}
                </AnimatePresence>
              </div>
            )}

            <>
              <div>
                <Link to="/add">New Recipe</Link>
              </div>
            </>
          </div>
        )}
      </div>

      {/* below lies the mobielwersion of the header which is modular unlike its predecessor */}
      <div className={styles.mobilelogo}>
        <div className={styles.logo}>
          <Link
            to="/"
            onClick={() => {
              setSearchQuery("");
              if (searchQuery) {
                searchRef.value = "";
              }
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            Logo
          </Link>
        </div>
      </div>
      <div className={styles.mobilesearch}>
        {props.list && (
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
        )}
        {props.list && !isAuthenticated && (
          <div className={styles.right}>
            <div className={styles.tags}>
              <>
                {tagsApplied[0] && (
                  <button
                    onClick={(e) => setTagsApplied([])}
                    className={`${styles.tagbtn} ${styles.clearbtn}`}
                  >
                    Clear
                  </button>
                )}
                <button className={styles.tagbtn} onClick={showHideTags}>
                  {tagsVisibility ? "Cancel" : "Filter"}
                </button>
              </>
              <AnimatePresence>
                {tagsVisibility && (
                  <ReactModal
                    isOpen={tagsVisibility}
                    onRequestClose={(e) => setTagsVisibility(false)}
                    closeTimeoutMS={200}
                    ariaHideApp={false}
                    className={styles.modal}
                  >
                    <TagSelect />
                  </ReactModal>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className={styles.right}>
            {props.list && (
              <div className={styles.tags}>
                <>
                  {tagsApplied[0] && (
                    <button
                      onClick={(e) => setTagsApplied([])}
                      className={`${styles.tagbtn} ${styles.clearbtn}`}
                    >
                      Clear
                    </button>
                  )}
                  <button className={styles.tagbtn} onClick={showHideTags}>
                    {tagsVisibility ? "Cancel" : "Filter"}
                  </button>
                </>
                <AnimatePresence>
                  {tagsVisibility && (
                    <ReactModal
                      isOpen={tagsVisibility}
                      onRequestClose={(e) => setTagsVisibility(false)}
                      closeTimeoutMS={200}
                      ariaHideApp={false}
                      className={styles.modal}
                    >
                      <TagSelect />
                    </ReactModal>
                  )}
                </AnimatePresence>
              </div>
            )}

            <>
              <div>
                <Link to="/add">New Recipe</Link>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
}

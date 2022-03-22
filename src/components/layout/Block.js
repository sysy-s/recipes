import styles from "./Block.module.css";

export default function Block({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

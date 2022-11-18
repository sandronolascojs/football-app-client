import styles from "./styles.module.scss";

export const Spinner = () => {
  return (
    <div className={styles.atom_spinner}>
      <div className={styles.spinner_inner}>
        <div className={styles.spinner_line}></div>
        <div className={styles.spinner_line}></div>
        <div className={styles.spinner_line}></div>
        <div className={styles.spinner_circle}>&#9679;</div>
      </div>
    </div>
  );
};

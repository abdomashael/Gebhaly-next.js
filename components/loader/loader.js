import React from "react";
import styles from "./loader.module.scss"
const Loader = () => {
  return (
    <div className={styles.loader_conatiner}>
      <span className={styles.loader1}>
        <span className={styles.loader2}></span>
      </span>
    </div>
  );
};

export default Loader
import styles from "./Message.module.scss";

const Message = ({ children }) => {
  return (
    <div className={styles.conatiner}>
      <div className={styles.msg}>{children}</div>
    </div>
  );
};

export default Message;

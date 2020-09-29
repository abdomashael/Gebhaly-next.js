import styles from "./Message.module.scss";
import { Button, Icon } from "semantic-ui-react";

const Message = ({ children ,setMsg}) => {
  return (
    <div className={styles.conatiner}>
      <div className={styles.msg}>
        <div className={styles.x_btn}>
          <Button icon color="red" size="tiny" onClick={()=>{setMsg({show:false,content:""})}} >
            <Icon name="close" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Message;

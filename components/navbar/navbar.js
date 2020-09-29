import Link from "next/link";
import { Header, Icon } from "semantic-ui-react";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../pages/_app";
import Login from "../login/login";
import Message from "../message/message";


const Navbar = () => {

  const [userMail, setUserMail] = useState("");
  const [msg, setMsg] = useState({ show: false, content: "" });

  const router = useRouter();

  const login = useContext(LoginContext);

  useEffect(()=>{
    setUserMail(login.email)
  },[login.email])

  const loginHandler =()=>{
   let message = {
      show: true,
      content: (
        <div>
          <Login isLogin={(status)=>setMsg({show:!status,content:msg.content})} />
        </div>
      ),
    };
    setMsg(message);
  }
  return (
    <div className={styles.conatiner}>
      <div>
        <Link href="/">
          <h2 className={router.pathname === "/" ? styles.active : styles.item}>
            <Icon name="home" />
            Home
          </h2>
        </Link>
      </div>

      <span className={styles.title}>Gebhaly</span>
      <div>
        {userMail === "" ? (
          <Header>
            <span onClick={loginHandler} className={styles.item}>
              <Icon name="sign in" />
              Login
            </span>
          </Header>
        ) : (
          <Link href="/cart">
            <h2
              className={
                router.pathname === "/cart" ? styles.active : styles.item
              }
            >
              <Icon name="cart" />
              Cart
            </h2>
          </Link>
        )}
      </div>
      {msg.show ? <Message setMsg={setMsg}>{msg.content}</Message> : ""}
    </div>
  );
};

export default Navbar;

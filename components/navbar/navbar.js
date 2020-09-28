import Link from "next/link";
import { Icon } from "semantic-ui-react";
import styles from "./navbar.module.scss";
import { useRouter } from 'next/router'
const Navbar = () => {

  const router = useRouter()

 

  return (
    <div className={styles.conatiner}>
      <div>
        <Link href="/">
          <h2 className={router.pathname==="/"?styles.active:styles.item}  >
            <Icon name="home" />
            Home
          </h2>
        </Link>
      </div>

      <span className={styles.title}>
        Gebhaly
      </span>
      <div>
        <Link href="/cart" >
          <h2 className={router.pathname==="/cart"?styles.active:styles.item}  >
            <Icon name="cart" />
            Cart
          </h2> 
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

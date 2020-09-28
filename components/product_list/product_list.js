import styles from "./product_list.module.scss";
import cx from "classnames";
import { useEffect, useState } from "react";
import Message from "../message/message";
import Loader from "../loader/loader";
import {
  Card,
  Button,
  Input,
  Loader as SLoader,
} from "semantic-ui-react";
import { addItemToCart } from "../../utils/api";
import Login from "../login/login";



const ProductCard = ({ product, massageHandler }) => {
  const [qty, setQty] = useState(1);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (login) {
      addItemToCartHandler();
    }
  }, [login]);

  const setIsLogin = (status) => {
    status === true ? setLogin(status) : "";
  };

  const addItemToCartHandler = async () => {
    let message = {
      show: true,
      content: (
        <div>
          <Loader />
          <span>wait...</span>
        </div>
      ),
    };
    massageHandler(message);
    try {
      let res = await addItemToCart(product._id, qty);

      switch (res) {
        case 401:
          message = {
            show: true,
            content: (
              <div>
                <Login isLogin={setIsLogin} />
              </div>
            ),
          };
          massageHandler(message);

          break;

        case 404:
          console.log("not found");
          break;
        case 409:
          message = {
            show: true,
            content: (
              <div>
                <img src="/already.png" width="25%" />
                <div>already to cart...</div>
                <br/>
                <Button onClick={()=>{
                    message = {
                      show: false,
                      content:""
                    };
                    massageHandler(message);
                  }}>
                    OK
                  </Button>
              </div>
            ),
          };
          massageHandler(message);
                    break;
        case 500:
          console.log("error");
          break;
        case 200:
          message = {
            show: true,
            content: (
              <div>
                <img src="/added.png" width="25%" />
                <div>added to cart...</div>
                <br/>

                <Button onClick={()=>{
                    message = {
                      show: false,
                      content:""
                    };
                    massageHandler(message);
                  }}>
                    OK
                  </Button>
              </div>
            ),
          };
          massageHandler(message);
          break;
        default:
          console.log(res);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card
        className={cx(styles.product)}
        image={product.pictureUri}
        header={product.name}
        meta={product.category.name}
        description={`${product.price} EGP`}
        extra={
          <Input
            className={styles.btn}
            action={{
              color: "black",
              labelPosition: "left",
              icon: "cart",
              content: "Add to cart",
              onClick: addItemToCartHandler,
            }}
            actionPosition="left"
            placeholder="qty"
            defaultValue={qty}
            onChange={(e)=>{setQty(e.target.value)}}
          />
        }
      />
    </div>
  );
};

const Product = ({ product, massageHandler }) => {
  return (
    <ProductCard product={product} massageHandler={massageHandler} />
  );
};

const ProductList = ({ products }) => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState({ show: false, content: "" });

  useEffect(() => {
    const list = products
      ? products.map((product) => (
          <Product
            product={product}
            key={product._id}
            massageHandler={setMsg}
          />
        ))
      : [];
    setList(list);
  }, [products]);
  return (
    <div>
      <div className={cx(styles.container)}>{list}</div>
      {msg.show ? <Message>{msg.content}</Message> : ""}
    </div>
  );
};

export default ProductList;

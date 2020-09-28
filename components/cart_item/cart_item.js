import { useEffect, useState } from "react";
import { Item, Image, Input, Button, Icon } from "semantic-ui-react";
import { EditCartProduct, DeleteCartProduct } from "../../utils/api";
import Loader from "../loader/loader";
import styles from "./cart.module.scss";

const types = {
  NO_OP:0,
  EDIT: 1,
  DELETE: 2,
};

const CartItem = ({ product, massageHandler, fetchCart }) => {
  const [qty, setQty] = useState(product.quantity);
  const [login, setLogin] = useState(false);
  const [editType, setEditType] = useState(types.NO_OP);

  useEffect(() => {
    if (login) {
      editCartItemHandler();
    }
  }, [login]);

  useEffect(() => {
    if(editType!==types.NO_OP) editCartItemHandler() ;
  }, [editType]);

  const setIsLogin = (status) => {
    status === true ? setLogin(status) : "";
  };

  const editCartItemHandler = async () => {
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
      let res;
      console.log(editType);
      switch (editType) {
        case types.EDIT:
          res = await EditCartProduct(product.product_id, qty);
          break;
        case types.DELETE:
          res = await DeleteCartProduct(product.product_id);
          break;

        default:
          break;
      }

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
            message = {
              show: false,
              content: "",
            };
            massageHandler(message);message = {
              show: true,
              content: (
                <div>
                  <img src="/already.png" width="25%" />
                  <div>Missing this product try another one ...</div>
                  <br />
                  <Button
                    onClick={() => {
                      message = {
                        show: false,
                        content: "",
                      };
                      massageHandler(message);
                    }}
                  >
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
            fetchCart();
            message = {
              show: true,
              content: (
                <div>
                  <img src="/added.png" width="25%" />
                  <div>added to cart...</div>
                  <br />
                  <Button
                    onClick={() => {
                      message = {
                        show: false,
                        content: "",
                      };
                      massageHandler(message);
                    }}
                  >
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
    <Item>
      <Item.Image size="small" src={product.pictureUri} />

      <Item.Content className={styles.info_conatiner}>
        <Item.Header className={styles.info_header} as="div">
          <span>{product.product_name}</span>
          <Button
            animated="vertical"
            size="tiny"
            color="red"
            className={styles.del_btn}
            onClick={() => {
              setEditType(types.DELETE);
            }}
          >
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name="delete" />
            </Button.Content>
          </Button>
        </Item.Header>
        <Item.Description>{product.unit_price + " EGP"}</Item.Description>
        <Item.Extra>
          <Input
            action={{
              color: "black",
              labelPosition: "left",
              icon: "cart",
              content: "Save",
              onClick: () => {
                setEditType(types.EDIT);
              },
            }}
            actionPosition="left"
            placeholder="qty"
            defaultValue={qty}
            onChange={(e) => {
              console.log(e.target.value);
              setQty(e.target.value);
            }}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default CartItem;

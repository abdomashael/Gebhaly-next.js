import Head from "next/head";
import { useEffect, useState } from "react";
import { Item, Image, Button, Icon, Label } from "semantic-ui-react";
import CartItem from "../../components/cart_item/cart_item";
import Layout from "../../components/layout/layout";
import Loader from "../../components/loader/loader";
import Message from "../../components/message/message";
import { GetUserCart, CheckoutCart } from "../../utils/api";

import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [msg, setMsg] = useState({ show: false, content: "" });
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisit, setIsVisit] = useState(false);

  useEffect(() => {
      fetchCart();
      
  }, []);

  const fetchCart = async () => {
    try {
      const res = await GetUserCart();
      res.data.items.length === 0 ? setIsEmpty(true) : setCart(res.data.items);
      setPrice(res.data.total_price);
    } catch (error) {
      switch (error.response.status) {
        case 404:
          setIsEmpty(true);
          break;

          case 401:
            setIsVisit(true);
            break;
  
        default:
          break;
      }
    }
  };

  const checkoutHandler = async () => {
    try {
      await CheckoutCart();
      await fetchCart();
      setPrice(0)
      let message = {
        show: true,
        content: (
          <div>
            <img src="/added.png" width="25%" />
            <div>Checkout success...</div>
            <br />
            <Button
              onClick={() => {
                message = {
                  show: false,
                  content: "",
                };
                setMsg(message);
              }}
            >
              OK
            </Button>
          </div>
        ),
      };
      setMsg(message);
    } catch (error) {
      let message = {
        show: true,
        content: (
          <div>
            <FontAwesomeIcon icon={faSadTear} size="xs" />
            <div>something wronge happen please try again...</div>
            <br />
            <Button
              onClick={() => {
                message = {
                  show: false,
                  content: "",
                };
                setMsg(message);
              }}
            >
              OK
            </Button>
          </div>
        ),
      };
      setMsg(message);
    }
  };

  return (
    <div>
      <Head>
        <title>Gebhaly | Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <Label as="div" color="blue" size="massive" ribbon>
            Your cart
          </Label>
          {isEmpty ||isVisit ? (
            <Label color="red" size="massive">
              {isEmpty? "Cart is Empty!!!!":"Login to show your cart."}
            </Label>
          ) : (
            <Item.Group divided>
              {cart.length===0 ? (
                <Loader />
              ) : (
                cart.map((item, idx) => {
                  return (
                    <CartItem
                      product={item}
                      massageHandler={setMsg}
                      fetchCart={fetchCart}
                      key={idx}
                    />
                  );
                })
              )}
            </Item.Group>
          )}
          <br />
          <br />
          <br />
          <div style={{ display: "flex", "justify-content": "flex-end" }}>
            <Button
              disabled={isEmpty || cart.length === 0}
              size="massive"
              as="div"
              labelPosition="right"
            >
              <Button color="facebook" onClick={checkoutHandler}>
                <Icon name="money" />
                Checkout
              </Button>
              <Label as="a" basic pointing="left">
                {`${price} EGP`}
              </Label>
            </Button>
          </div>
        </div>

        {msg.show ? <Message setMsg={setMsg}>{msg.content}</Message> : ""}
      </Layout>
    </div>
  );
}

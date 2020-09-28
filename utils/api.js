const { default: Axios } = require("axios");
import Cookies from "universal-cookie";
Axios.defaults.withCredentials = true;

const URL = process.env.API_URL;

const fecthPage = async (pageNo) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const res = await fetch(`${URL}/product?page=${pageNo}`, requestOptions);
  const products = await res.json();
  return products;
};

const addItemToCart = async (id, qty) => {
  let myHeaders = new Headers();
  myHeaders.append("jwt", localStorage.getItem("jwt"));

  let config = {
    method: "post",
    url: `${URL}/cart?product_id=${id}&qty=${qty}`,
    headers: { jwt: localStorage.getItem("jwt") },
  };

  try {
    let res = await Axios(config);
    return res.status;
  } catch (error) {
    console.log("error", error);
    return error.response.status;
  }
};

const EditCartProduct= async(id,qty)=>{
  var config = {
    method: 'put',
    url: `${URL}/cart?product_id=${id}&qty=${qty}`,
    headers: { jwt: localStorage.getItem("jwt") },
  };
  
    let res = await Axios(config);
    return res.status;
  
  
}

const DeleteCartProduct= async(id)=>{
  var config = {
    method: 'delete',
    url: `${URL}/cart/${id}`,
    headers: { jwt: localStorage.getItem("jwt") },
  };
    
  
  let res = await Axios(config);
    return res.status;
  
  
}


const getUserCart = async()=>{
  var config = {
    method: 'get',
    url: `${URL}/cart`,
    headers: { jwt: localStorage.getItem("jwt") },
  };
  
    let res = await Axios(config);
    return res;
   
  
}


const CheckoutCart= async()=>{
  var config = {
    method: 'post',
    url: `${URL}/cart/checkout`,
    headers: { jwt: localStorage.getItem("jwt") },
  };
    
  
  let res = await Axios(config);
    return res.status;
  
}



const login = async (mail, pass) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({ email: mail, password: pass });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    withCredentials: true,
  };

  let res = await fetch(`${URL}/auth/login`, requestOptions);

  let body = await res.json();
  localStorage.setItem("jwt", body.token);
  // Axios.defaults.headers.jwt = body.token
  //   cookies.set('JWT', await body.token, { path: '/' });

  return await res.status;
};


module.exports = { fecthPage, addItemToCart,getUserCart,EditCartProduct,DeleteCartProduct,CheckoutCart,login };

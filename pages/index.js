import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../components/layout/layout";
import ProductList from "../components/product_list/product_list";
import styles from "../styles/Home.module.scss";
import { fecthPage } from "../utils/api";

const Home = ({ products }) => {
  const [currentProducts,setCurrentProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageProducts, setNextPageProducts] = useState([]);
  const [show,setShow] = useState(true)
 
  useEffect(() => {
    getNextPage()
  }, [currentPage]);

  const loadPageHandler=()=>{
    setCurrentProducts([...products,...nextPageProducts])
    setCurrentPage(currentPage+1)
  }

  const getNextPage= async()=>{
    const res= await fecthPage(currentPage + 1)
    setNextPageProducts(res)
    if (res.length===0) {
      setShow(false)
    }
  }
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Gebhaly | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <ProductList products={currentProducts} />
        <br/>
        <Button disabled={! show} fluid  color="black" onClick={loadPageHandler}>
          Show More
        </Button>
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts

  const products = await fecthPage(1);

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  };
}

export default Home;

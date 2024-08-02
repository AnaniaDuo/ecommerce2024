import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Products from "./Products";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import axios from "axios";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;
  // set states
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // load all products
  useEffect(() => {
    async function fetchAllProducts() {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      setDisplayedProducts(data);
    }
    fetchAllProducts();
  }, []);

  return (
    <div className="mt-8 ">
      <div className="flex items-center justify-center ">
        <Filter
          products={products}
          setDisplayedProducts={setDisplayedProducts}
        />

        <SearchBar
          products={products}
          setDisplayedProducts={setDisplayedProducts}
        />
      </div>

      <Products displayedProducts={displayedProducts} />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Home);

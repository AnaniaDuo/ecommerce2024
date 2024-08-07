import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Products from "./Products";
import SearchBar from "./SearchBar";
import AdminProducts from "./AdminProducts";
import Filter from "./Filter";
import axios from "axios";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { isAdmin } = props;
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

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-center gap-2">
        <Filter
          products={products}
          setDisplayedProducts={setDisplayedProducts}
        />

        <SearchBar
          products={products}
          setDisplayedProducts={setDisplayedProducts}
        />
      </div>

      {!isAdmin ? (
        <Products displayedProducts={displayedProducts} />
      ) : (
        <AdminProducts
          displayedProducts={displayedProducts}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(Home);

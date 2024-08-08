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
  const [loading, setLoading] = useState(false);

  // load all products
  useEffect(() => {
    setLoading(true);
    async function fetchAllProducts() {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      setDisplayedProducts(data);
    }
    fetchAllProducts();
    setLoading(false);
  }, []);

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  if (loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        Loading...
      </div>
    );
  return (
    <div className="mt-2">
      <div className="flex items-center justify-center gap-2 mt-4 mb-2">
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

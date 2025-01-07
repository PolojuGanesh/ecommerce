import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

import EachProductCard from "../EachProductCard";
import Navbar from "../Navbar";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Products = () => {
  const [homeData, setHomeData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [selectOrder, setOrder] = useState("");

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress);
    const getHomeData = async () => {
      const url = `https://fakestoreapi.com/products?sort=${selectOrder}`;
      const options = {
        method: "GET",
      };
      const response = await fetch(url, options);
      if (response.ok) {
        setApiStatus(apiStatusConstants.success);
        const data = await response.json();
        setHomeData(data);
      } else {
        setApiStatus(apiStatusConstants.failure);
        console.log("Error occurred");
      }
    };

    getHomeData();
  }, [selectOrder]);

  const selectSorting = (event) => {
    setOrder(event.target.value);
  };

  const renderAllProducts = () => {
    return (
      <ul className="ul-container-for-all-products">
        {homeData.map((eachProduct) => (
          <EachProductCard key={eachProduct.id} eachProduct={eachProduct} />
        ))}
      </ul>
    );
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderSwitchCase = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderAllProducts();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="home-main-container">
      <Navbar />
      <div className="home-sub-container">
        <div className="heading-and-filter-container">
          <h1 className="main-heading">All Products</h1>
          <select onChange={selectSorting} className="select-element">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div className="render-products-container">{renderSwitchCase()}</div>
      </div>
    </div>
  );
};

export default Products;

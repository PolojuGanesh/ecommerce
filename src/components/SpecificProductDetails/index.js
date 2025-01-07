import { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Navbar from "../Navbar";
import CartContext from "../../context/CartContext";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const SpecificProductDetails = () => {
  const { id } = useParams();
  const [specificProduct, setSpecificProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress);
    const getSpecificProductData = async () => {
      const url = `https://fakestoreapi.com/products/${id}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(url, options);

      if (response.ok) {
        setApiStatus(apiStatusConstants.success);
        const data = await response.json();
        setSpecificProduct(data);
      } else {
        setApiStatus(apiStatusConstants.failure);
        console.log("Error occurred");
      }
    };

    getSpecificProductData();
  }, [id]);

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderSuccessView = () => {
    const { title, description, price, image, rating } = specificProduct;
    return (
      <CartContext.Consumer>
        {(value) => {
          const { addCartItem } = value;
          const onClickAddToCart = () => {
            addCartItem({ ...specificProduct, quantity });
          };
          return (
            <div className="product-details-success-view">
              <div className="product-details-container">
                <img src={image} alt="product" className="product-image" />
                <div className="product">
                  <h1 className="product-name">{title}</h1>
                  <p className="price-details">Rs {price}/-</p>
                  <div className="rating-and-reviews-count">
                    <div className="rating-container">
                      <p className="rating">{rating ? rating.rate : "N/A"}</p>
                      <FaRegStar className="star" />
                    </div>
                  </div>
                  <p className="product-description">{description}</p>
                  <hr className="horizontal-line" />
                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={onDecrementQuantity}
                      data-testid="minus"
                    >
                      <BsDashSquare className="quantity-controller-icon" />
                    </button>
                    <p className="quantity">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={onIncrementQuantity}
                      data-testid="plus"
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="button add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  };

  const renderLoadingView = () => (
    <div className="products-details-loader-container">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const renderSwitchCase = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="spe-main-container">
      <Navbar />
      <div className="product-item-details-container">{renderSwitchCase()}</div>
    </div>
  );
};

export default SpecificProductDetails;

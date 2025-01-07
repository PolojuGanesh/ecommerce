import { useNavigate } from "react-router-dom";
import CartSummary from "../CartSummary";
import Navbar from "../Navbar";
import CartListView from "../CartListView";

import CartContext from "../../context/CartContext";

import "./index.css";

const Cart = () => {
  const navigate = useNavigate();

  const noItemAddedShopNow = () => {
    navigate("/products");
  };

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList, removeAllCartItems } = value;
        const clickOnRemoveAllCartItems = () => {
          removeAllCartItems();
        };
        const showEmptyView = cartList.length === 0;
        const onRenderRemoveAllButton = () => (
          <>
            {showEmptyView ? null : (
              <div className="remove-all-button-container">
                <button
                  data-testid="remove"
                  onClick={clickOnRemoveAllCartItems}
                  className="remove-all-button"
                >
                  Remove All
                </button>
              </div>
            )}
          </>
        );

        return (
          <>
            <Navbar />
            <div className="cart-container">
              {showEmptyView ? (
                <div className="cart-empty-view-container">
                  <p className="cart-empty-heading">Your Cart is Empty</p>
                  <button onClick={noItemAddedShopNow} className="shop-now-btn">
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  {onRenderRemoveAllButton()}
                  <CartListView />
                  <CartSummary />
                </div>
              )}
            </div>
          </>
        );
      }}
    </CartContext.Consumer>
  );
};
export default Cart;

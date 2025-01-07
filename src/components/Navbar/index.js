import { FaShoppingCart, FaHome, FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";

import "./index.css";

const Navbar = () => {
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const cartItemsCount = cartList.length;

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        );
      }}
    </CartContext.Consumer>
  );

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/" className="nav-link">
            <img
              className="website-logo"
              src="img/logo.png"
              alt="website logo"
            />
          </Link>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/" className="nav-link">
            <span className="fake-store-text">FakeStore</span>
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <FaHome className="mobile-nav-icons" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <FaProductHunt className="mobile-nav-icons" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <FaShoppingCart className="mobile-nav-icons" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

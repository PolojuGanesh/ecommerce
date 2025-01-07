import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Products from "./components/Products";
import SpecificProductDetails from "./components/SpecificProductDetails";
import Home from "./components/Home";
import Cart from "./components/Cart";
import CartContext from "./context/CartContext";

import "./App.css";

const App = () => {
  const [cartList, setCartList] = useState([]);

  const addCartItem = (product) => {
    const productObject = cartList.find(
      (eachItem) => eachItem.id === product.id
    );

    if (productObject) {
      setCartList((prevCartList) =>
        prevCartList.map((eachItem) => {
          if (eachItem.id === product.id) {
            const updatedQuantity = eachItem.quantity + product.quantity;
            return { ...eachItem, quantity: updatedQuantity };
          }
          return eachItem;
        })
      );
    } else {
      setCartList((prevCartList) => [...prevCartList, product]);
    }
  };

  const removeCartItem = (id) => {
    setCartList((prevState) =>
      prevState.filter((eachItem) => eachItem.id !== id)
    );
  };

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevState) =>
      prevState.map((eachItem) => {
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity + 1;
          return { ...eachItem, quantity: updatedQuantity };
        }
        return eachItem;
      })
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevState) =>
      prevState.map((eachItem) => {
        if (eachItem.id === id) {
          const updatedQuantity =
            eachItem.quantity > 1 ? eachItem.quantity - 1 : 1;
          return { ...eachItem, quantity: updatedQuantity };
        }
        return eachItem;
      })
    );
  };
  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route
            exact
            path="/products/:id"
            element={<SpecificProductDetails />}
          />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
};

export default App;

import { Link } from "react-router-dom";
import Navbar from "../Navbar";

import "./index.css";

const Home = () => (
  <div className="home-one">
    <Navbar />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          Discover the Ultimate Shopping Experience!
        </h1>
        <img
          src="img/logo.png"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Step into a world where style meets comfort and quality meets
          affordability. Whether you're on the hunt for the latest fashion
          trends, trendy accessories, or must-have gadgets, we’ve got it all!
          Explore a wide variety of products, handpicked to elevate your
          lifestyle. With exclusive deals, free shipping, and easy returns,
          shopping has never been so rewarding. Don’t miss out—treat yourself to
          something special today, because you deserve it! Shop now and make
          every purchase a delightful experience.
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        src="img/logo.png"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </div>
);

export default Home;

import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

import "./index.css";

const EachProductCard = (props) => {
  const { eachProduct } = props;
  const { title, image, price, id } = eachProduct;

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <div>
          <img src={image} alt="product" className="thumbnail" />
          <h1 className="title">{title}</h1>
        </div>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{eachProduct.rating.rate}</p>
            <FaRegStar className="star" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default EachProductCard;

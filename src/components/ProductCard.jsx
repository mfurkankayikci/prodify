import { useDispatch } from "react-redux";
import { addItem } from "../store/shoppingCardSlice";
import { Link } from "react-router-dom";
import AddShoppingIcon from "../assets/svg/AddShopping.jsx";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded duration-500 hover:scale-105 h-max hover:shadow-xl overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-[100px] min-h-[100px] object-cover"
        />
        <div className="px-4 pt-3">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {product.brand}
          </span>
          <p className="text-md font-bold text-black truncate block capitalize">
            {product.name}
          </p>
        </div>
      </Link>

      <div className="flex items-center px-4 pb-3">
        <p className="text-md font-semibold text-black cursor-auto my-3">
          {product.price}₺
        </p>

        <div className="ml-auto">
          <button onClick={handleAddToCart} className="py-2 px-4 rounded">
            <AddShoppingIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

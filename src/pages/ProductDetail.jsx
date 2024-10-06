import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { setBrands, setModels } from "../store/filtersSlice";
import { addItem } from "../store/shoppingCardSlice";
import Loader from "../components/Loader";
import { capitalize, removeDuplicateValues } from "../utils";
import AddShoppingIcon from "../assets/svg/AddShopping.jsx";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.productSlice);
  const [product, setProduct] = useState(null);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()).then((action) => {
        const products = action.payload;

        const models = products.map((product) => ({
          label: capitalize(product.model),
          value: product.model,
          checked: false,
        }));

        const brands = action.payload.map((product) => {
          return {
            label: capitalize(product.brand),
            value: product.brand,
            checked: false,
          };
        });

        dispatch(setBrands(removeDuplicateValues(brands)));
        dispatch(setModels(removeDuplicateValues(models)));
      });
    }

    const foundProduct = products.find((prod) => prod.id === id);
    setProduct(foundProduct);
  }, [id, products, dispatch]);

  if (!product) return <Loader />;

  return (
    <div className="shadow-md rounded p-4 mt-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mt-4"
      />
      <div className="flex justify-between items-center flex-wrap gap-2 mt-4">
        <div className="flex items-center  gap-2">
          <div className="bg-blue-500 p-2 rounded text-white text-xs w-fit cursor-default">
            <strong>Brand:</strong> {product.brand}
          </div>
          <div className="bg-blue-500 p-2 rounded text-white text-xs w-fit cursor-default">
            <strong>Model:</strong> {product.model}
          </div>
        </div>

        <div>
          <div className="flex items-center  gap-2">
            <p className="text-xl font-bold">{product.price} ₺</p>
            <button onClick={handleAddToCart} className="py-2 px-4 rounded">
              <AddShoppingIcon />
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm mt-4">{product.description}</p>
    </div>
  );
};

export default ProductDetail;

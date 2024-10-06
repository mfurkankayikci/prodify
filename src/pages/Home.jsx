import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { setBrands, setModels, getAllFilters } from "../store/filtersSlice";
import Pagination from "../components/Pagination";
import ProductsList from "../components/ProductsList";
import Loader from "../components/Loader";
import {
  getFilteredProducts,
  capitalize,
  removeDuplicateValues,
} from "../utils";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productSlice);
  const filters = useSelector(getAllFilters);

  const filteredProducts = getFilteredProducts(products, filters);

  useEffect(() => {
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
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsList products={currentProducts} />
          <Pagination
            totalProducts={filteredProducts.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;

import ProductCard from "./ProductCard";
import SortFilters from "./SortFilters";
import BrandFilter from "./BrandFilter";
import ModelFilter from "./ModelFilter";

const ProductsList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 py-8">
      <div className="col-span-1">
        <SortFilters />
        <BrandFilter />
        <ModelFilter />
      </div>
      <div className="col-span-3 grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;

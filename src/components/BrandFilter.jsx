import { useDispatch, useSelector } from "react-redux";
import { setBrands } from "../store/filtersSlice";

const BrandFilter = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.filtersSlice);

  const handleBrandChange = (event) => {
    const updatedBrands = brands.map((brand) => {
      if (brand.value === event.target.value) {
        return { ...brand, checked: event.target.checked };
      }
      return brand;
    });

    dispatch(setBrands(updatedBrands));
  };

  return (
    <div className=" bg-blue-600 border border-gray-200 shadow-md rounded p-4 mb-8">
      <h4 className="text-white font-semibold text-sm mb-1">Brands:</h4>
      <hr />
      <div className="flex flex-col gap-2 mt-2 max-h-[120px] overflow-y-auto">
        {brands.map((brand, index) => (
          <label
            className="flex items-center cursor-pointer text-xs text-white"
            key={index}
          >
            <input
              type="checkbox"
              value={brand.value}
              checked={brand.checked}
              onChange={handleBrandChange}
              className="mr-2"
            />
            {brand.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;

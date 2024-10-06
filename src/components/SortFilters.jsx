import { useDispatch, useSelector } from "react-redux";
import { setOrderBy } from "../store/filtersSlice";

const SortFilters = () => {
  const dispatch = useDispatch();
  const { orderBy } = useSelector((state) => state.filtersSlice);

  const sortItems = [
    {
      label: "New to old",
      value: "new-to-old",
    },
    {
      label: "Old to new",
      value: "old-to-new",
    },
    {
      label: "Price high to low",
      value: "high-to-low",
    },
    {
      label: "Price low to high",
      value: "low-to-high",
    },
  ];

  const handleSortChange = (event) => {
    dispatch(setOrderBy(event.target.value));
  };

  return (
    <div className=" bg-blue-600 border border-gray-200 shadow-md rounded p-4 mb-8">
      <h4 className="text-white font-semibold text-sm mb-1">Sort By:</h4>
      <hr />
      <div className="flex flex-col gap-2 mt-2">
        {sortItems.map((sortItem, index) => (
          <label
            className="flex items-center cursor-pointer text-xs text-white"
            key={index}
          >
            <input
              type="radio"
              value={sortItem.value}
              checked={orderBy === sortItem.value}
              onChange={handleSortChange}
              className="mr-2"
            />
            {sortItem.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SortFilters;

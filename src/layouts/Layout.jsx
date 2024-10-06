import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { setSearchTerm } from "../store/filtersSlice";
import { setIsVisible } from "../store/shoppingCardSlice";

import ShoppingCard from "../components/ShoppingCard.jsx";
import ShoppingIcon from "../assets/svg/Shopping.jsx";
import SearchIcon from "../assets/svg/Search.jsx";

function Layout() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.filtersSlice);
  const { isVisible } = useSelector((state) => state.shoppingCardSlice);
  const { items: shoppingItems } = useSelector(
    (state) => state.shoppingCardSlice
  );

  const totalAmount = shoppingItems
    .reduce((total, { price, quantity }) => total + price * quantity, 0)
    .toFixed(2);

  return (
    <>
      <header className=" bg-blue-600 py-4 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link to={`/`}>
                <div className="logo text-2xl text-white font-bold">
                  Prodify
                </div>
              </Link>

              <div className="relative flex items-center">
                <SearchIcon />
                <input
                  type="name"
                  name="search"
                  className="text-sm w-full max-w-[180px] md:max-w-[100%] cursor-text rounded-md border border-gray-100 bg-gray-100 py-2 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                />
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 bg-blue-500 p-2 rounded"
              onClick={() => dispatch(setIsVisible(!isVisible))}
            >
              <ShoppingIcon />

              <span className="text-sm text-white font-bold cursor-default pointer-events-none">
                {totalAmount} ₺
              </span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="container container-2xl mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div
              className={
                isVisible
                  ? "col-span-1 md:col-span-9"
                  : "col-span-1 md:col-span-12"
              }
            >
              <Outlet />
            </div>

            {isVisible && <ShoppingCard />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;

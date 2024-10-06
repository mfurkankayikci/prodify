import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../store/shoppingCardSlice";
import TrashIcon from "../assets/svg/Trash.jsx";

const CartSummary = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.shoppingCardSlice);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="col-span-1 md:col-span-3 py-8">
      <div className="bg-white border border-gray-200 shadow-md rounded p-4">
        <h2 className="font-semibold text-lg mb-1">Shopping List</h2>
        <hr />
        <div className="mt-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <h3 className="text-sm text-blue-600  font-semibold">
                  {item.name}
                </h3>
                <p className="text-xs">
                  {item.price}₺ x {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  className="mr-2"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  className="ml-2"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeItem(item))}
                  className="ml-4 text-red-500"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold">
            <span>Summary:</span>
            <span>{totalAmount.toFixed(2)}₺</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

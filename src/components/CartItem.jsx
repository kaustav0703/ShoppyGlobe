import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem, decrementQuantity } from "../redux/cartSlice";
import { useEffect } from "react";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart.value);

  useEffect(()=>{
    console.log(cart);
  }, [cart]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 border rounded-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Product Image and Meta Details Block */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.name || item.title}
          className="w-16 h-16 object-cover rounded-md bg-slate-100 dark:bg-slate-800"
        />
        <div>
          <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
            {item.name || item.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Unit Price: ₹{item.price}
          </p>
        </div>
      </div>

      {/* Quantity Selector, Pricing, and Delete Block */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
        {/* Quantity Increment/Decrement Adjuster */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
          <button
            onClick={() => dispatch(decrementQuantity(item.id))}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
            aria-label="Decrease quantity"
          >
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>

          <span className="px-3 font-medium text-sm text-slate-800 dark:text-slate-100 min-w-6 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => dispatch(addItem(item.id))}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
            aria-label="Increase quantity"
          >
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {/* Total Price For This Item */}
        <p className="font-semibold text-lg min-w-17.5 text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>

        {/* Delete Vector Icon Button */}
        <button
          onClick={() => dispatch(removeItem(item.id))}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

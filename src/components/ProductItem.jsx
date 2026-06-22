import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom"; 
import shoppingCartItemIcon from "../assets/images/shopping-cart-item.png";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // FIX 2: Initialize navigation hook

  const cartItem = useSelector((state) =>
    state.cart.value.find((item) => item.id === product.id),
  );
  const numItems = cartItem ? cartItem.quantity : 0;

  function handleIncrement() {
    dispatch(addItem(product));
  }

  function handleDecrement() {
    dispatch(removeItem(product.id));
  }

  // FIX 3: Clean navigation trigger that completely avoids overlapping HTML elements
  function handleCardClick() {
    // ⚠️ DOUBLE CHECK: Change this string to match whatever path you wrote in AppRoutes.jsx 
    // Is it "/product-detail/" or "/product-details/"? Make sure they match exactly!
    navigate(`product-detail/${product.id}`); 
  }

  return (
    <li 
      onClick={handleCardClick} // FIX 4: The whole card acts as an active clickable link block now
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
        <img
          src={product.image}
          alt={`Image of ${product.name}`}
          className="h-full w-full object-contain p-4 object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {product.category}
          </span>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1 text-sm font-medium text-amber-500">
          <span>⭐️</span>
          <span className="text-slate-600 dark:text-slate-400">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Bottom Button Drawer controls explicitly isolated */}
      <div className="border-t border-slate-100 p-4 dark:border-slate-800">
        <div className="flex w-full items-center justify-between gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800/50">
          {numItems === 0 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // FIX 5: Completely stops the navigate event from running on card clicks
                handleIncrement();
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-md bg-slate-200/60 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              <img
                src={shoppingCartItemIcon}
                alt=""
                className="h-4 w-4 object-contain"
              />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex w-full items-center justify-between px-1 py-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // FIX 5: Prevent event bubbling
                  handleDecrement();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-base font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                -
              </button>
              
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200" onClick={(e) => e.stopPropagation()}>
                {numItems}
              </span>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // FIX 5: Prevent event bubbling
                  handleIncrement();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-base font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

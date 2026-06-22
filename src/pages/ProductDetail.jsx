import { useParams } from "react-router-dom"; // ✅ FIXED: Changed from "react-router"
import { products } from "../constants/products";
import shoppingCartItem from "../assets/images/shopping-cart-item.png";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decrementQuantity } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // ✅ FIXED: Type-safe lookup checking both strings and numbers cleanly
  const product = products.find((p) => String(p.id) === String(id));

  // Pull the current quantity safely and directly from the single source of truth (Redux)
  const cartItem = useSelector((state) =>
    state.cart.value.find((item) => String(item.id) === String(id)),
  );
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  // Render 404 message block if product id doesn't match entries
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center text-lg font-medium text-slate-500 dark:text-slate-400">
          Product not found. (ID: {id})
        </div>
      </div>
    );
  }

  function handleQuantityIncrement() {
    dispatch(addItem(product));
  }

  function handleQuantityDecrement() {
    dispatch(decrementQuantity(product.id));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Column 1: Image Frame Container */}
          <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <img
              src={product.image || product.thumbnail} // Fallback to thumbnail if image parameter varies
              alt={product.name || product.title}
              className="max-h-80 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Column 2: Specification Data Sheets */}
          <div className="flex flex-col justify-center">
            <span className="self-start rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              {product.category}
            </span>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {product.name || product.title}
            </h1>

            {product.rating && (
              <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-amber-500">
                <span>⭐️</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {Number(product.rating).toFixed(1)}
                </span>
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                ₹{Number(product.price || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Interactive Control Block Row */}
            <div className="mt-8 max-w-xs">
              {currentQuantity === 0 ? (
                <button
                  type="button"
                  onClick={handleQuantityIncrement}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 cursor-pointer"
                >
                  <img
                    src={shoppingCartItem}
                    alt=""
                    className="h-4 w-4 brightness-0 invert"
                  />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={handleQuantityDecrement}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {currentQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleQuantityIncrement}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

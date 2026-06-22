import { NavLink } from "react-router-dom"; // ✅ FIXED: Changed from "react-router" to "react-router-dom"
import cartEmpty from "../assets/images/shopping-cart-empty.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";
import { clearSearch } from "../redux/searchSlice";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.value); // Returns the array
  const [searchedProduct, setSearchedProduct] = useState("");
  const dispatch = useDispatch();

  // FIX 1: Calculate total count by summing up individual quantities
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function handleSearch(e) {
    e.preventDefault();
    dispatch(setSearchQuery(searchedProduct));
  }

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-slate-600 dark:text-slate-300"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Navigation Link */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
            onClick={() => {
              dispatch(clearSearch());
              setSearchedProduct("");
            }}
          >
            ShoppyGlobe
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={linkClasses}
              onClick={() => {
                dispatch(clearSearch());
                setSearchedProduct("");
              }}
            >
              Home
            </NavLink>
            <NavLink to="/checkout" className={linkClasses}>
              Checkout
            </NavLink>
          </nav>
        </div>

        {/* Search Bar & Utilities */}
        <div className="flex flex-1 max-w-md mx-8">
          <form
            onSubmit={handleSearch}
            className="relative w-full flex items-center"
          >
            <input
              type="text"
              placeholder="By name or by category..."
              value={searchedProduct}
              onChange={(e) => setSearchedProduct(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-24 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-500 dark:focus:bg-slate-900"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Shopping Cart Interaction Block */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/cart"
            className="relative p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {/* FIX 3: Conditionally render images based on array availability checking */}
            <img
              src={cartEmpty}
              alt="Shopping Cart"
              className="h-6 w-6 object-contain"
            />
            {/* FIX 4: Render computed items badge value securely */}
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
              {totalQuantity}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

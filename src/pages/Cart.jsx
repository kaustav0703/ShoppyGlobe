import { useSelector, useDispatch } from "react-redux";
import {emptyCart} from '../redux/cartSlice';
import CartItem from "../components/CartItem";

export default function Cart() {
  // 1. Read directly from Redux (Single Source of Truth)
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  // 2. Calculate grand total directly on every render
  const grandTotal = cartItems.reduce((accumulator, item) => {
    // Multiply item price by its quantity, handling potential missing data safely
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    return accumulator + itemPrice * itemQuantity;
  }, 0); // Correctly placement of the initial value 0

  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl bg-white p-6 shadow-sm rounded-lg dark:bg-slate-900 text-slate-900 dark:text-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <button className="text-sm text-blue-600 hover:underline dark:text-blue-400 cursor-pointer" onClick={()=>dispatch(emptyCart())}>
            Deselect all items
          </button>
        </div>
        <hr className="border-slate-200 dark:border-slate-800 mb-6" />

        {/* Cart Items List */}
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Total Summary Section */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-lg font-semibold">Grand Total:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            Your cart is empty.
          </div>
        )}
      </div>
    </main>
  );
}

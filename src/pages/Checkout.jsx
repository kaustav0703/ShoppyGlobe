import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  // Calculate grand total directly on every render
  const grandTotal = cartItems.reduce((accumulator, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    return accumulator + itemPrice * itemQuantity;
  }, 0);

  const handleOrderSubmission = (e) => {
    e.preventDefault();

    if (grandTotal === 0) {
      alert("Please add some items to the cart");
    } else {
      // These actions now ONLY run if there are items in the cart
      alert("Order placed");
    }
    dispatch(emptyCart());
    window.location.replace("/");
  };

  return (
    <>
      <div className="checkout-page-wrapper p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
        {/* REQ: Entire layout wrapped in a functional submission form */}
        <form onSubmit={handleOrderSubmission} className="mx-auto max-w-4xl">
          {/* Section: Dummy Form User Details */}
          <div className="bg-white dark:bg-slate-900 p-6 shadow-sm rounded-lg mb-6 text-slate-900 dark:text-white">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <div className="flex flex-col space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  className="w-full p-2 border border-slate-300 rounded dark:bg-slate-800 dark:border-slate-700"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Id
                </label>
                <input
                  className="w-full p-2 border border-slate-300 rounded dark:bg-slate-800 dark:border-slate-700"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  className="w-full p-2 border border-slate-300 rounded dark:bg-slate-800 dark:border-slate-700"
                  type="text"
                  placeholder="123 Main St, City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Info (Card Number)
                </label>
                <input
                  className="w-full p-2 border border-slate-300 rounded dark:bg-slate-800 dark:border-slate-700"
                  type="text"
                  placeholder="1800-900-0202"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Cart Summary Details */}
          <div className="bg-white p-6 shadow-sm rounded-lg dark:bg-slate-900 text-slate-900 dark:text-white">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Order Summary</h1>
              {cartItems.length > 0 && (
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
                  onClick={() => dispatch(emptyCart())}
                >
                  Deselect all items
                </button>
              )}
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
                Your cart is empty. Add items before placing an order.
              </div>
            )}
          </div>

          {/* Action Footer: Submit Form */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

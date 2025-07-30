import React, { useEffect, useState } from "react";
import axios from "axios";

function Checkout() {
  // State to hold cart items from localStorage
  const [cartItems, setCartItems] = useState([]);
  // State to hold full product data after fetching from API
  const [products, setProducts] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // Get saved cart items on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  // Fetch product data from API for each cart item
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = cartItems.map((item) =>
          axios.get(`https://fakestoreapi.com/products/${item.id}`)
        );
        const responses = await Promise.all(promises);
        const productData = responses.map((res, index) => ({
          ...res.data,
          quantity: cartItems[index].quantity,
        }));
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  // Calculate total cost
  const total = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 mt-20">
        {/* LEFT SIDE - FORM */}
        <div className="space-y-10 border-r border-gray-300 pr-8">
          {/* Contact Section */}
          <div>
            <div className="flex items-center justify-between mb-4 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Contact</h2>
              <a
                href="#"
                className="text-blue-500 text-sm font-semibold underline hover:text-blue-700"
              >
                Log in
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Email or mobile phone number"
                className="w-full border border-blue-500 px-4 py-2 rounded-md focus:outline-none focus:border-blue-700"
              />
            </div>
            <label className="flex items-center mt-2 text-sm text-gray-600">
              <input type="checkbox" />
              <span className="ml-2">Email me with news and offers</span>
            </label>
          </div>

          {/* Delivery Section */}
          <div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery</h2>
              <div className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 bg-white">
                <p className="text-gray-400 text-sm">Country/Region</p>
                <p className="text-gray-800 font-medium">United States</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name (optional)"
                className="border border-gray-300 px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 px-4 py-2 rounded-md mt-4"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full border border-gray-300 px-4 py-2 rounded-md mt-4"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="Postal code (optional)"
                className="border border-gray-300 px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
            <label className="flex items-center mt-4 text-sm text-gray-600">
              <input type="checkbox" />
              <span className="ml-2">Save this information for next time</span>
            </label>
          </div>

          {/* Shipping Method Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping method</h2>
            <div className="w-full flex items-center justify-between px-4 py-2 rounded-md mb-6 bg-blue-50 border border-blue-600">
              <span>Standard</span>
              <span className="font-semibold text-black">FREE</span>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment</h2>
            <p className="text-xs text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>
            <div className="flex flex-col items-center justify-center mb-4 border border-gray-100 bg-gray-50 p-4 rounded">
              {/* Payment SVG Icon */}
              <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                <mask id="mask0_50_2246" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="1" y="29" width="47" height="28">
                  <path d="M44.0936 29.1082H5.33098C3.29177 29.1082 1.63867 30.7613 1.63867 32.8005V52.3278C1.63867 54.3671 3.29177 56.0202 5.33098 56.0202H44.0936C46.1329 56.0202 47.786 54.3671 47.786 52.3278V32.8005C47.786 30.7613 46.1329 29.1082 44.0936 29.1082Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_50_2246)">
                  <path d="M44.0936 29.1082H5.33098C3.29177 29.1082 1.63867 30.7613 1.63867 32.8005V52.3278C1.63867 54.3671 3.29177 56.0202 5.33098 56.0202H44.0936C46.1329 56.0202 47.786 54.3671 47.786 52.3278V32.8005C47.786 30.7613 46.1329 29.1082 44.0936 29.1082Z" fill="#FAFAFA" stroke="#B3B3B3" strokeWidth="3.28205"/>
                </g>
                <mask id="mask1_50_2246" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="6" y="24" width="47" height="28">
                  <path d="M48.4647 24.7537H9.70207C7.66287 24.7537 6.00977 26.4068 6.00977 28.446V47.9734C6.00977 50.0126 7.66287 51.6657 9.70207 51.6657H48.4647C50.5039 51.6657 52.157 50.0126 52.157 47.9734V28.446C52.157 26.4068 50.5039 24.7537 48.4647 24.7537Z" fill="white"/>
                </mask>
                <g mask="url(#mask1_50_2246)">
                  <path d="M48.4647 24.7537H9.70207C7.66287 24.7537 6.00977 26.4068 6.00977 28.446V47.9734C6.00977 50.0126 7.66287 51.6657 9.70207 51.6657H48.4647C50.5039 51.6657 52.157 50.0126 52.157 47.9734V28.446C52.157 26.4068 50.5039 24.7537 48.4647 24.7537Z" fill="#FAFAFA" stroke="#B3B3B3" strokeWidth="3.28205"/>
                </g>
                <mask id="mask2_50_2246" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="21" y="30" width="17" height="17">
                  <path d="M29.2379 46.4153C33.7509 46.4153 37.4094 42.7575 37.4094 38.2454C37.4094 33.7333 33.7509 30.0756 29.2379 30.0756C24.7249 30.0756 21.0664 33.7333 21.0664 38.2454C21.0664 42.7575 24.7249 46.4153 29.2379 46.4153Z" fill="white"/>
                </mask>
                <g mask="url(#mask2_50_2246)">
                  <path d="M29.2379 46.4153C33.7509 46.4153 37.4094 42.7575 37.4094 38.2454C37.4094 33.7333 33.7509 30.0756 29.2379 30.0756C24.7249 30.0756 21.0664 33.7333 21.0664 38.2454C21.0664 42.7575 24.7249 46.4153 29.2379 46.4153Z" stroke="#B3B3B3" strokeWidth="3.28205"/>
                </g>
                <path d="M51.4547 35.1758C57.3884 35.1758 62.1985 30.3657 62.1985 24.432C62.1985 18.4984 57.3884 13.6882 51.4547 13.6882C45.5211 13.6882 40.7109 18.4984 40.7109 24.432C40.7109 30.3657 45.5211 35.1758 51.4547 35.1758Z" fill="#FAFAFA" stroke="#B3B3B3" strokeWidth="1.64103"/>
                <path d="M51.4551 17.5249V26.8459" stroke="#B3B3B3" strokeWidth="1.64103"/>
                <path d="M51.4012 31.3382C52.037 31.3382 52.5524 30.8228 52.5524 30.1871C52.5524 29.5513 52.037 29.0359 51.4012 29.0359C50.7654 29.0359 50.25 29.5513 50.25 30.1871C50.25 30.8228 50.7654 31.3382 51.4012 31.3382Z" fill="#B3B3B3"/>
              </svg>
    
              <p className="text-gray-500 text-center">
                This store can't accept payments right now.
              </p>
            </div>
            <button
              className="w-full py-2 border border-gray-100 bg-gray-50 text-gray-500 rounded font-semibold cursor-not-allowed"
              disabled
            >
              Pay now
            </button>
          </div>

          {/* Privacy Policy Link */}
          <div className="text-xs mt-6 text-blue-500 hover:text-blue-700 underline cursor-pointer">
            Privacy policy
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 mb-6 mt-8">
              {/* Product image with vertical shadows only */}
              <div
                className="relative border border-gray-200 p-4 rounded-md"
                style={{
                  boxShadow:
                    "inset 0 5px 5px -4px rgba(0, 0, 0, 0.15), inset 0 -5px 5px -4px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-contain rounded-md"
                />
                {/* Quantity badge */}
                <div className="absolute top-[-8px] right-[-8px] bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {product.quantity}
                </div>
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-800">{product.title}</p>
              </div>
              <p className="font-semibold text-sm text-gray-800">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          {/* Summary totals */}
          <div className="pt-6 space-y-2 text-sm">
            <div className="flex justify-between mb-2">
              <span className="flex items-center">
                Subtotal
                <span className="relative inline-block ml-1">
                  <span className="absolute top-1/2 left-0 transform -translate-y-1/2 text-[8px] leading-none">•</span>
                </span>
                <span className="ml-2">{products.length} items</span>
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="font-semibold text-black">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-5">
              <span>Total</span>
              <span>
                <span className=" text-sm text-gray-500">USD</span> ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Including $2.46 in taxes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
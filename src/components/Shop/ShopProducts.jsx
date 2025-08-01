import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import ProductsModal from "./ProductsModal";

const ShopProducts = ({ products = [] }) => {
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("basket_qty");
    let initial = {};
    if (saved) {
      try {
        initial = JSON.parse(saved);
      } catch {
        initial = {};
      }
    }
    const next = { ...initial };
    for (const p of products) {
      if (typeof next[p.id] !== "number" || next[p.id] < 1) {
        next[p.id] = 1;
      }
    }
    setQuantities(next);
  }, [products]);

  useEffect(() => {
    if (Object.keys(quantities).length) {
      localStorage.setItem("basket_qty", JSON.stringify(quantities));
    }
  }, [quantities]);

  const goToPage = (page) => {
    const safe = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(safe);
    setSearchParams({ page: String(safe) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeQty = (id, delta, max = 99) => {
    setQuantities((prev) => {
      const currentQty = prev[id] ?? 1;
      const newQty = Math.min(Math.max(1, currentQty + delta), max);
      const stored = localStorage.getItem("basket_qty");
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[id] = newQty;
      localStorage.setItem("basket_qty", JSON.stringify(parsed));

      return { ...prev, [id]: newQty };
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-100"}
      >
        <FaStar />
      </span>
    ));
  };

  return (
    <div className="mb-8 sm:mb-12 border-1 border-gray-200 rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0">
        {products.map((product) => {
          const qty = quantities[product.id] ?? 1;
          const unit = Number(
            product.discount ? product.finalPrice : product.price
          );
          const subTotal = (unit * qty).toFixed(2);
          return (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
              className="cursor-pointer bg-white border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="h-30 sm:h-48 mb-5 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[200px] md:h-[100%]max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.discount}%
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between flex-grow relative">
                <h3
                  className={`text-xs sm:text-sm md:text-md font-medium tracking-normal  text-gray-800 ${
                    product.title.length > 28 ? "mb-2 sm:mb-2" : " mb-6 sm:mb-7"
                  }`}
                >
                  {product.title.length > 40
                    ? product.title.substring(0, 40) + "..."
                    : product.title}
                </h3>
                <p
                  className={`text-xs font-semibold uppercase text-green-600 mb-4 tracking-tight`}
                >
                  {product.inStock ? "In Stock" : "Out Of Stock"}
                </p>
                <div className="flex justify-start items-center text-xs mb-2">
                  <div className="flex mr-2">
                    {renderStars(product.rating?.rate ?? 0)}
                  </div>
                  <span className="text-gray-500 text-xs font-semibold">
                    1 review
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {product.discount ? (
                    <>
                      <span className="line-through text-gray-400 text-sm">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-red-500 font-semibold text-xl/[27px]">
                        ${product.finalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-800 font-semibold text-xl/[27px]">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="rounded-full flex justify-between items-center overflow-hidden">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeQty(product.id, -1);
                    }}
                    disabled={qty <= 1}
                    className="inline-block border-t border-b text-2xl font-bold bg-gray-300 px-3 py-0 disabled:opacity-30 "
                  >
                    -
                  </button>
                  <span className="text-xl border-t border-b w-[100%]  text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeQty(product.id, +1);
                    }}
                    className="inline-block border-t border-b text-2xl font-bold bg-yellow-300 px-3 py-0"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && selectedProduct && (
        <ProductsModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          pro={products}
          changeQty={changeQty}
          quantity={quantities[selectedProduct.id] ?? 1}
          setSelectedProduct={setSelectedProduct}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
export default ShopProducts;

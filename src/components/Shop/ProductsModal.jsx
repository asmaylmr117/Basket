import { useState, useRef, useEffect ,useContext} from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { BsHandbag } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineTags } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext";

const ProductsModal = ({
  product,
  onClose,
  pro = [],
  changeQty,
  quantity = {},
  setSelectedProduct,
  setIsModalOpen,
}) => {
  if (!product) return null;

  const related = pro.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const images =
    product.extraImages?.length > 0
      ? [product.image, ...product.extraImages]
      : [product.image, product.image, product.image];

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const changeImage = (directionType) => {
    if (directionType === "next") {
      setDirection(1);
      setMainImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setDirection(-1);
      setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [related]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 250;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const { addToCart } = useContext(CartContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto top-0">
      <div className="bg-white w-full max-w-xl lg:max-w-5xl rounded-lg shadow-lg relative p-6 mt-[800px] sm:mt-[700px] lg:mt-[400px]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 z-20"
          onClick={onClose}
        >
          <IoClose />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row gap-6 pt-5">
          {/* Left: Images */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1">
              {images.map((img, idx) => (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-16 h-14 object-contain border rounded cursor-pointer ${
                    idx === mainImageIndex
                      ? "border-gray-800"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    const newDirection = idx > mainImageIndex ? 1 : -1;
                    setDirection(newDirection);
                    requestAnimationFrame(() => {
                      setMainImageIndex(idx);
                    });
                  }}
                />
              ))}
            </div>

            {/* Main Image with slide animation */}
            <div className="relative w-full flex flex-1 justify-center items-center bg-gray-100 rounded h-[300px] overflow-hidden order-1">
              <div className="relative w-full h-full overflow-hidden">
                <motion.div
                  key={mainImageIndex}
                  initial={{ x: direction > 0 ? "100%" : "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: direction > 0 ? "-100%" : "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={images[mainImageIndex]}
                    alt="main"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => changeImage("prev")}
                className="absolute left-2 text-xl p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <IoIosArrowBack />
              </button>
              <button
                onClick={() => changeImage("next")}
                className="absolute right-2 text-xl p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium text-gray-800 mb-2">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                {product.discount ? (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-black font-bold text-xl">
                      ${product.finalPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-green-600 font-bold text-xl">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-gray-400">
                  Available in:
                </label>
                <ul className="text-sm flex gap-2">
                  <li className="border rounded px-3 py-2 font-medium lowercase">
                    Small
                  </li>
                  <li className="border rounded px-3 py-2 font-medium lowercase">
                    Medium
                  </li>
                  <li className="border rounded px-3 py-2 font-medium lowercase">
                    Large
                  </li>
                </ul>
              </div>

              <div className="flex justify-evenly items-center bg-gray-300 py-2 px-6 mt-5">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeQty(product.id, -1);
                  }}
                  disabled={quantity <= 1}
                  className="inline-block text-2xl px-3 py-0 disabled:opacity-30 font-semibold"
                >
                  <FiMinus />
                </button>
                <span className="text-2xl text-center font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeQty(product.id, +1);
                  }}
                  className="inline-block text-2xl px-3 py-0"
                >
                  <FaPlus />
                </button>
              </div>

              <div
                className="flex justify-center gap-3 items-center bg-teal-500 text-white py-3 px-6 mt-5 hover:bg-teal-600 transition cursor-pointer"
                onClick={() => addToCart(product, quantity)}
              >
                <BsHandbag className="text-xl" />
                <p className="text-sm font-semibold">Add To Cart</p>
              </div>

              <div className="flex justify-between text-sm text-gray-500 gap-2 mt-4">
                <div className="flex justify-center items-center border gap-2 px-3 py-3 w-[50%] hover:underline cursor-pointer">
                  <FaRegHeart className="text-lg" />
                  <button className="font-semibold text-sm">Wishlist</button>
                </div>

                <div className="flex justify-center items-center border gap-2 px-3 py-3 w-[50%] hover:underline cursor-pointer">
                  <RiShareForwardLine className="text-lg" />
                  <button className="font-semibold text-sm">Share</button>
                </div>
              </div>

              <div className="flex justify-start items-center mt-6 text-gray-800">
                <AiOutlineTags className="text-2xl text-gray-300" />
                <span>Tags : </span>
                <div className="flex">
                  {product.tags.map((item) => (
                    <span
                      key={item}
                      className="inline-block border mx-2 py-1 px-2 capitalize rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-sm mb-3">Product Details</h3>
                <p className="text-gray-600 mb-3 text-sm font-normal">
                  {product.description.length > 300
                    ? product.description.slice(0, 150) + "... Read More"
                    : product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-10 relative">
          <h3 className="text-xl font-bold mb-4">Related Products</h3>
          {related.length === 0 ? (
            <p className="text-gray-500 text-sm">No related products found.</p>
          ) : (
            <div className="flex items-center justify-center">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`shadow rounded-full p-2 transition text-xl ${
                  !canScrollLeft
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <IoIosArrowBack />
              </button>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 pb-2 scroll-smooth"
              >
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    className="min-w-[200px] bg-white border rounded shadow-md p-3 hover:shadow-xl transition cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(rel);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="relative mb-7">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="h-28 object-contain mx-auto"
                      />
                      <p className="p-2 bg-teal-500 inline-block absolute bottom-[-20px] right-0 rounded-full">
                        <FaPlus className="text-white" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {rel.discount ? (
                        <>
                          <span className="text-black font-semibold text-sm">
                            ${rel.finalPrice}
                          </span>
                          <span className="line-through text-gray-400 text-xs">
                            ${rel.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-black font-semibold text-sm">
                          ${rel.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-normal">
                      {rel.title.length > 40
                        ? rel.title.slice(0, 40) + "..."
                        : rel.title}
                    </h4>
                    <span
                      className={`inline-block text-gray-500 font-normal text-sm ${
                        rel.title.length > 20 ? "mt-3" : "mt-8"
                      }`}
                    >
                      1 item
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`text-xl shadow rounded-full p-2 transition ${
                  !canScrollRight
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <IoIosArrowForward />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;

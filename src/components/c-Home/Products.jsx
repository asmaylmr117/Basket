import { useEffect, useState ,useContext} from 'react';
import { motion } from 'framer-motion';
 import ProductsModal from '../Shop/ProductsModal'; 
 import { Link } from 'react-router-dom';

// Mock Link component for demo

const Products = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State للمودال
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  const getProductsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) return 6;
      if (window.innerWidth >= 1280) return 5;
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 6;
  };

  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  useEffect(() => {
    const handleResize = () => {
      const newProductsPerPage = getProductsPerPage();
      setProductsPerPage(newProductsPerPage);
      setCurrentIndex(prev => {
        const maxIndex = Math.max(0, allProducts.length - newProductsPerPage);
        return Math.min(prev, maxIndex);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allProducts.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // استخدام fetch بدلاً من axios
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        
        // تحويل البيانات لتتوافق مع المودال
        const productsData = data.map(product => ({
          ...product,
          // إضافة خصائص إضافية إذا كانت مطلوبة للمودال
          tags: product.category ? [product.category] : [],
          extraImages: [], // يمكنك إضافة صور إضافية هنا إذا توفرت
          discount: false, // يمكنك إضافة منطق الخصم هنا
          finalPrice: product.price
        }));
        
        setTopProducts(productsData.slice(0, 5));
        setAllProducts(productsData);
        
        // تهيئة الكميات
        const initialQuantities = {};
        productsData.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
        
      } catch (error) {
        console.error('Error fetching data:', error);

        // بيانات احتياطية
        const fallbackData = [
          { 
            id: 1, 
            title: "Fjallraven - Foldsack No. 1 Backpack", 
            price: 109.95, 
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", 
            rating: { rate: 3.9, count: 120 },
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            tags: ["men's clothing", "backpack"],
            extraImages: [],
            discount: false,
            finalPrice: 109.95
          },
          { 
            id: 2, 
            title: "Mens Casual Premium Slim Fit T-Shirts", 
            price: 22.3, 
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", 
            rating: { rate: 4.1, count: 259 },
            category: "men's clothing",
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
            tags: ["men's clothing", "t-shirt"],
            extraImages: [],
            discount: false,
            finalPrice: 22.3
          },
          { 
            id: 3, 
            title: "Mens Cotton Jacket", 
            price: 55.99, 
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", 
            rating: { rate: 4.7, count: 500 },
            category: "men's clothing",
            description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
            tags: ["men's clothing", "jacket"],
            extraImages: [],
            discount: false,
            finalPrice: 55.99
          },
          { 
            id: 4, 
            title: "Mens Casual Slim Fit", 
            price: 15.99, 
            image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", 
            rating: { rate: 2.1, count: 430 },
            category: "men's clothing",
            description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
            tags: ["men's clothing", "casual"],
            extraImages: [],
            discount: false,
            finalPrice: 15.99
          },
          { 
            id: 5, 
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon", 
            price: 695, 
            image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", 
            rating: { rate: 4.6, count: 400 },
            category: "jewelery",
            description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            tags: ["jewelery", "necklace"],
            extraImages: [],
            discount: false,
            finalPrice: 695
          },
        ];
        
        setTopProducts(fallbackData);
        setAllProducts(fallbackData);
        
        const initialQuantities = {};
        fallbackData.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      }
    };

    fetchData();
  }, []);

  // دالة فتح المودال
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // دالة إغلاق المودال
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // دالة تغيير الكمية
  const changeQty = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const nextProducts = () => {
    const maxIndex = allProducts.length - productsPerPage;
    if (currentIndex < maxIndex) {
      setCurrentIndex(Math.min(currentIndex + productsPerPage, maxIndex));
    }
  };

  const prevProducts = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - productsPerPage, 0));
    }
  };

  const visibleProducts = allProducts.slice(currentIndex, currentIndex + productsPerPage);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentPage = Math.floor(currentIndex / productsPerPage);

  // Example percentages for top products
  const topProductPercentages = [25, 30, 20, 20, 25];

  return (
    <div className="container mx-auto p-2 sm:p-4 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Our Products</h1>

      {/* Section 1: Top 5 Products */}
      <div className="mb-8 sm:mb-12 border-2 border-red-400">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {topProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl p-2 sm:p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="h-32 sm:h-48 mb-2 sm:mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {topProductPercentages[index]}%
                </div>
              </div>
              <div className="flex-grow flex flex-col">
                <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-800 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-tight">
                  {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
                </h3>
                <p className="text-sm sm:text-xl font-bold text-green-600 mb-1 sm:mb-2">${product.price}</p>
                <div className="flex justify-center items-center text-xs mb-2">
                  <div className="flex mr-1 sm:mr-2">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-gray-600 text-xs">
                    {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${topProductPercentages[index]}%` }}
                  ></div>
                </div>
                <div className="text-gray-600 text-xs text-center">the available products: 86</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 2: Marketing Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 sm:p-6 flex items-center justify-between overflow-hidden shadow-lg min-h-[200px] sm:min-h-[280px] bg-cover bg-center"
          style={{ backgroundImage: "url('./img/photo2.jpg')" }}
        >
          <div className="z-10 flex-1">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">The shoes products</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">A family place for products</p>
            <br />
            <Link
              to="/shop"
              className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors duration-300 w-full sm:w-auto"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4 sm:p-6 flex items-center justify-between overflow-hidden shadow-lg min-h-[200px] sm:min-h-[280px] bg-cover bg-center"
          style={{ backgroundImage: "url('./img/photo3.jpg')" }}
        >
          <div className="z-10 flex-1">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">The boot products</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">A different kind of products store</p>
            <br />
            <Link
              to="/shop"
              className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors duration-300 w-full sm:w-auto"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
        </motion.div>
      </div>

      {/* Section 3: All Products with Navigation */}
      <div className="mb-6 sm:mb-8">
        <div className="relative">
          <button
            onClick={prevProducts}
            disabled={currentIndex === 0}
            className={`hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-110'
              }`}
            style={{ marginLeft: '-15px' }}
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="px-0 sm:px-8 lg:px-10">
            <div className={`grid gap-3 sm:gap-4 ${productsPerPage === 1 ? 'grid-cols-1' :
                productsPerPage === 2 ? 'grid-cols-2' :
                  productsPerPage === 3 ? 'grid-cols-3' :
                    productsPerPage === 4 ? 'grid-cols-4' :
                      productsPerPage === 5 ? 'grid-cols-5' :
                        'grid-cols-6'
              }`}>
              {visibleProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white border border-gray-200 rounded-xl p-2 sm:p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="h-32 sm:h-40 mb-2 sm:mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-800 line-clamp-2 sm:line-clamp-3 min-h-[2rem] sm:min-h-[3rem] leading-tight">
                      {product.title.length > 35 ? product.title.substring(0, 35) + '...' : product.title}
                    </h3>
                    <p className="text-sm sm:text-lg font-bold text-green-600 mt-auto">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextProducts}
            disabled={currentIndex + productsPerPage >= allProducts.length}
            className={`hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${currentIndex + productsPerPage >= allProducts.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-110'
              }`}
            style={{ marginRight: '-15px' }}
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
  
        <div className="flex sm:hidden justify-between items-center mt-4 px-4">
          <button
            onClick={prevProducts}
            disabled={currentIndex === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <span className="text-sm text-gray-600">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={nextProducts}
            disabled={currentIndex + productsPerPage >= allProducts.length}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${currentIndex + productsPerPage >= allProducts.length
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
          >
            Next
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {allProducts.length > productsPerPage && totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
            {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => {
              const actualIndex = totalPages > 10 && index >= 5 ? totalPages - 10 + index : index;
              return (
                <button
                  key={actualIndex}
                  onClick={() => setCurrentIndex(actualIndex * productsPerPage)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentPage === actualIndex
                      ? 'bg-gray-800 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {topProducts.length === 0 && (
        <div className="flex justify-center items-center h-32 sm:h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

    
       {isModalOpen && selectedProduct && (
        <ProductsModal
          product={selectedProduct}
          onClose={handleCloseModal}
          pro={allProducts}
          changeQty={changeQty}
          quantity={quantities[selectedProduct.id] || 1}
          setSelectedProduct={setSelectedProduct}
          setIsModalOpen={setIsModalOpen}
        />
      )} 
    </div>
  );
};

export default Products;
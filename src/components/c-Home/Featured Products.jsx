import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تحديد عدد المنتجات حسب حجم الشاشة
  const getProductsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // شاشة صغيرة
      if (window.innerWidth < 768) return 2; // شاشة متوسطة صغيرة
      if (window.innerWidth < 1024) return 3; // شاشة متوسطة
      return 5; // شاشة كبيرة
    }
    return 5;
  };

  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  // تحديث عدد المنتجات عند تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(getProductsPerPage());
      setCurrentIndex(0); // إعادة تعيين الفهرس عند تغيير الحجم
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // بيانات ثابتة للأسعار والخصومات
  const productDiscounts = {
    5: { discount: 30, originalPrice: 109.95 },
    6: { discount: 24, originalPrice: 168.00 },
    7: { discount: 15, originalPrice: 9.99 },
    8: { discount: 10, originalPrice: 56.99 },
    9: { discount: 19, originalPrice: 64.00 },
    10: { discount: 25, originalPrice: 10.99 },
    11: { discount: 20, originalPrice: 109.95 },
    12: { discount: 18, originalPrice: 114.00 },
    13: { discount: 22, originalPrice: 599.00 },
    14: { discount: 12, originalPrice: 999.99 },
    15: { discount: 35, originalPrice: 56.99 },
    16: { discount: 28, originalPrice: 29.95 },
    17: { discount: 16, originalPrice: 39.99 },
    18: { discount: 33, originalPrice: 9.85 },
    19: { discount: 14, originalPrice: 7.95 },
    20: { discount: 26, originalPrice: 12.99 }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        // أخذ المنتجات من بعد المنتج رقم 4 (index 4)
        const filteredProducts = data.slice(4);
        setProducts(filteredProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (currentIndex + productsPerPage < products.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - productsPerPage));
    }
  };

  const getProductPricing = (productId) => {
    const pricing = productDiscounts[productId] || { discount: 20, originalPrice: 29.99 };
    const discountedPrice = (pricing.originalPrice * (1 - pricing.discount / 100)).toFixed(2);
    return {
      discount: pricing.discount,
      originalPrice: pricing.originalPrice.toFixed(2),
      discountedPrice
    };
  };

  const truncateTitle = (title, maxLength = 35) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-center items-center h-32 sm:h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center text-red-600 text-sm sm:text-base">{error}</div>
      </div>
    );
  }

  const currentProducts = products.slice(currentIndex, currentIndex + productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">FEATURED PRODUCTS</h2>
          <p className="text-sm sm:text-base text-gray-600">Great find for friends and for the end of March.</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-2 bg-white rounded-full text-gray-600 hover:text-gray-800 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200 sm:px-4 sm:py-1.5 sm:text-sm"
        >
          View All
        </Link>
      </div>

      {/* Products Container */}
      <div className="relative">
        {/* Navigation Arrows - تظهر في جميع الشاشات */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          style={{ left: '-10px' }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex + productsPerPage >= products.length}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 ${
            currentIndex + productsPerPage >= products.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          style={{ right: '-10px' }}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
        </button>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {currentProducts.map((product, index) => {
            const pricing = getProductPricing(product.id);
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                {/* Discount Badge */}
                <div className="relative">
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-teal-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm font-medium z-10">
                    {pricing.discount}%
                  </div>
                  
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-3 sm:p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm leading-tight">
                    {truncateTitle(product.title, productsPerPage === 1 ? 50 : 35)}
                  </h3>
                  
                  {/* Stock Status */}
                  <p className="text-xs text-green-600 font-medium mb-1 sm:mb-2">IN STOCK</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(product.rating?.rate || 4)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1 sm:ml-2">1 review</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-gray-400 line-through text-xs sm:text-sm">
                        ${pricing.originalPrice}
                      </span>
                      <span className="text-red-600 font-bold text-sm sm:text-lg">
                        ${pricing.discountedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded transition-colors duration-200 text-xs sm:text-sm">
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="mt-8 sm:mt-12 bg-pink-100 rounded-lg p-4 sm:p-6 text-center">
        <h3 className="text-red-500 font-bold text-sm sm:text-lg tracking-wide">
          SAVE AN EXTRA 5-10% ON EVERY AUTOSHIP ORDER!
        </h3>
      </div>

      {/* Blog Articles Section */}
      <div className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Article 1 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
                alt="Grocery bottles"
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                product
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                But I must explain to you how all this mistaken idea
              </h3>
              <p className="text-sm text-gray-500">
                Jan 13 2025
              </p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
                alt="Coffee and typography"
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
               product
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                The Problem With Typefaces on the Web
              </h3>
              <p className="text-sm text-gray-500">
                Jan 13 2025
              </p>
            </div>
          </div>

          {/* Article 3 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
                alt="Colorful popsicle"
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
               product
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                English screen  With remote
              </h3>
              <p className="text-sm text-gray-500">
                Jan 13 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
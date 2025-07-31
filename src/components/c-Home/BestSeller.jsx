import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        // Select products (index 4-11)
        const selectedProducts = data.slice(4, 12);
        setProducts(selectedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const getDiscountLabel = (index) => {
    const discounts = ['25%', '20%', '15%', '30%', '10%', '35%', '18%', '12%'];
    return discounts[index % discounts.length];
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'LED products',
      subtitle: ' leading brand ',
      backgroundImage: 'url(https://www.pacific-research.com/wp-content/uploads/2020/04/shutterstock_251380513-1536x864.jpg)',
    },
    {
      title: 'Taste the Best',
      subtitle: 'Shine the morning',
      backgroundImage: 'url(https://www.thepackagingcompany.com/knowledge-sharing/wp-content/uploads/2020/09/5-Packaging-Tips-for-Selling-Products-Online-e1599060089773-1026x675.jpg)',
    },
    {
      title: 'Best the bag',
      subtitle: 'Bags Product Photography',
      backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/65a01343d4e0b521531eda0a/1704989563809-0TRDY2BNK4NWERBDLGAL/Large+scale+product+photography)',
    },
  ];

  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  // Animation variants for products
  const productVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Center image animation
  const centerImageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">BEST SELLERS</h2>
          <p className="text-gray-600">Items with the seal of quality</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-2 bg-white rounded-full text-gray-600 hover:text-gray-800 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200 sm:px-4 sm:py-1.5 sm:text-sm"
        >
          View All
        </Link>
      </motion.div>

      {/* Products Layout with Animation */}
      <motion.div 
        className="flex flex-col lg:flex-row items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* First 4 Products - 2x2 Grid */}
        <motion.div 
          className="grid grid-cols-2 flex-1 h-fit"
          variants={containerVariants}
        >
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-60 border-2 border-gray-200 hover:border-teal-300"
              variants={productVariants}
              custom={index}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain p-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-2 left-2 bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  {getDiscountLabel(index)}
                </motion.div>
              </div>

              <div className="p-3 h-28">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-xs">
                  {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
                </h3>

                <div className="text-xs text-gray-500 mb-1 uppercase">
                  {product.category}
                </div>

                <div className="flex items-center mb-1">
                  <div className="flex items-center mr-1">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.rating.count}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center Divider Image with Animation */}
        <motion.div 
          className="flex-shrink-0 w-full sm:w-full lg:w-60"
          variants={centerImageVariants}
        >
          <div
            className="h-40 sm:h-56 lg:h-full lg:min-h-[480px] shadow-lg border-2 border-gray-200 rounded-lg overflow-hidden"
            style={{
              backgroundImage: 'url("/img/photo4.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </motion.div>

        {/* Last 4 Products - 2x2 Grid */}
        <motion.div 
          className="grid grid-cols-2 flex-1 h-fit"
          variants={containerVariants}
        >
          {products.slice(4, 8).map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-60 border-2 border-gray-200 hover:border-teal-300"
              variants={productVariants}
              custom={index + 4}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain p-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-2 left-2 bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                >
                  {getDiscountLabel(index + 4)}
                </motion.div>
              </div>

              <div className="p-3 h-28">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-xs">
                  {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
                </h3>

                <div className="text-xs text-gray-500 mb-1 uppercase">
                  {product.category}
                </div>

                <div className="flex items-center mb-1">
                  <div className="flex items-center mr-1">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.rating.count}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Cards Section with Improved Animation */}
      <motion.div
        className="flex justify-center items-center p-2 sm:p-4 w-full mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-6 w-full max-w-7xl">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="flex-1 w-full min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] p-3 sm:p-4 md:p-6 rounded-lg shadow-lg relative overflow-hidden"
              style={{
                backgroundImage: card.backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
             
              
              <div className="relative z-10 text-left h-full flex flex-col justify-between">
                <div>
                  <p className="text-green-500 font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                    WEEKEND DISCOUNT 40%
                  </p>
                  <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold mt-1 text-white drop-shadow-lg">
                    {card.title}
                  </h2>
                  <p className="text-gray-100 mt-1 text-xs sm:text-sm md:text-base drop-shadow-md">
                    {card.subtitle}
                  </p>
                </div>
                
                <Link
                  to="/shop"
                  className="mt-3 sm:mt-4 md:mt-6 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 py-1.5 sm:py-2 px-3 sm:px-4 md:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-medium self-start shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BestSeller;
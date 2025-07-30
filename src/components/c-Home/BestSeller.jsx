import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
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
      </div>

      {/* Products Layout */}
      <div className="flex flex-col lg:flex-row items-center">
        {/* First 4 Products - 2x2 Grid */}
        <div className="grid grid-cols-2 flex-1 h-fit">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-60 border-2 border-gray-200"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain p-3"
                />
                <div className="absolute top-2 left-2 bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {getDiscountLabel(index)}
                </div>
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
            </div>
          ))}
        </div>
        {/* Center Divider Image */}
        <div className="flex-shrink-0 w-full sm:w-full lg:w-60">
          <div
            className="h-40 sm:h-56 lg:h-full lg:min-h-[480px] shadow-lg border-2 border-gray-200"
            style={{
              backgroundImage: 'url("/img/photo4.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>

        {/* Last 4 Products - 2x2 Grid */}
        <div className="grid grid-cols-2 flex-1 h-fit">
          {products.slice(4, 8).map((product, index) => (
            <div
              key={product.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-60 border-2 border-gray-200"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain p-3"
                />
                <div className="absolute top-2 left-2 bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {getDiscountLabel(index + 4)}
                </div>
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
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-[392px] h-[218.63px] p-6 rounded-[7px] shadow-lg"
              style={{
                backgroundImage: card.backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginLeft: '15px',
              }}
            >
              <div className="text-left">
                <p className="text-green-600 font-bold">WEEKEND DISCOUNT 40%</p>
                <h2 className="text-2xl font-semibold mt-2">{card.title}</h2>
                <p className="text-gray-600 mt-1">{card.subtitle}</p>
                <br />
                <Link
                  to="/shop"
                  className="mt-4 bg-gray-300 text-white py-2 px-4 rounded-[15px] hover:bg-gray-200"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
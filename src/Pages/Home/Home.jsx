import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Products from '../../components/c-Home/Products';
import BestSeller from '../../components/c-Home/BestSeller';
import FeaturedProducts from '../../components/c-Home/Featured Products.jsx';

const Home = () => {
  // Initialize countdown state with the starting values
  const [countdown, setCountdown] = useState({
    days: 71,
    hours: 14,
    minutes: 43,
    seconds: 16,
  });

  // useEffect to handle the countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        // Decrease seconds
        seconds -= 1;

        // Handle underflow for seconds
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }

        // Handle underflow for minutes
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }

        // Handle underflow for hours
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }

        // Stop the countdown if it reaches zero
        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format countdown for display
  const countdownDisplay = [
    { value: countdown.days.toString().padStart(2, '0'), label: 'Days' },
    { value: countdown.hours.toString().padStart(2, '0'), label: 'Hours' },
    { value: countdown.minutes.toString().padStart(2, '0'), label: 'Minutes' },
    { value: countdown.seconds.toString().padStart(2, '0'), label: 'Seconds' },
  ];

  // Animation variants for the hero background
  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen max-w-[95%] mx-auto">
      <br />
      <br />
      <br />
      {/* Hero Section */}
      <motion.section
        className="relative bg-cover bg-center bg-no-repeat overflow-hidden shadow-md rounded-lg"
        style={{
          backgroundImage: 'url("./img/Capture.PNG")',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={backgroundVariants}
      >
        <div className="container mx-auto max-w-[1600px] px-4 sm:px-6 py-12 sm:py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <span className="bg-green-100 text-green-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    EXCLUSIVE OFFER
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    20% OFF
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Specialist in the
                  <span className="block text-gray-900">Product store</span>
                </h1>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl">Only this week. Don't miss...</p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-6">
                <span className="text-gray-600 text-sm sm:text-lg">from</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600">$7.99</span>
              </div>
              <br />
              <Link
                to="/shop"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors duration-300 w-full sm:w-auto"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Delivery Section */}
      <section className="py-6 sm:py-8 bg-red-50 mt-6 sm:mt-8 rounded-lg shadow-md">
        <div className="container mx-auto max-w-[1600px] px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 sm:space-y-6 lg:space-y-0">
            <div className="flex items-center justify-center lg:justify-start">
              <h3 className="text-green-700 text-sm sm:text-base lg:text-3xl font-semibold text-center lg:text-left">
                100% Secure delivery without contacting the courier
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <img
                src="./img/banner-box2.jpg"
                alt="Delivery illustration"
                className="w-70 object-cover rounded"
              />
              <Link
                to="/shop"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors duration-300 w-full sm:w-auto flex justify-center items-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto max-w-[1600px] px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-6 sm:space-y-8 lg:space-y-0">
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600">
                Special Offers of the week!
              </h2>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl">
                Ut placerat, magna quis porttitor vulputate, magna nunc auctor ante.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3 lg:gap-4">
  {countdownDisplay.map((item, index) => (
    <React.Fragment key={index}>
      <div className="bg-red-600 text-white rounded-lg p-2 sm:p-4 text-center shadow-lg min-w-0">
        <div className="text-lg sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-2">{item.value}</div>
        <div className="text-[10px] sm:text-sm opacity-90">{item.label}</div>
      </div>

      {/* Show ':' between items but NOT after the last one */}
      {index < countdownDisplay.length - 1 && (
        <span className="text-xl sm:text-3xl font-bold text-red-700">:</span>
      )}
    </React.Fragment>
  ))}
</div>
          </div>
        </div>
      </section>
      <Products />
      <BestSeller />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
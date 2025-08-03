import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSec() {
  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <motion.section
      className="relative mx-auto overflow-hidden shadow-md rounded-lg w-full
          bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("./img/HeroShop3.png")',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={backgroundVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 relative">
        <div className="flex flex-column justify-center items-center">
          <div className="">
            <div className="">
              <p className="font-extralight text-lg/[28.8px] md:text-2xl/[28.8px] lg:text-2xl/[28.8px]">
                Curated Styles for Every Day
              </p>
              <p className="font-semibold text-2xl/[28.8px] md:text-3xl/[36px] lg:text-3xl/[28.8px] pb-2 pt-1 tracking-tight ">
                Delivered to <span className="text-green-500">your Home</span>{" "}
              </p>
            </div>
            <p className="font-normal text-stone-400 text-xs/[18px]">
              Fully prepared & delivered nationwide.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

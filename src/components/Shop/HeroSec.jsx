import React from "react";
import { Link } from "react-router-dom";

export default function HeroSec() {
  return (
    <section
      className="relative mx-auto overflow-hidden shadow-md rounded-lg w-full
      bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("./img/HeroShop3.png")',
      }}
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
    </section>
  );
}

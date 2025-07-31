import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

export default function FilterSide({
  categories = [],
  brands = [],
  brandCounts = {},
  filters,
  onToggleCategory,
  onToggleBrand,
  onSetPrice,
  onSetInStock,
  onClear,
}) {

  const [showFilter, setShowFilter] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [minLocal, setMinLocal] = useState(filters.priceMin);
  const [maxLocal, setMaxLocal] = useState(filters.priceMax);
  const applyPrice = () => onSetPrice(minLocal || 0, maxLocal || 9999);

  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setPanelOpen(true));
    } else {
      document.body.style.overflow = "";
      setPanelOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilter]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && showFilter) {
        closePanel(); 
      }
    };
  
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showFilter]);

  const openPanel = () => setShowFilter(true);

  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => setShowFilter(false), 300);
  };

  
  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="block lg:hidden text-xl absolute top-[-50px] z-5 font-semibold px-4 py-2 bg-green-500 text-white rounded-xl"
      >
        ☰
      </button>

      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
           <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              panelOpen ? "bg-opacity-50 opacity-100" : "bg-opacity-0 opacity-0"
            }`}
            onClick={closePanel}
            aria-hidden="true"
          ></div>
          <div  className={`relative left- top-0 w-72 max-w-full h-full bg-white p-6 shadow-lg transform transition-transform duration-300 overflow-auto
              ${panelOpen ? "translate-x-0" : "-translate-x-full"}`}
            role="dialog"
            aria-modal="true"
            aria-label="Filters">
            <button
              onClick={closePanel}
              className="absolute top-4 right-4 text-md font-bold font-semibold px-3 py-1 bg-gray-200 rounded-lg"
              aria-label="Close filters"
            >
              <IoClose />
            </button>
            <div className={`px-10  mt-10`}>
              <div className="mb-12">
                <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
                  PRODUCT CATEGORIES
                </h2>
                <ul className="text-sm text-gray-600">
                  {categories.map((item) => (
                    <li
                      key={item}
                      className="py-1 font-normal text-sm text-stone-500 "
                    >
                      <label>
                        <input
                          type="checkbox"
                          className="mr-4 accent-teal-500"
                          checked={filters.categories.includes(item)}
                          onChange={() => onToggleCategory(item)}
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
                  BRANDS
                </h2>
                <ul className="text-sm text-gray-600">
                  {brands.map((item) => (
                    <li
                      key={item}
                      className="py-1 font-normal text-sm text-stone-500"
                    >
                      <label className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-4 accent-teal-500"
                            checked={filters.brands.includes(item)}
                            onChange={() => onToggleBrand(item)}
                          />
                          <span className="text-gray-700">{item}</span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          ({brandCounts[item]})
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
                  PRICE
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  <label className="flex flex-col">
                    <p className="text-xs text-gray-400 text-normal mb-1">
                      From
                    </p>
                    <input
                      type="number"
                      value={minLocal}
                      onChange={(e) => setMinLocal(Number(e.target.value))}
                      onBlur={applyPrice}
                      className="w-[100%] border text-sm rounded px-2 py-1"
                    />
                  </label>
                  <span className="text-sm pt-4">-</span>
                  <label>
                    <p className="text-xs text-gray-400 text-normal mb-1">To</p>
                    <input
                      type="number"
                      value={maxLocal}
                      onChange={(e) => setMaxLocal(Number(e.target.value))}
                      onBlur={applyPrice}
                      className="w-[100%] border text-sm rounded px-2 py-1"
                    />
                  </label>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
                  AVAILABILITY
                </h2>
                <ul className="text-sm text-gray-600">
                  <li className="py-1 font-normal text-sm text-stone-500">
                    <label className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="availability"
                          className="mr-4 accent-green-500"
                          checked={filters.inStock === true}
                          onChange={() => onSetInStock(true)}
                        />
                        <span> In stock</span>
                      </div>
                      <span className="text-gray-400">()</span>
                    </label>
                  </li>
                  <li className="py-1 font-normal text-sm text-stone-500">
                    <label className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="availability"
                          className="mr-4 accent-green-500"
                          checked={filters.inStock === false}
                          onChange={() => onSetInStock(false)}
                        />
                        <span> Out of stock </span>
                      </div>
                      <span className="text-gray-400">(0)</span>
                    </label>
                  </li>
                </ul>
              </div>

               <div className="mb-12">
          <img src="./img/advShop.png" className="w-[250px]"/>
        </div>
            </div>
          </div>
        </div>
      )}

     
      <div className={`px-10 mt-10 hidden lg:block`}>
        <div className="mb-12">
          <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
            PRODUCT CATEGORIES
          </h2>
          <ul className="text-sm text-gray-600">
            {categories.map((item) => (
              <li
                key={item}
                className="py-1 font-normal text-sm text-stone-500 "
              >
                <label>
                  <input type="checkbox" className="mr-4 accent-teal-500" checked={filters.categories.includes(item)}
                      onChange={() => onToggleCategory(item)} />
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 hidden sm:block">
          <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
            BRANDS
          </h2>
          <ul className="text-sm text-gray-600">
            {brands.map((item) => (
              <li
                key={item}
                className="py-1 font-normal text-sm text-stone-500"
              >
                <label className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-4 accent-teal-500"  
                    checked={filters.brands.includes(item)}
                     onChange={() => onToggleBrand(item)}/>
                    <span className="text-gray-700">{item}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    ({brandCounts[item]})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
            PRICE
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <label className="flex flex-col">
              <p className="text-xs text-gray-400 text-normal mb-1">From</p>
              <input
                type="number"
                value={minLocal}
                onChange={(e) => setMinLocal(Number(e.target.value))}
                onBlur={applyPrice}
                className="w-[100%] border text-sm rounded px-2 py-1"
              />
            </label>
            <span className="text-sm pt-4">-</span>
            <label>
              <p className="text-xs text-gray-400 text-normal mb-1">To</p>
              <input
                type="number"
               value={maxLocal}
               onChange={(e) => setMaxLocal(Number(e.target.value))}
               onBlur={applyPrice}
                className="w-[100%] border text-sm rounded px-2 py-1"
              />
            </label>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-sm/[18px] font-semibold text-black-500 mb-5">
            AVAILABILITY
          </h2>
          <ul className="text-sm text-gray-600">
            <li className="py-1 font-normal text-sm text-stone-500">
              <label className="flex justify-between">
                <div>
                  <input type="radio" className="mr-4 accent-teal-500 border-none" name="availability-desktop" checked={filters.inStock === true}
          onChange={() => onSetInStock(true)}/>
                  <span> In stock</span>
                </div>
                <span className="text-gray-400">(62)</span>
              </label>
            </li>
            <li className="py-1 font-normal text-sm text-stone-500">
              <label className="flex justify-between">
                <div>
                  <input type="radio" name="availability-desktop" className="mr-4 accent-teal-500" checked={filters.inStock === true}
          onChange={() => onSetInStock(true)}/>
                  <span> Out of stock </span>
                </div>
                <span className="text-gray-400">(0)</span>
              </label>
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <img src="./img/advShop.png" className="w-[300px]"/>
        </div>
      </div>
    </div>
  );
}

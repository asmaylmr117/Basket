import React,{ useEffect, useState, useMemo, useCallback } from "react";
import FilterSide from "../../components/Shop/FilterSide";
import HeroSec from "../../components/Shop/HeroSec";
import SortProducts from "../../components/Shop/SortProducts";
import ShopProducts from "../../components/Shop/ShopProducts";
import { FaStar } from "react-icons/fa6";
import { FaChevronRight , FaChevronLeft } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";

const PAGE_SIZE = 12;
const fakeBrands = ["Nike", "Adidas", "Zara", "H&M", "Uniqlo"];
const topProductPercentages = [0, 25, 0, 30, 0, 20, 0, 20, 0, 25];

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("title"); // "title" | "price" | "rating" | "newest"
  const [sortDir, setSortDir] = useState("asc");  // "asc" | "desc"
  const [filters, setFilters] = useState({
    categories: [],    
    brands: [],         
    priceMin: 0,
    priceMax: 9999,
    inStock: null,      
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://fakestoreapi.com/products");
      const updatedProducts = response.data.map((prod, index) => {
        const discountValue =
          topProductPercentages[Math.floor(Math.random()*10)];
        const finalPrice = discountValue
          ? (prod.price * (1 - discountValue / 100)).toFixed(2)
          : prod.price.toFixed(2);

        const brand=fakeBrands[index % fakeBrands.length];
          
        return {
          ...prod,
          inStock: true,
          discount: discountValue,
          finalPrice,
          brand,    
        };
      });
      setAllProducts(updatedProducts);
    } catch (e) {
      setError("حدث خطأ أثناء تحميل المنتجات. جرّب مرة أخرى.");
    } finally {
      setLoading(false);
    }
    }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.category))),
    [allProducts]
  );

   const brands = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.brand))),
    [allProducts]
  );

  const brandCounts = useMemo(() => {
    const acc = {};
    for (const p of allProducts) acc[p.brand] = (acc[p.brand] || 0) + 1;
    return acc;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const unitPrice = Number(p.discount ? p.finalPrice : p.price);

      const okCat =
        filters.categories.length === 0 || filters.categories.includes(p.category);

      const okBrand =
        filters.brands.length === 0 || filters.brands.includes(p.brand);

      const okPrice = unitPrice >= filters.priceMin && unitPrice <= filters.priceMax;

      const okStock =
        filters.inStock === null ? true : filters.inStock ? p.inStock : !p.inStock;

      return okCat && okBrand && okPrice && okStock ;
    });
  }, [allProducts, filters]);

    useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, sortDir]);

  const collator = useMemo(
  () => new Intl.Collator("en", { sensitivity: "base", numeric: true }),
  []
);

const sortedProducts = useMemo(() => {
    const data = [...filteredProducts];

    data.sort((a, b) => {
      let cmp = 0;

      switch (sortBy) {
        case "title": {
          const stripThe = (s = "") => s.replace(/^\s*the\s+/i, "");
          cmp = collator.compare(stripThe(a.title), stripThe(b.title));
          break;
        }
        case "price": {
          cmp = getUnitPrice(a) - getUnitPrice(b);
          break;
        }
        case "rating": {
          const ra = a?.rating?.rate ?? 0;
          const rb = b?.rating?.rate ?? 0;
          cmp = ra - rb;
          break;
        }
        case "newest": {
          const ia = a?.id ?? 0;
          const ib = b?.id ?? 0;
          cmp = ia - ib;
          break;
        }
        default:
          cmp = 0;
      }

      return sortDir === "asc" ? cmp : -cmp;
    });

    return data;
  }, [filteredProducts, sortBy, sortDir, collator]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));

    const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, currentPage]);

    const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      const nextArr = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: nextArr };
    });
  };

   const setPrice = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      priceMin: Number(min),
      priceMax: Number(max),
    }));
  };

  const handleSortChange = ({ by, dir }) => {
    if (by) setSortBy(by);
    if (dir) setSortDir(dir);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ImSpinner8 className="animate-spin text-7xl opacity-70" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 block lg:flex my-20">
      <FilterSide 
          categories={categories}
          brands={brands}
          brandCounts={brandCounts}
          filters={filters}
          onToggleCategory={(cat) => toggleArrayFilter("categories", cat)}
          onToggleBrand={(brand) => toggleArrayFilter("brands", brand)}
          onSetPrice={setPrice}
          onSetInStock={(val) => setFilters((p) => ({ ...p, inStock: val }))}
        />
      <div className="flex flex-col w-[100%]">
        <HeroSec />
        <SortProducts productLength = {allProducts.length} sortBy={sortBy}
          sortDir={sortDir}
          onChangeSort={handleSortChange}/>
        <ShopProducts products={paginatedProducts} />
          {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-semibold rounded disabled:opacity-30"
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 text-semibold rounded-full ${
                p === currentPage ? "bg-teal-500 text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 ext-semibold rounded-full disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Shop;
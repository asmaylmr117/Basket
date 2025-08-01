import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { IoCart, IoClose } from "react-icons/io5";
import { IoRestaurant } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { navLinks } from "../../utils/HeaderLinks";
import { AiOutlineShopping } from "react-icons/ai";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // دالة لإغلاق القائمة عند النقر على رابط
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`bg-white w-[100%] top-0 fixed z-30 ${
        scrolled && "border-b-[0.5px] border-b-[#e0e0e0]"
      }`}
    >
      <div className="max-w-screen-xl m-auto md:py-1 py-3 md:px-6 px-6">
        <div className="flex justify-between items-center">
          <div className="">
            <Link to="/" className="flex items-center gap-2 text-[#35afa0]">
              <IoCart className="text-4xl" />
              <span className="font-black text-3xl">Basket</span>
            </Link>
          </div>

          <div className={`md:block ${isMenuOpen ? "block" : "hidden"}`}>
            <nav aria-label="Global">
              <ul className="flex flex-col w-[100%] h-[100vh] md:h-[65px] md:flex-row absolute md:relative md:top-0 top-[69px] md:bg-transparent bg-white/30 backdrop-blur-xl right-0 rounded-[5px] items-center transition-all duration-500">
                {navLinks.map((item) => (
                  <li key={item.title} className="lg:px-5 md:px-3 md:py-0 py-6">
                    <Link
                      to={item.href}
                      className={`transition md:text-[15px] ${
                        location.pathname === item.href
                          ? "text-[#35afa0] font-semibold"
                          : "md:text-[#787b77] text-[#292929] hover:text-[#35afa0]"
                      }`}
                      onClick={handleLinkClick} // إضافة الحدث لإغلاق القائمة
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex md:gap-8 gap-8 items-center">
              <div className="w-fit relative">
                <span className="absolute -top-2 -right-4 bg-[#35afa0] text-white text-[12px] px-2 rounded-full">
                  0
                </span>
                <AiOutlineShopping size={28} className="text-[#35afa0]" />
              </div>
              <Link
                className="rounded-[25px] bg-white border border-[#787b77] px-5 py-2.5 text-sm font-medium text-[#787b77] hover:bg-[#35afa0] hover:text-white hover:border-[#35afa0]"
                to="#"
              >
                Login
              </Link>
            </div>

            <div className="block md:hidden text-dark-500 mt-2">
              <button
                className="rounded transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {!isMenuOpen ? (
                  <LuMenu size={30} className="text-[#35afa0]" />
                ) : (
                  <IoClose size={30} className="text-[#35afa0]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
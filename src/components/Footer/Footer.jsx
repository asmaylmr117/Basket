import { FaRegCopyright } from "react-icons/fa6";
import { IoCart, IoRestaurant } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-20 bg-[#020618] text-[#fff]">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-16">
        <div className="newsletter-content flex items-center gap-4 md:justify-start justify-center border-b-[0.2px] border-[#fff] pb-16 mb-16">
          <div className="email-icon">
            <IoCart className="text-6xl" />
          </div>
          <h4 className="newsletter-title text-dark-footerTitle font-bold md:text-3xl text-xl leading-[1.3]">
            Sign Up to Get Updates & <br /> News About Us.
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-3">
          <div>
            <p className="mt-1 max-w-md text-center leading-relaxed text-dark-footerSubTitle sm:max-w-xs sm:text-left">
              You interested in fashion trends, the history of clothing,
              different types of garments, clothing materials, or something
              else? Let me know so I can tailor my response to your interests!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-dark-footerTitle">
                About Us
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-dark-footerSubTitle transition hover:text-[#35afa0]"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-dark-footerSubTitle transition hover:text-[#35afa0]"
                    to="/aboutus"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-dark-footerSubTitle transition hover:text-[#35afa0]"
                    to="/blog"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-dark-footerTitle">
                Helpful Links
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-dark-footerSubTitle transition hover:text-[#35afa0]"
                    to="/shop"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-dark-footerSubTitle transition hover:text-[#35afa0]"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-dark-footerSubTitle transition hover:text-[#35afa0]"
                    to="/checkout"
                  >
                    Checkout
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-dark-footerTitle">
                Contact Us
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    href="mailto:roofplanting1@gmail.com"
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end hover:text-[#35afa0] text-dark-footerSubTitle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-[#35afa0]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="flex-1">basket@gmail.com</span>
                  </a>
                </li>

                <li>
                  <div className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-[#35afa0]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="flex-1 text-dark-footerSubTitle">
                      +201234567890
                    </span>
                  </div>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-[#35afa0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <address className="-mt-0.5 flex-1 not-italic text-dark-footerSubTitle">
                    Tanta, Gharbia, Egypt
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-12 py-6 px-20"
        style={{
          backgroundImage: "url('/assets/images/copyrightBg1.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center sm:text-left pt-4">
          <div className="text-sm text-slate-300">
            <p className="flex text-md">
              Copyright <FaRegCopyright className="mx-[5px] text-lg" /> 2025.
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
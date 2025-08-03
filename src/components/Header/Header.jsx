import { useEffect, useState, useContext } from "react";
import { LuMenu } from "react-icons/lu";
import { IoCart, IoClose } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../utils/HeaderLinks";
import { CartContext } from "../../Context/CartContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [welcomeMessage, setWelcomeMessage] = useState(() => {
    return localStorage.getItem("welcomeMessage") || "";
  });
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useContext(CartContext);

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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("welcomeMessage", welcomeMessage);
  }, [isLoggedIn, welcomeMessage]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shop-co-back.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        setSignInSuccess(true);
        setIsLoggedIn(true);
        setWelcomeMessage(`Welcome, ${email}!`);
        setSignInError("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setSignInSuccess(false);
          setShowSignInForm(false);
        }, 3000);
      } else {
        setSignInError("This account has not been registered.");
        setTimeout(() => {
          setSignInError("");
        }, 3000);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setSignInError("An error occurred. Please try again.");
      setTimeout(() => {
        setSignInError("");
      }, 3000);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shop-co-back.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );
      if (response.ok) {
        setSignUpSuccess(true);
        setIsLoggedIn(true);
        setWelcomeMessage(`Welcome, ${email}!`);
        setSignUpError("");
        setUsername("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setSignUpSuccess(false);
          setShowSignInForm(false);
        }, 3000);
      } else {
        setSignUpError("This account has been registered before");
        setTimeout(() => {
          setSignUpError("");
        }, 3000);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setSignUpError("An error occurred. Please try again.");
      setTimeout(() => {
        setSignUpError("");
      }, 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setWelcomeMessage("");
    setShowSignInForm(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("welcomeMessage");
  };

  return (
    <header
      className={`bg-white w-full top-0 fixed z-30 ${
        scrolled && "border-b-[0.5px] border-b-[#e0e0e0]"
      }`}
    >
      <div className="max-w-screen-xl m-auto md:py-1 py-3 md:px-6 px-6">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="flex items-center gap-2 text-[#35afa0]">
              <IoCart className="text-4xl" />
              <span className="font-black text-3xl">Basket</span>
            </Link>
          </div>

          <div className={`md:block ${isMenuOpen ? "block" : "hidden"}`}>
            <nav aria-label="Global">
              <ul className="flex flex-col w-full h-[100vh] md:h-[65px] md:flex-row absolute md:relative md:top-0 top-[69px] md:bg-transparent bg-white/30 backdrop-blur-xl right-0 rounded-[5px] items-center transition-all duration-500">
                {navLinks.map((item) => (
                  <li key={item.title} className="lg:px-5 md:px-3 md:py-0 py-6">
                    <Link
                      to={item.href}
                      className={`transition md:text-[15px] ${
                        location.pathname === item.href
                          ? "text-[#35afa0] font-semibold"
                          : "md:text-[#787b77] text-[#292929] hover:text-[#35afa0]"
                      }`}
                      onClick={handleLinkClick}
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
              <Link className="w-fit relative" to="/checkout  ">
                <span className="absolute -top-2 -right-4 bg-[#35afa0] text-white text-[12px] px-2 rounded-full">
                  {cart.length}
                </span>
                <AiOutlineShopping size={28} className="text-[#35afa0]" />
              </Link>
              {!isLoggedIn ? (
                <button
                  className="rounded-[25px] bg-white border border-[#787b77] px-5 py-2.5 text-sm font-medium text-[#787b77] hover:bg-[#35afa0] hover:text-white hover:border-[#35afa0]"
                  onClick={() => setShowSignInForm(!showSignInForm)}
                >
                  Login
                </button>
              ) : (
                <button
                  className="rounded-[25px] bg-red-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
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

      {showSignInForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80">
            {!isLoggedIn ? (
              !isSignUpForm ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">
                    Sign in to your account
                  </h2>
                  <p className="text-center mb-4">
                    Or{" "}
                    <button
                      className="text-[#35afa0] hover:underline"
                      onClick={() => setIsSignUpForm(true)}
                    >
                      create new account
                    </button>
                  </p>
                  {signInError && (
                    <p className="text-red-600 text-center mb-4">
                      {signInError}
                    </p>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium dark:text-white text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 dark:bg-gray-800 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#35afa0] focus:ring-[#35afa0] pl-3"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium dark:text-white text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 dark:bg-gray-800 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#35afa0] focus:ring-[#35afa0] pl-3"
                        required
                      />
                    </div>
                    <button
                      onClick={handleSignIn}
                      className="w-full bg-[#35afa0] text-white py-2 px-4 rounded-md hover:bg-[#2e998b] transition duration-200"
                    >
                      Sign In
                    </button>
                    {signInSuccess && (
                      <p className="text-green-600 text-center mt-2">
                        Successfully signed in!
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">
                    Create your account
                  </h2>
                  <p className="text-center mb-4">
                    Already have account?{" "}
                    <button
                      className="text-[#35afa0] hover:underline"
                      onClick={() => setIsSignUpForm(false)}
                    >
                      Sign in
                    </button>
                  </p>
                  {signUpError && (
                    <p className="text-red-600 text-center mb-4">
                      {signUpError}
                    </p>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium dark:text-white text-gray-700"
                      >
                        User name
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 dark:bg-gray-800 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#35afa0] focus:ring-[#35afa0] pl-3"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium dark:text-white text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 dark:bg-gray-800 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#35afa0] focus:ring-[#35afa0] pl-3"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium dark:text-white text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 dark:bg-gray-800 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#35afa0] focus:ring-[#35afa0] pl-3"
                        required
                      />
                    </div>
                    <button
                      onClick={handleSignUp}
                      className="w-full bg-[#35afa0] text-white py-2 px-4 rounded-md hover:bg-[#2e998b] transition duration-200"
                    >
                      Sign Up
                    </button>
                    {signUpSuccess && (
                      <p className="text-green-600 text-center mt-2">
                        Account created successfully!
                      </p>
                    )}
                  </div>
                </>
              )
            ) : (
              <div>
                <p className="text-green-600 text-center text-lg mb-4">
                  {welcomeMessage}
                </p>
                <button
                  onClick={() => setShowSignInForm(false)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

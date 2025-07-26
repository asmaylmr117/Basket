
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Basket</h1>
        <ul className="flex space-x-4 space-x-reverse">
          <li><NavLink to="/home1" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>home 1 </NavLink></li>
          <li><NavLink to="/home2" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>home 2</NavLink></li>
          <li><NavLink to="/home3" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>home 3</NavLink></li>
          <li><NavLink to="/home4" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>home 4</NavLink></li>
          <li><NavLink to="/home5" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>home 5</NavLink></li>
          <li><NavLink to="/shop" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>shop</NavLink></li>
          <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>blog</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>Contact</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>About us</NavLink></li>
          <li><NavLink to="/checkout" className={({ isActive }) => isActive ? 'text-blue-300' : 'hover:text-gray-300'}>Checkout</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
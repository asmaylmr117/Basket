import { createContext, useState, useEffect } from "react";
import { CartStorage } from "../utils/CartStorage ";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first load
  useEffect(() => {
    setCart([...CartStorage.getCart()]);
  }, []);

  const addToCart = (product, quantity = 1) => {
    const existingItem = CartStorage.getCart().find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      CartStorage.updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      CartStorage.addItem(product, quantity);
    }

    setCart([...CartStorage.getCart()]);
  };

  const updateQuantity = (productId, newQuantity) => {
    CartStorage.updateQuantity(productId, newQuantity);
    setCart([...CartStorage.getCart()]);
  };

  const removeFromCart = (productId) => {
    CartStorage.removeItem(productId);
    setCart([...CartStorage.getCart()]);
  };

  const clearCart = () => {
    CartStorage.clearCart();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

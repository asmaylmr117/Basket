
const CART_KEY = "cart";

export const CartStorage = {
  getCart: () => JSON.parse(localStorage.getItem("cart")) || [],

  saveCart: (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },

  addItem: (product, quantity = 1) => {
    const cart = CartStorage.getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      cart[existingItem].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    CartStorage.saveCart(cart);
  },

  updateQuantity: (productId, newQuantity) => {
    const cart = CartStorage.getCart().map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    CartStorage.saveCart(cart);
  },

  removeItem: (productId) => {
    const cart = CartStorage.getCart().filter((item) => item.id !== productId);
    CartStorage.saveCart(cart);
  },

  clearCart: () => {
    CartStorage.saveCart([]);
  },
};
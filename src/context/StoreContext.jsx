import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // --- DATABASE STATE ---
  const [products, setProducts] = useState([]);
  
  // --- CART STATE ---
  const [cart, setCart] = useState([]);

  // YOUR LIVE RENDER URL
  const BACKEND_URL = "https://zayd-blend-ecommerce.onrender.com/api"; // Make sure this is your actual Render link

  // 1. Fetch products from the live database
  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching live products:", err));
  }, []);

  // 2. Admin Database Functions
  const addProduct = async (product) => {
    try {
      const res = await fetch(`${BACKEND_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error("Error adding product to database:", err);
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      await fetch(`${BACKEND_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    } catch (err) {
      console.error("Error updating database product:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/products/${id}`, { method: "DELETE" });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting product from database:", err);
    }
  };

  // 3. Cart Functions
  const addToCart = (product, customOption = null, quantity = 1, addEngravingFee = false) => {
    setCart(prevCart => {
      // Check if this exact item (with the same engraving) is already in the cart
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.customOption === customOption
      );

      if (existingItemIndex >= 0) {
        // If it exists, just increase the quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // If it's new, add it to the cart and calculate final price
        const cartPrice = addEngravingFee ? product.price + 250 : product.price;
        return [...prevCart, { ...product, customOption, quantity, cartPrice }];
      }
    });
    
    // Optional: A simple alert so you know it worked!
    alert(`${quantity}x ${product.name} added to cart!`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ 
      products, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, clearCart // CART ADDED BACK HERE
    }}>
      {children}
    </StoreContext.Provider>
  );
};
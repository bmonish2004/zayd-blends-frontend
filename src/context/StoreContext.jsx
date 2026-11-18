import { createContext, useContext, useState, useEffect, useMemo } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // --- DATABASE STATE ---
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // YOUR LIVE RENDER URL
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
  
  // --- CART STATE WITH LOCAL STORAGE ---
  // Initialize cart from browser memory so it survives page refreshes
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("zayd_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // Automatically save to browser memory whenever the cart changes
  useEffect(() => {
    localStorage.setItem("zayd_cart", JSON.stringify(cart));
  }, [cart]);

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
  const addToCart = (product, option = "Standard", qty = 1, addEngravingFee = false) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.option === option
      );

      const basePrice = addEngravingFee ? Number(product.price) + 250 : Number(product.price);

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].qty += qty;
        return newCart;
      } else {
        return [...prevCart, { ...product, option, qty, price: basePrice }];
      }
    });
    
    setCartOpen(true); 
  };

  const updateQty = (id, option, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id && item.option === option) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id, option) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.option === option)));
  };

  const clearCart = () => setCart([]);

  // 4. Cart Calculations (Cross-Cart Buy 2 Get 1 Free & Totals)
  const cartData = useMemo(() => {
    let cartCount = 0;
    let calculatedSubtotal = 0;
    
    // Create a working copy of the cart to track free/paid quantities
    const processedCart = cart.map(item => ({ ...item, freeQty: 0, paidQty: item.qty }));

    // Count total items and raw subtotal
    cart.forEach(item => {
      cartCount += item.qty;
      calculatedSubtotal += (item.qty * item.price);
    });

    // Expand cart into individual items so we can sort them across different perfumes
    let allItems = [];
    processedCart.forEach((item, index) => {
      for (let i = 0; i < item.qty; i++) {
        allItems.push({ price: item.price, cartIndex: index });
      }
    });

    // Sort all individual items from most expensive to cheapest
    allItems.sort((a, b) => b.price - a.price);

    let calculatedDiscount = 0;

    // Apply Buy 2 Get 1 Free (Every 3rd item is free)
    allItems.forEach((item, index) => {
      if ((index + 1) % 3 === 0) {
        calculatedDiscount += item.price;
        processedCart[item.cartIndex].freeQty += 1;
        processedCart[item.cartIndex].paidQty -= 1;
      }
    });

    const finalTotal = calculatedSubtotal - calculatedDiscount;

    return {
      processedCart,
      cartCount,
      calculatedSubtotal,
      calculatedDiscount,
      finalTotal
    };
  }, [cart]);

  return (
    <StoreContext.Provider value={{ 
      products, addProduct, updateProduct, deleteProduct,
      cart: cartData.processedCart, addToCart, removeFromCart, clearCart, updateQty,
      cartOpen, setCartOpen,
      cartCount: cartData.cartCount,
      calculatedSubtotal: cartData.calculatedSubtotal,
      calculatedDiscount: cartData.calculatedDiscount,
      finalTotal: cartData.finalTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};
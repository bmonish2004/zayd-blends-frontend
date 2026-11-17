import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  // REPLACE THIS WITH YOUR LIVE RENDER URL (Keep /api at the end)
  const BACKEND_URL = "https://zayd-blend-ecommerce.onrender.com/api"; 

  // Fetch products from the live database when the website loads
  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching live products:", err));
  }, []);

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
      await fetch(`${BACKEND_URL}/products/${id}`, {
        method: "DELETE"
      });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting product from database:", err);
    }
  };

  return (
    <StoreContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </StoreContext.Provider>
  );
};
import { createContext, useContext, useState, useEffect } from "react";
import Aqua_Dawn from "../assets/Aqua_Dawn.jpeg";
import Wild_Desire from "../assets/Wild_Desire.jpeg";
import Baked_Vanilla from "../assets/Baked_Vanilla.jpeg";
import Forbidden_Bloom from "../assets/Forbidden_Bloom.jpeg";
import Woody from "../assets/Woody.jpeg";

const StoreContext = createContext();

const initialProducts = [
  {
    id: "prod-1",
    name: "AQUA DAWN",
    category: "aqua",
    gender: "UNISEX",
    usage: "FRESHNESS",
    rating: "4.5",
    price: 2000,
    size: "100 ML",
    stock: 15,
    badge: "Selling Fast",
    featured: true,
    image: Aqua_Dawn,
  },
  {
    id: "prod-2",
    name: "WILD DESIRE",
    category: "musk",
    gender: "UNISEX",
    usage: "SWEATY",
    rating: "4.6",
    price: 2000,
    size: "100 ML",
    stock: 10,
    badge: "Selling Fast",
    featured: true,
    image: Wild_Desire,
  },
  {
    id: "prod-3",
    name: "BAKED VANILLA",
    category: "sweet",
    gender: "UNISEX",
    usage: "OUTING",
    rating: "4.6",
    price: 2000,
    size: "100 ML",
    stock: 4,
    badge: "Selling Fast",
    featured: true,
    image: Baked_Vanilla,
  },
  {
    id: "prod-4",
    name: "FORBIDDEN BLOOM",
    category: "fruity",
    gender: "UNISEX",
    usage: "PARTY",
    rating: "4.5",
    price: 2500,
    size: "100 ML",
    stock: 8,
    badge: "Selling Fast",
    featured: true,
    image: Forbidden_Bloom,
  },
  {
    id: "prod-5",
    name: "WOODY",
    category: "aqua",
    gender: "UNISEX",
    usage: "DAILY WEAR",
    rating: "4.4",
    price: 1599,
    size: "100 ML",
    stock: 12,
    badge: "",
    featured: false,
    image: Woody,
  },
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("zayd_products_v1");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("zayd_cart_v1");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("zayd_products_v1", JSON.stringify(products));
    } catch (e) {
      console.warn("Storage limit reached");
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("zayd_cart_v1", JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage limit reached");
    }
  }, [cart]);

  // --- ADMIN ACTIONS ---
  const addProduct = (newProduct) => {
    const item = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      name: newProduct.name.toUpperCase(),
      category: newProduct.category.toLowerCase(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      rating: "5.0",
    };
    setProducts((prev) => [item, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // --- CART ACTIONS ---
  const addToCart = (product, option = "100 ML", quantityToAdd = 1, isPersonalized = false) => {
    if (product.stock <= 0) return;

    // Add ₹250 engraving fee if personalized
    const finalPrice = isPersonalized ? Number(product.price) + 250 : Number(product.price);

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.option === option
      );
      if (existing) {
        const newQty = Math.min(product.stock, existing.qty + quantityToAdd);
        return prev.map((item) =>
          item.id === product.id && item.option === option
            ? { ...item, qty: newQty }
            : item
        );
      }
      const initialQty = Math.min(product.stock, quantityToAdd);
      return [
        ...prev,
        {
          ...product,
          price: finalPrice, // Includes engraving fee if selected
          basePrice: product.price,
          isPersonalized,
          option,
          qty: initialQty,
        },
      ];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id, option) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.option === option))
    );
  };

  const updateQty = (id, option, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.option === option) {
            const newQty = item.qty + delta;
            if (newQty > item.stock) return item;
            if (newQty <= 0) return null;
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // --- BUY 2 GET 1 FREE CALCULATIONS ---
  const expandedItems = [];
  cart.forEach((item) => {
    for (let i = 0; i < item.qty; i++) {
      expandedItems.push({
        ...item,
        cartIndex: `${item.id}-${item.option}-${i}`,
      });
    }
  });

  expandedItems.sort((a, b) => a.price - b.price);

  let calculatedSubtotal = 0;
  let calculatedDiscount = 0;

  const processedCart = cart.map((cartItem) => {
    let freeCountForThisItem = 0;
    expandedItems.forEach((exp, idx) => {
      if (exp.id === cartItem.id && exp.option === cartItem.option) {
        calculatedSubtotal += exp.price;
        if ((idx + 1) % 3 === 0) {
          calculatedDiscount += exp.price;
          freeCountForThisItem++;
        }
      }
    });

    return {
      ...cartItem,
      freeQty: freeCountForThisItem,
      paidQty: cartItem.qty - freeCountForThisItem,
    };
  });

  const finalTotal = calculatedSubtotal - calculatedDiscount;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart: processedCart,
        addToCart,
        removeFromCart,
        updateQty,
        cartOpen,
        setCartOpen,
        cartCount,
        calculatedSubtotal,
        calculatedDiscount,
        finalTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
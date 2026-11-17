import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const categories = ["all", "aqua", "fruity", "musk", "sweet"];

function ShopAll() {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});

  const filteredProducts = products.filter((item) =>
    selectedCategory === "all"
      ? true
      : item.category.toLowerCase() === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const handleQtyChange = (productId, delta, maxStock) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated = current + delta;
      if (updated < 1 || updated > maxStock) return prev;
      return { ...prev, [productId]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-[#211b1d]">
      {/* Page Banner */}
      <section className="bg-[#260b19] text-white py-16 md:py-24 px-5 text-center">
        <p className="text-[11px] tracking-[0.45em] text-[#e9b5c5] uppercase mb-4">
          ZAYD BLENDS • COMPLETE CATALOG
        </p>
        <h1 className="font-serif text-4xl md:text-6xl">All Fragrances</h1>
        <p className="mt-4 text-sm md:text-base text-white/80 max-w-xl mx-auto font-light">
          Explore every signature creation across our Aqua, Fruity, Musk, and Sweet collections.
        </p>
      </section>

      {/* Filter & Sort Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[76px] z-30">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 font-outfit">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#260b19] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{sortedProducts.length} Perfumes</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-xs text-black bg-white focus:outline-none"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* All Products Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-14">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => {
              const activeOption = selectedOptions[product.id] || product.size;
              const qty = quantities[product.id] || 1;
              const outOfStock = product.stock <= 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-72 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        outOfStock ? "opacity-60 grayscale" : "hover:scale-105"
                      }`}
                    />
                    {outOfStock ? (
                      <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                        Sold Out
                      </span>
                    ) : product.badge ? (
                      <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                        ↗ {product.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="p-5 font-outfit flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-medium">{product.name}</h2>
                        <span className="text-xs whitespace-nowrap">
                          <span className="text-orange-400">★</span>{" "}
                          {product.rating || "4.5"}
                        </span>
                      </div>

                      <p className="text-gray-500 text-xs mt-1 tracking-wide">
                        {product.category.toUpperCase()} | {product.gender} |{" "}
                        {product.usage}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-medium">₹{product.price}</p>
                        <p className="text-xs text-gray-400">
                          {outOfStock
                            ? "0 available"
                            : `${product.stock} available`}
                        </p>
                      </div>

                      {/* Options Grid (Standard Size & Personalized Link) */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedOptions({
                              ...selectedOptions,
                              [product.id]: product.size,
                            })
                          }
                          className={`border rounded-md px-2.5 py-1.5 text-xs cursor-pointer ${
                            activeOption === product.size
                              ? "border-black bg-black text-white"
                              : "border-gray-200"
                          }`}
                        >
                          {product.size}
                        </button>

                        <Link
                          to="/personalized-perfume"
                          className="border border-gray-200 rounded-md px-2.5 py-1.5 text-xs flex items-center justify-center hover:border-black transition text-center text-gray-800 bg-white font-medium cursor-pointer"
                        >
                          ✥ Personalized
                        </Link>
                      </div>
                    </div>

                    <div>
                      {!outOfStock && (
                        <div className="flex items-center justify-between border border-gray-300 rounded-lg mt-4 px-3 py-2">
                          <span className="text-xs uppercase tracking-wider text-gray-500">
                            Quantity:
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQtyChange(product.id, -1, product.stock)}
                              className="text-sm font-bold text-gray-600 hover:text-black w-6 h-6 flex items-center justify-center rounded bg-gray-100 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleQtyChange(product.id, 1, product.stock)}
                              className="text-sm font-bold text-gray-600 hover:text-black w-6 h-6 flex items-center justify-center rounded bg-gray-100 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        disabled={outOfStock}
                        onClick={() => addToCart(product, activeOption, qty)}
                        className={`w-full rounded-lg py-3 mt-3 text-xs tracking-wider uppercase font-semibold transition cursor-pointer ${
                          outOfStock
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-[#191919] text-white hover:bg-gray-700"
                        }`}
                      >
                        {outOfStock ? "Out of Stock" : `Add ${qty} to Bag`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 font-outfit">
            <p className="text-gray-500 mb-4">
              No perfumes found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-2.5 bg-[#260b19] text-white text-xs uppercase tracking-widest rounded-lg cursor-pointer"
            >
              Show All Perfumes
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default ShopAll;
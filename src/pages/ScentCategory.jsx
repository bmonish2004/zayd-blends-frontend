import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Fresh from "../assets/Aqua_Dawn.jpeg";
import Fruity from "../assets/Fruity.jpeg";
import musk from "../assets/musk.jpeg";
import sweet from "../assets/Baked_Vanilla.jpeg";

const scentMeta = {
  aqua: {
    title: "Aqua Collection",
    description: "Fresh, aquatic fragrances that awaken your senses.",
    image: Fresh,
  },
  fruity: {
    title: "Fruity Collection",
    description: "A vibrant blend of fruity and refreshing notes.",
    image: Fruity,
  },
  musk: {
    title: "Musk Collection",
    description: "Deep, warm and addictive fragrances.",
    image: musk,
  },
  sweet: {
    title: "Sweet Collection",
    description: "Indulge in sweet, creamy and delicious fragrances.",
    image: sweet,
  },
};

function ScentCategory() {
  const { category } = useParams();
  const { products, addToCart } = useStore();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});

  const key = category?.toLowerCase();
  const scent = scentMeta[key];

  if (!scent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif mb-4">Collection not found</h1>
        <Link to="/" className="text-xs uppercase tracking-widest underline">
          Return Home
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter(
    (item) => item.category.toLowerCase() === key
  );

  const handleQtyChange = (productId, delta, maxStock) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated = current + delta;
      if (updated < 1 || updated > maxStock) return prev;
      return { ...prev, [productId]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-black">
      {/* Category Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img
          src={scent.image}
          alt={scent.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-5">
          <p className="text-xs tracking-[0.4em] mb-4">ZAYD BLENDS</p>
          <h1 className="text-4xl md:text-6xl font-serif">{scent.title}</h1>
          <p className="mt-5 text-sm md:text-base tracking-wide">
            {scent.description}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-3">
            FIND YOUR SIGNATURE SCENT
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">
            Explore {scent.title}
          </h2>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-outfit">
            {categoryProducts.map((product) => {
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

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <span className="text-xs">
                          <span className="text-orange-400">★</span> {product.rating || "4.5"}
                        </span>
                      </div>

                      <p className="text-gray-500 text-xs mt-1 tracking-wide">
                        {product.category.toUpperCase()} | {product.gender}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <p className="font-medium text-sm">₹{product.price}</p>
                        <p className="text-xs text-gray-400">
                          {outOfStock ? "0 available" : `${product.stock} available`}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <span className="border border-gray-200 rounded-md px-2.5 py-1.5 text-xs">
                          {product.size}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Quantity Counter Control */}
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
          <p className="text-center text-gray-500 py-10">
            Products from this collection will appear here.
          </p>
        )}
      </section>
    </div>
  );
}

export default ScentCategory;
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function Featured() {
  const { products, addToCart } = useStore();
  const [selectedOptions, setSelectedOptions] = useState({});

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="px-5 md:px-8 py-12">
      {/* Heading with VIEW ALL button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-outfit text-3xl md:text-4xl">
          FEATURED COLLECTION
        </h1>

        <Link
          to="/shop"
          className="font-outfit text-sm font-medium tracking-wider hover:underline flex items-center gap-1"
        >
          VIEW ALL →
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featuredProducts.map((product) => {
          const activeOption = selectedOptions[product.id] || product.size;
          const outOfStock = product.stock <= 0;

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                    ↗ {product.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-outfit text-sm font-medium">
                    {product.name}
                  </h2>
                  <span className="text-xs whitespace-nowrap">
                    <span className="text-orange-400">★</span> {product.rating}
                  </span>
                </div>

                <p className="text-gray-500 text-xs mt-1 tracking-wide">
                  {product.category.toUpperCase()} | {product.gender} | {product.usage}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-outfit text-sm">₹{product.price}</p>
                  <p className="text-xs text-gray-400">
                    {outOfStock ? "Sold Out" : `${product.stock} left`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {/* Option 1: Standard Size */}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [product.id]: product.size,
                      })
                    }
                    className={`border rounded-md px-2 py-2 text-xs cursor-pointer ${
                      activeOption === product.size
                        ? "border-black bg-black text-white"
                        : "border-gray-200"
                    }`}
                  >
                    {product.size}
                  </button>

                  {/* Option 2: Redirects to Personalized Page */}
                  <Link
                    to="/personalized-perfume"
                    className="border border-gray-200 rounded-md px-2 py-2 text-xs flex items-center justify-center hover:border-black transition text-center text-gray-800 bg-white font-medium"
                  >
                    ✥ Personalized
                  </Link>
                </div>

                <button
                  disabled={outOfStock}
                  onClick={() => addToCart(product, activeOption)}
                  className={`w-full rounded-lg py-3 mt-4 text-sm font-semibold transition ${
                    outOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#191919] text-white hover:bg-gray-700 cursor-pointer"
                  }`}
                >
                  {outOfStock ? "Out of Stock" : "Quick Add"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
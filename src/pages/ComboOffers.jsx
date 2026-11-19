import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function ComboOffer() {
  const { products, addToCart, setCartOpen } = useStore();
  const [selectedBundleIds, setSelectedBundleIds] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleSelect = (productId) => {
    setErrorMsg("");
    if (selectedBundleIds.includes(productId)) {
      setSelectedBundleIds(selectedBundleIds.filter((id) => id !== productId));
    } else {
      if (selectedBundleIds.length >= 4) {
        setErrorMsg("You can select up to 4 perfumes for the Buy 3 Get 1 Free combo.");
        return;
      }
      setSelectedBundleIds([...selectedBundleIds, productId]);
    }
  };

  const handleAddBundleToCart = () => {
    if (selectedBundleIds.length !== 4) {
      setErrorMsg("Please select exactly 4 perfumes to complete your Buy 3 Get 1 Free bundle.");
      return;
    }

    selectedBundleIds.forEach((id) => {
      const prod = products.find((p) => p.id === id);
      if (prod) {
        addToCart(prod, prod.size || "100 ML");
      }
    });

    setSelectedBundleIds([]);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-[#211b1d] font-outfit">
      {/* Banner Header */}
      <section className="bg-[#260b19] text-white py-16 md:py-24 px-5 text-center">
        <p className="text-[11px] tracking-[0.45em] text-[#e9b5c5] uppercase mb-3">
          INTERACTIVE BUNDLE OFFER
        </p>
        <h1 className="font-serif text-4xl md:text-6xl mb-4">
          Select Any 3, Get 1 Free
        </h1>
        <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
          Choose <span className="font-semibold text-[#e9b5c5]">4 perfumes</span> below of your choice. The lowest-priced bottle will automatically become 100% free!
        </p>
      </section>

      {/* Sticky Selection Counter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[76px] z-30 py-4 px-5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs tracking-widest uppercase text-gray-500">
              Selected Bundle:
            </span>{" "}
            <span className="font-semibold text-sm">
              {selectedBundleIds.length} / 4 items chosen
            </span>
          </div>

          <button
            onClick={handleAddBundleToCart}
            className={`px-8 py-3 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition cursor-pointer ${
              selectedBundleIds.length === 4
                ? "bg-[#260b19] text-white hover:bg-[#4b101f]"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            Add Bundle to Bag →
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="max-w-xl mx-auto mt-6 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg text-center">
          {errorMsg}
        </div>
      )}

      {/* Selectable Products Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isSelected = selectedBundleIds.includes(product.id);
            const outOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-xl overflow-hidden shadow-sm transition duration-300 flex flex-col justify-between border-2 ${
                  isSelected ? "border-[#260b19] ring-2 ring-[#260b19]/20" : "border-gray-200"
                }`}
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      outOfStock ? "opacity-60 grayscale" : "hover:scale-105"
                    }`}
                  />
                  {isSelected && (
                    <span className="absolute top-4 right-4 bg-[#260b19] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      ✓ Selected
                    </span>
                  )}
                  {outOfStock && (
                    <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                      Sold Out
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
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

                    <p className="font-medium text-sm mt-2">₹{product.price}</p>
                  </div>

                  <button
                    disabled={outOfStock}
                    onClick={() => handleToggleSelect(product.id)}
                    className={`w-full rounded-lg py-3 mt-5 text-xs tracking-widest uppercase font-semibold transition cursor-pointer ${
                      outOfStock
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                        : "bg-[#260b19] text-white hover:bg-[#4b101f]"
                    }`}
                  >
                    {outOfStock
                      ? "Unavailable"
                      : isSelected
                      ? "Remove from Bundle"
                      : "Select for Bundle"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ComboOffer;
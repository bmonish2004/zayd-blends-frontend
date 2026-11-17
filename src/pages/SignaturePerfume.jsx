import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function SignaturePerfume() {
  const { products, addToCart } = useStore();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});

  // Dynamically filter products checked as signature by the admin
  const signaturePerfumes = products.filter((item) => item.signature);

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
      {/* Editorial Hero Banner */}
      <section className="relative bg-[#260b19] text-white py-20 md:py-28 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4b101f,transparent_60%)] opacity-80" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.45em] text-[#e9b5c5] uppercase mb-4">
            ZAYD BLENDS • THE ICONS
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight">
            Signature{" "}
            <span className="italic text-[#e9a6bb]">Perfumes</span>
          </h1>
          <div className="w-20 h-[2px] bg-[#e9a6bb] mx-auto my-6" />
          <p className="font-outfit text-sm md:text-base text-white/80 max-w-xl mx-auto leading-7 font-light">
            Our defining creations—crafted in small batches for enduring
            longevity, effortless elegance, and an unmistakable trail.
          </p>
        </div>
      </section>

      {/* Alternating Luxury Showcase (with Empty State Fallback) */}
      {signaturePerfumes.length > 0 ? (
        <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24 space-y-20 md:space-y-28">
          {signaturePerfumes.map((product, index) => {
            const isReversed = index % 2 === 1;
            const activeOption = selectedOptions[product.id] || product.size;
            const qty = quantities[product.id] || 1;
            const outOfStock = product.stock <= 0;
            const editionNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={product.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100"
              >
                {/* Bottle Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-2xl bg-[#f3eff1] group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        outOfStock ? "opacity-60 grayscale" : "group-hover:scale-105"
                      }`}
                    />

                    {outOfStock ? (
                      <span className="absolute top-5 left-5 bg-black text-white text-xs tracking-widest uppercase px-4 py-1.5 rounded-full font-outfit">
                        Sold Out
                      </span>
                    ) : product.badge ? (
                      <span className="absolute top-5 left-5 bg-[#260b19]/90 backdrop-blur-xs text-[#e9b5c5] text-xs tracking-widest uppercase px-4 py-1.5 rounded-full font-outfit">
                        ✦ {product.badge}
                      </span>
                    ) : null}

                    <span className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-xs text-[#211b1d] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-xs font-outfit">
                      <span className="text-orange-400">★</span>{" "}
                      {product.rating || "4.5"} / 5
                    </span>
                  </div>
                </div>

                {/* Details & Purchase Column */}
                <div
                  className={`lg:col-span-6 font-outfit ${
                    isReversed ? "lg:order-1 lg:pr-4" : "lg:order-2 lg:pl-4"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-[0.3em] text-[#9b6b80] uppercase">
                      NO. {editionNumber} — {product.category} COLLECTION
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#211b1d] tracking-tight">
                    {product.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-full bg-[#faf8f7] border border-gray-200 text-[11px] tracking-wider uppercase text-gray-600">
                      {product.gender}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f7] border border-gray-200 text-[11px] tracking-wider uppercase text-gray-600">
                      {product.usage}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f7] border border-gray-200 text-[11px] tracking-wider uppercase text-gray-600">
                      Long Lasting Extrait
                    </span>
                  </div>

                  <div className="w-14 h-[2px] bg-[#c49aaa] my-6" />

                  <div className="flex items-baseline gap-4">
                    <p className="text-2xl sm:text-3xl font-semibold text-[#260b19]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        outOfStock
                          ? "bg-red-50 text-red-600"
                          : product.stock <= 5
                          ? "bg-amber-50 text-amber-800"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {outOfStock
                        ? "Out of Stock"
                        : `${product.stock} bottles in stock`}
                    </span>
                  </div>

                  <div className="mt-7">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                      Select Bottle Option
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [product.id]: product.size,
                          })
                        }
                        className={`px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase border transition cursor-pointer ${
                          activeOption === product.size
                            ? "border-[#260b19] bg-[#260b19] text-white font-medium"
                            : "border-gray-300 text-gray-700 hover:border-black"
                        }`}
                      >
                        Classic {product.size}
                      </button>

                      <Link
                        to="/personalized-perfume"
                        className="px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase border border-gray-300 text-gray-700 hover:border-black transition flex items-center justify-center bg-white font-medium cursor-pointer"
                      >
                        ✥ Personalized Engraving
                      </Link>
                    </div>
                  </div>

                  {/* Quantity Counter Control */}
                  {!outOfStock && (
                    <div className="flex items-center justify-between border border-gray-300 rounded-xl mt-6 px-4 py-3 max-w-xs">
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleQtyChange(product.id, -1, product.stock)}
                          className="text-base font-bold text-gray-600 hover:text-black w-7 h-7 flex items-center justify-center rounded bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1, product.stock)}
                          className="text-base font-bold text-gray-600 hover:text-black w-7 h-7 flex items-center justify-center rounded bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      disabled={outOfStock}
                      onClick={() => addToCart(product, activeOption, qty)}
                      className={`flex-1 py-4 px-8 rounded-xl text-xs tracking-[0.25em] uppercase font-semibold transition cursor-pointer ${
                        outOfStock
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#260b19] text-white hover:bg-[#4b101f]"
                      }`}
                    >
                      {outOfStock ? "Sold Out" : `Add ${qty} to Bag`}
                    </button>

                    <Link
                      to={`/scents/${product.category.toLowerCase()}`}
                      className="py-4 px-6 rounded-xl border border-gray-300 text-center text-xs tracking-[0.2em] uppercase text-gray-700 hover:border-black hover:text-black transition flex items-center justify-center"
                    >
                      More {product.category} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="max-w-xl mx-auto px-5 py-24 text-center font-outfit">
          <p className="text-xs tracking-[0.3em] text-[#9b6b80] uppercase mb-3">
            Curating New Icons
          </p>
          <h2 className="font-serif text-3xl text-[#211b1d] mb-4">
            No Signature Perfumes Selected
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Log in to the admin portal to check perfumes as Signature Edition items.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-[#260b19] text-white text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#4b101f] transition"
          >
            Explore All Perfumes →
          </Link>
        </section>
      )}

      {/* Bottom CTA to Full Catalog */}
      <section className="bg-[#260b19] text-white py-16 px-5 text-center">
        <p className="text-xs tracking-[0.4em] text-[#e9a6bb] uppercase mb-3">
          DISCOVER MORE
        </p>
        <h2 className="font-serif text-3xl md:text-4xl mb-6">
          Explore the Complete Zayd Blends Collection
        </h2>
        <Link
          to="/shop"
          className="inline-block px-8 py-4 bg-[#e9a6bb] text-[#260b19] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition"
        >
          View All Fragrances →
        </Link>
      </section>
    </div>
  );
}

export default SignaturePerfume;
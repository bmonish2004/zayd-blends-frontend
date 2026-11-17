import { useState } from "react";
import { useStore } from "../context/StoreContext";
import EngravingBanner from "../assets/personalize_img2.png"; // Update path if needed

const fontStyles = [
  { id: "classic", name: "Classic", fontClass: "font-serif tracking-widest" },
  { id: "elegant", name: "Elegant", fontClass: "font-serif italic" },
  { id: "playful", name: "Playful", fontClass: "font-sans font-bold tracking-wider" },
  { id: "cursive", name: "Cursive", fontClass: "font-serif italic tracking-wide" },
  { id: "roman", name: "ROMAN", fontClass: "font-mono tracking-widest" },
  { id: "sleek", name: "Sleek", fontClass: "font-sans uppercase tracking-widest" },
];

function PersonalizedPerfume() {
  const { products, addToCart } = useStore();

  // Customization State
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(products[0]?.id || "");
  const [engravingText, setEngravingText] = useState("");
  const [selectedFont, setSelectedFont] = useState(fontStyles[1]);
  const [quantity, setQuantity] = useState(1);

  // Active preview product image
  const selectedProduct = products.find((p) => p.id === selectedPerfumeId) || products[0];
  
  // FIX: Wrapped the price in Number() to prevent string concatenation (e.g. "2500" + 250 = "2500250")
  const unitPrice = Number(selectedProduct?.price || 2000) + 250; 

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const customOption = `Personalized: "${engravingText || "Custom"}" (${selectedFont.name} font)`;
    addToCart(selectedProduct, customOption, quantity, true); // true adds ₹250 fee
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-[#211b1d] font-outfit py-10 px-5 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* LEFT COLUMN: Promotional Engraving Banner Image */}
        <div className="lg:col-span-7 flex">
          <div className="relative w-full rounded-3xl overflow-hidden bg-[#111] shadow-lg flex items-center justify-center">
            <img
              src={EngravingBanner}
              alt="Custom Perfume Engraving Live"
              // FIX: object-left anchors text to the screen edge on mobile. 
              // Reduced mobile min-height to 300px prevents extreme cropping.
              className="w-full h-full object-cover object-left md:object-center min-h-[300px] md:min-h-[480px] lg:min-h-full"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Customization Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="font-serif text-3xl md:text-4xl text-[#211b1d]">
                Personalize Your Bottle
              </h1>
              <span className="text-xs bg-[#260b19]/10 text-[#260b19] px-3 py-1 rounded-full font-semibold">
                +₹250 Engraving Fee
              </span>
            </div>

            <div className="space-y-5">
              {/* Choose Perfume Scent Base */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">
                  Choose Perfume Base
                </label>
                <select
                  value={selectedPerfumeId}
                  onChange={(e) => setSelectedPerfumeId(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#260b19]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category.toUpperCase()}) - ₹{p.price} (+₹250 Engraving)
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Engraving Input (Dynamic Font Applied Here) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">
                  Custom Engraving Text (Max 20 chars)
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. Forever Yours ❤️"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#260b19] ${selectedFont.fontClass}`}
                />
              </div>

              {/* Choose Font Style */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">
                  Choose Font Style
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {fontStyles.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setSelectedFont(font)}
                      className={`py-2.5 px-3 rounded-xl border text-xs transition cursor-pointer ${
                        selectedFont.id === font.id
                          ? "border-[#260b19] bg-[#260b19] text-white font-semibold"
                          : "border-gray-200 text-gray-700 hover:border-black bg-gray-50"
                      } ${font.fontClass}`}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="pt-6 mt-6 border-t border-gray-200 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-3.5 text-sm font-bold hover:bg-gray-200 transition cursor-pointer"
              >
                -
              </button>
              <span className="px-4 text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(selectedProduct?.stock || 10, quantity + 1))}
                className="px-3.5 py-3.5 text-sm font-bold hover:bg-gray-200 transition cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-[#260b19] hover:bg-[#4b101f] text-white rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition shadow-md cursor-pointer"
            >
              Add to Cart • ₹{unitPrice * quantity}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PersonalizedPerfume;
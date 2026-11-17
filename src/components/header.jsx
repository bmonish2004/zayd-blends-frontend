import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { IoCart } from "react-icons/io5";
import Logo from "../../src/assets/Logo.png";
import hamburger from "../../src/assets/hamburger.png";
import { useState, useRef, useEffect } from "react";
import { useStore } from "../context/StoreContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    products,
    cart,
    cartCount,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQty,
    calculatedSubtotal,
    calculatedDiscount,
    finalTotal,
  } = useStore();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products based on search input
  const searchResults = searchQuery.trim() === "" ? [] : products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.usage && item.usage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <section className="sticky top-0 z-50 bg-white flex items-center justify-around py-5 shadow-xs relative">
        <button
          ref={buttonRef}
          type="button"
          className="lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <img
            src={hamburger}
            alt="ham"
            className="lg:hidden p-2 border-0 rounded hover:bg-gray-100 w-11 cursor-pointer shadow-2xl"
          />
        </button>

        <div className="flex items-center gap-3">
          <Link to="/">
            <img src={Logo} alt="Zayd Blend Logo" className="w-17" />
          </Link>
          <h1 className="font-bold text-2xl font-outfit w-20 md:w-fit">
            Zayd Blend
          </h1>
        </div>

        <div className="items-center space-x-3 font-outfit text-lg tracking-wide font-light hidden lg:flex">
          <Link to="/" className="hover:bg-black hover:text-white px-3 py-2 border-0 rounded-4xl">
            Home
          </Link>
          <Link to="/signature-perfume" className="hover:bg-black hover:text-white px-3 py-2 border-0 rounded-4xl">
            Signature Perfume
          </Link>
          <Link to="/personalized-perfume" className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Personalized Perfume
          </Link>
          <Link to="/about" className="hover:bg-black hover:text-white px-3 py-2 border-0 rounded-4xl">
            About Us
          </Link>
        </div>

        {/* Search, Admin Profile, and Cart Icons */}
        <div className="flex gap-4 md:gap-7 items-center">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="cursor-pointer"
          >
            <FiSearch className="w-8 h-7 hover:text-[#9b6b80] transition" />
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer hover:text-[#9b6b80] transition"
            aria-label="Open Cart"
          >
            <IoCart className="w-8 h-8" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#260b19] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <nav ref={menuRef} className="absolute top-full left-0 w-full bg-white border-b shadow-lg lg:hidden">
            <ul className="px-5 py-3 w-full text-3xl font-outfit">
              <li className="block py-3 text-gray-700 hover:underline">
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              </li>
              <li className="block py-3 text-gray-700 hover:underline">
                <Link to="/signature-perfume" onClick={() => setMenuOpen(false)}>Signature Perfume</Link>
              </li>
              <li className="block py-3 hover:underline bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                <Link to="/personalized-perfume" onClick={() => setMenuOpen(false)}>Personalized Perfume</Link>
              </li>
              <li className="block py-3 text-gray-700 hover:underline">
                <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
              </li>
            </ul>
          </nav>
        )}
      </section>

      {/* Interactive Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col items-center pt-20 px-4 font-outfit"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="font-serif text-xl">Search Fragrances</h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-black cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category (e.g. Aqua), or scent notes..."
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#260b19]"
              />
            </div>

            {/* Results List */}
            {searchQuery.trim() !== "" && (
              <div className="mt-4 max-h-[55vh] overflow-y-auto divide-y">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        navigate(`/scents/${item.category.toLowerCase()}`);
                      }}
                      className="py-3 flex items-center justify-between hover:bg-neutral-50 px-3 rounded-lg cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover rounded-md bg-gray-100"
                        />
                        <div>
                          <p className="font-medium text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            {item.category} Collection • {item.size}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#260b19]">
                        ₹{item.price}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-10 text-sm">
                    No fragrances found matching &quot;{searchQuery}&quot;.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide-Over Shopping Cart Drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 font-outfit shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="font-serif text-2xl">Your Bag ({cartCount})</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-sm uppercase tracking-wider text-gray-500 hover:text-black cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-20">
                  Your shopping bag is currently empty.
                </p>
              ) : (
                <div className="divide-y max-h-[60vh] overflow-y-auto mt-4">
                  {cart.map((item) => {
                    const itemTotalPrice = item.paidQty * item.price;
                    return (
                      <div
                        key={`${item.id}-${item.option}`}
                        className="py-4 flex items-center justify-between gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-400 mb-1">
                            {item.option}
                            {item.freeQty > 0 && (
                              <span className="ml-1.5 text-green-700 font-semibold">
                                ({item.freeQty} Free!)
                              </span>
                            )}
                          </p>

                          {/* Cart Item Quantity Counter */}
                          <div className="flex items-center gap-3 my-2">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQty(item.id, item.option, -1)}
                                className="px-2.5 py-1 bg-gray-50 hover:bg-gray-200 text-xs font-bold transition cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-semibold">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.option, 1)}
                                disabled={item.qty >= item.stock}
                                className={`px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                                  item.qty >= item.stock
                                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                    : "bg-gray-50 hover:bg-gray-200"
                                }`}
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, item.option)}
                              className="text-xs text-red-600 hover:underline cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>

                          <p className="text-sm font-semibold mt-1">
                            {itemTotalPrice === 0 ? (
                              <span className="text-green-700 uppercase tracking-wider font-bold">FREE</span>
                            ) : (
                              `₹${itemTotalPrice}`
                            )}
                            {item.freeQty > 0 && item.paidQty > 0 && (
                              <span className="text-xs text-gray-400 line-through ml-2">
                                ₹{item.qty * item.price}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 font-outfit">
                <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{calculatedSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {calculatedDiscount > 0 && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Buy 2 Get 1 Free Discount</span>
                      <span>-₹{calculatedDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-semibold text-black pt-2 border-t">
                    <span>Final Total</span>
                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918122993247?text=${encodeURIComponent(
                    `Hello Zayd Blends! I would like to order:\n\n` +
                      cart.map((i) =>
                          `- ${i.name} (${i.option}) x${i.qty} ${
                            i.freeQty > 0 ? `(${i.freeQty} free)` : ""
                          } = ₹${i.paidQty * i.price}`
                        ).join("\n") +
                      `\n\nSubtotal: ₹${calculatedSubtotal}` +
                      (calculatedDiscount > 0
                        ? `\nPromo Discount: -₹${calculatedDiscount}`
                        : "") +
                      `\nFinal Total: ₹${finalTotal}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-3.5 bg-[#260b19] text-white rounded-lg text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#4b101f] transition"
                >
                  Order via WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
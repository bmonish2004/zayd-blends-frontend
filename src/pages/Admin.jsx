import { useState } from "react";
import { useStore } from "../context/StoreContext";

function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("zayd_admin_auth") === "true"
  );

  // Auth Views: "login" | "forgot_request" | "forgot_verify"
  const [authView, setAuthView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password States
  const [resetEmail, setResetEmail] = useState("");
  const [verifyPhone, setVerifyPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Product Forms & Editing States
  const [form, setForm] = useState({
    name: "", category: "aqua", gender: "UNISEX", usage: "FRESHNESS",
    size: "100 ML", price: "", stock: "", badge: "New Launch",
    featured: false, signature: false, image: "",
  });
  const [productError, setProductError] = useState("");
  const [productSuccess, setProductSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ price: "", stock: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(""); setAuthSuccess(""); setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin-login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("zayd_admin_auth", "true");
      } else {
        setAuthError(data.message || "Invalid admin credentials.");
      }
    } catch (err) { setAuthError("Unable to connect to server."); }
    finally { setLoading(false); }
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setAuthError(""); setAuthSuccess(""); setLoading(true);
    try {
      const response = await fetch("https://zayd-blend-ecommerce.onrender.com/api/admin-send-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, phone: verifyPhone }),
      });
      const data = await response.json();
      if (data.success) {
        setAuthSuccess("An OTP has been sent to your admin email.");
        setAuthView("forgot_verify");
      } else {
        setAuthError(data.message || "Failed to send OTP.");
      }
    } catch (err) { setAuthError("Unable to connect to server."); }
    finally { setLoading(false); }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setAuthError(""); setAuthSuccess("");
    if (newPassword.length < 6) return setAuthError("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword) return setAuthError("Passwords do not match.");

    setLoading(true);
    try {
      const response = await fetch("https://zayd-blend-ecommerce.onrender.com/api/admin-reset-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, otp, newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        setAuthSuccess("Password successfully updated! Please log in.");
        setAuthView("login");
        setPassword(""); setResetEmail(""); setVerifyPhone(""); setOtp(""); setNewPassword(""); setConfirmPassword("");
      } else {
        setAuthError(data.message || "Invalid or expired OTP.");
      }
    } catch (err) { setAuthError("Unable to connect to server."); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); sessionStorage.removeItem("zayd_admin_auth"); setEmail(""); setPassword("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 500; const MAX_HEIGHT = 500;
        let width = img.width; let height = img.height;
        if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
        else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        setForm((prev) => ({ ...prev, image: canvas.toDataURL("image/jpeg", 0.75) }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setProductError(""); setProductSuccess("");
    if (!form.name.trim() || !form.price || !form.image) return setProductError("Fill all required fields.");
    try {
      addProduct(form);
      setProductSuccess("Product added successfully!");
      setForm({ name: "", category: "aqua", gender: "UNISEX", usage: "FRESHNESS", size: "100 ML", price: "", stock: "", badge: "New Launch", featured: false, signature: false, image: "" });
      setTimeout(() => setProductSuccess(""), 3000);
    } catch (err) { setProductError("Storage limit reached."); }
  };

  const startEdit = (item) => { setEditingId(item.id); setEditValues({ price: item.price, stock: item.stock }); };
  const saveEdit = (id) => { updateProduct(id, { price: Number(editValues.price), stock: Number(editValues.stock) }); setEditingId(null); };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#faf8f7] px-5 py-12 font-outfit">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md shadow-sm">
          <p className="text-[11px] tracking-[0.4em] text-[#9b6b80] uppercase mb-2">ZAYD BLENDS • SECURE PORTAL</p>

          {authView === "login" && (
            <>
              <h1 className="font-serif text-3xl text-[#211b1d] mb-2">Admin Login</h1>
              <p className="text-xs text-gray-500 mb-6">Sign in to manage store inventory securely.</p>
              {authSuccess && <div className="bg-green-50 text-green-700 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-green-200">{authSuccess}</div>}
              {authError && <div className="bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-red-200">{authError}</div>}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-600 mb-1.5">Email ID</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Admin Email" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#260b19]" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs tracking-wider uppercase text-gray-600">Password</label>
                    <button type="button" onClick={() => { setAuthView("forgot_request"); setAuthError(""); setAuthSuccess(""); }} className="text-xs text-[#9b6b80] hover:text-[#260b19] hover:underline cursor-pointer">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm pr-16 focus:outline-none focus:border-[#260b19]" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black cursor-pointer">{showPassword ? "Hide" : "Show"}</button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 mt-2 bg-[#260b19] text-white rounded-lg text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#4b101f] transition cursor-pointer">
                  {loading ? "Authenticating..." : "Sign In securely"}
                </button>
              </form>
            </>
          )}

          {authView === "forgot_request" && (
            <>
              <h1 className="font-serif text-3xl text-[#211b1d] mb-2">Reset Password</h1>
              <p className="text-xs text-gray-500 mb-6">Verify details to receive a 6-digit OTP via email.</p>
              {authError && <div className="bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-red-200">{authError}</div>}
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-600 mb-1.5">Admin Email</label>
                  <input type="email" required value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="admin@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#260b19]" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-600 mb-1.5">Registered Mobile</label>
                  <input type="tel" required value={verifyPhone} onChange={(e) => setVerifyPhone(e.target.value)} placeholder="10-digit number" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#260b19]" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#260b19] text-white rounded-lg text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#4b101f] transition cursor-pointer">
                  {loading ? "Sending..." : "Send Verification OTP"}
                </button>
                <button type="button" onClick={() => { setAuthView("login"); setAuthError(""); }} className="w-full py-2 text-xs text-gray-500 hover:text-black transition cursor-pointer">← Back to Login</button>
              </form>
            </>
          )}

          {authView === "forgot_verify" && (
            <>
              <h1 className="font-serif text-3xl text-[#211b1d] mb-2">Enter OTP</h1>
              <p className="text-xs text-gray-500 mb-6">Check {resetEmail} for your 6-digit code.</p>
              {authSuccess && <div className="bg-green-50 text-green-700 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-green-200">{authSuccess}</div>}
              {authError && <div className="bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-red-200">{authError}</div>}
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-600 mb-1.5">6-Digit OTP</label>
                  <input type="text" required maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm tracking-[0.5em] text-center font-bold focus:outline-none focus:border-[#260b19]" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-600 mb-1.5">New Password</label>
                  <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min 6 chars" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#260b19]" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-600 mb-1.5">Confirm Password</label>
                  <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#260b19]" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#260b19] text-white rounded-lg text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#4b101f] transition cursor-pointer">
                  {loading ? "Verifying..." : "Verify OTP & Reset"}
                </button>
                <button type="button" onClick={() => { setAuthView("forgot_request"); setAuthError(""); setAuthSuccess(""); }} className="w-full py-2 text-xs text-gray-500 hover:text-black transition cursor-pointer">← Resend OTP</button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD (Kept identical to before) ---
  return (
    <div className="min-h-screen bg-[#faf8f7] py-12 px-5 md:px-10 font-outfit">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end border-b border-gray-200 pb-6 mb-10 gap-4">
          <div>
            <p className="text-xs tracking-[0.4em] text-[#9b6b80] uppercase">ZAYD BLENDS MANAGEMENT</p>
            <h1 className="font-serif text-3xl md:text-4xl text-[#211b1d] mt-1">Inventory & Pricing Control</h1>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-600">Total Products: <span className="font-semibold text-black">{products.length}</span></p>
            <button onClick={handleLogout} className="px-4 py-2 border border-gray-300 rounded-lg text-xs uppercase tracking-wider hover:bg-black hover:text-white transition cursor-pointer">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
            <h2 className="font-serif text-2xl text-[#211b1d] mb-5">Add New Perfume</h2>
            {productSuccess && <div className="bg-green-50 text-green-700 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-green-200">{productSuccess}</div>}
            {productError && <div className="bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-red-200">{productError}</div>}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Scent Category *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                  <option value="aqua">Aqua</option><option value="fruity">Fruity</option><option value="musk">Musk</option><option value="sweet">Sweet</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Perfume Name *</label>
                <input type="text" required placeholder="e.g. OCEAN MIST" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Gender</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                    <option value="UNISEX">UNISEX</option><option value="MEN">MEN</option><option value="WOMEN">WOMEN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Occasion</label>
                  <input type="text" placeholder="e.g. PARTY" value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Price (₹) *</label>
                  <input type="number" required min="1" placeholder="2000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Available Qty *</label>
                  <input type="number" required min="0" placeholder="10" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Size</label>
                  <input type="text" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Badge</label>
                  <input type="text" placeholder="Selling Fast" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" />
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#260b19]" />
                  Show in Home Page Featured
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.signature} onChange={(e) => setForm({ ...form, signature: e.target.checked })} className="accent-[#260b19]" />
                  Show in Signature Page
                </label>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Bottle Image *</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:uppercase file:bg-[#260b19] file:text-white cursor-pointer" />
                {form.image && <img src={form.image} alt="Preview" className="mt-3 h-24 w-20 object-cover rounded-lg border" />}
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#260b19] text-white rounded-lg text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#4b101f] transition cursor-pointer">
                Add Product to Store
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <h2 className="font-serif text-2xl text-[#211b1d] mb-5">Live Store Products</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="py-3 pr-4">Perfume</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price (₹)</th>
                  <th className="py-3 px-3">Available</th>
                  <th className="py-3 px-3">Featured</th>
                  <th className="py-3 px-3">Signature</th>
                  <th className="py-3 pl-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {products.map((item) => {
                  const isEditing = editingId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-3.5 pr-4 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-md bg-gray-100" />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.size}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 uppercase text-xs tracking-wider text-gray-600">{item.category}</td>
                      <td className="py-3.5 px-3">
                        {isEditing ? (
                          <input type="number" value={editValues.price} onChange={(e) => setEditValues({ ...editValues, price: e.target.value })} className="w-24 border border-black rounded px-2 py-1 text-sm" />
                        ) : (<span>₹{item.price}</span>)}
                      </td>
                      <td className="py-3.5 px-3">
                        {isEditing ? (
                          <input type="number" min="0" value={editValues.stock} onChange={(e) => setEditValues({ ...editValues, stock: e.target.value })} className="w-20 border border-black rounded px-2 py-1 text-sm" />
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.stock === 0 ? "bg-red-100 text-red-700" : item.stock <= 5 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-700"}`}>
                            {item.stock === 0 ? "Out of stock" : `${item.stock} left`}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <input type="checkbox" checked={!!item.featured} onChange={(e) => updateProduct(item.id, { featured: e.target.checked })} className="accent-[#260b19] cursor-pointer" />
                      </td>
                      <td className="py-3.5 px-3">
                        <input type="checkbox" checked={!!item.signature} onChange={(e) => updateProduct(item.id, { signature: e.target.checked })} className="accent-[#260b19] cursor-pointer" />
                      </td>
                      <td className="py-3.5 pl-3 text-right space-x-3 whitespace-nowrap">
                        {isEditing ? (
                          <>
                            <button onClick={() => saveEdit(item.id)} className="text-xs uppercase font-semibold text-green-700 hover:underline cursor-pointer">Save</button>
                            <button onClick={() => setEditingId(null)} className="text-xs uppercase text-gray-500 hover:underline cursor-pointer">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(item)} className="text-xs uppercase font-medium text-[#260b19] hover:underline cursor-pointer">Edit</button>
                            <button onClick={() => deleteProduct(item.id)} className="text-xs uppercase font-medium text-red-600 hover:underline cursor-pointer">Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
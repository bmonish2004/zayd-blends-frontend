
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/header'
import { Home } from './pages/Home'
import Footer from './components/footer'
import About from './pages/About'

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ScentCategory from "./pages/ScentCategory";

import Admin from "./pages/Admin";
import ShopAll from "./pages/ShopAll";
import SignaturePerfume from "./pages/SignaturePerfume";
import ComboOffer from "./pages/ComboOffers";
import PersonalizedPerfume from "./pages/PersonalizedPerfume";

function App() {

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/scents/:category" element={<ScentCategory/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/shop" element={<ShopAll />} />
        <Route path="/signature-perfume" element={<SignaturePerfume/>} />
        <Route path="/combo-offer" element={<ComboOffer />} />
        <Route path="/personalized-perfume" element={<PersonalizedPerfume />} />
        
      </Routes>

      <Footer />
    </>
  )
}

export default App

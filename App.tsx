import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Fabrics from './pages/Fabrics';
import About from './pages/About';
import Booking from './pages/Booking';
import Order from './pages/Order';
import ProductDetail from './pages/ProductDetail';
import Reviews from './pages/Reviews';
import Social from './pages/Social';
import HowItWorks from './pages/HowItWorks';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import AboutUs from './pages/aboutus';
import Catalogue from './pages/Catalogue';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
      <Route path="/Collections" element={<Layout currentPageName="Collections"><Collections /></Layout>} />
      <Route path="/product/:id" element={<Layout currentPageName="Collections"><ProductDetail /></Layout>} />
      <Route path="/Fabrics" element={<Layout currentPageName="Fabrics"><Fabrics /></Layout>} />
      <Route path="/Catalogue" element={<Layout currentPageName="Catalogue"><Catalogue /></Layout>} />
      <Route path="/About" element={<Layout currentPageName="About"><About /></Layout>} />
      <Route path="/aboutus" element={<Layout currentPageName="AboutUs"><AboutUs /></Layout>} />
      <Route path="/Booking" element={<Layout currentPageName="Booking"><Booking /></Layout>} />
      <Route path="/Order" element={<Layout currentPageName="Order"><Order /></Layout>} />
      <Route path="/Reviews" element={<Layout currentPageName="Reviews"><Reviews /></Layout>} />
      <Route path="/Social" element={<Layout currentPageName="Social"><Social /></Layout>} />
      <Route path="/HowItWorks" element={<Layout currentPageName="HowItWorks"><HowItWorks /></Layout>} />
      <Route path="/Gallery" element={<Layout currentPageName="Gallery"><Gallery /></Layout>} />
      <Route path="/Contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
      <Route path="/FAQs" element={<Layout currentPageName="FAQs"><FAQs /></Layout>} />
      <Route path="/PrivacyPolicy" element={<Layout currentPageName="PrivacyPolicy"><PrivacyPolicy /></Layout>} />
      <Route path="/Terms" element={<Layout currentPageName="Terms"><Terms /></Layout>} />
      <Route path="/RefundPolicy" element={<Layout currentPageName="RefundPolicy"><RefundPolicy /></Layout>} />
    </Routes>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
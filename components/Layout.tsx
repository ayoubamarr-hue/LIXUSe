import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import AiAssistant from './AiAssistant';

interface LayoutProps {
  children?: React.ReactNode;
  currentPageName: string;
}

const NAV_LINKS = [
  { name: 'Accueil', page: 'Home' },
  { name: 'Collections', page: 'Collections' },
  { name: 'Catalogue Tissus', page: 'Catalogue' },
  { name: 'L\'Atelier', page: 'About' },
  { name: 'Social', page: 'Social' },
  { name: 'Rendez-vous', page: 'Booking' },
  { name: 'Commander', page: 'Order', highlight: true }
];

export default function Layout({ children, currentPageName }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine header visibility
      // Hide when scrolling down more than 100px, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      // Show back to top button after scrolling down 500px
      setShowBackToTop(currentScrollY > 500);

      // Header background style change point
      setIsScrolled(currentScrollY > 50);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPageName === 'Home';
  // Updated header background logic: Transparent on Home top, Dark Green otherwise
  const headerBg = isScrolled || !isHome ? 'bg-[#2d4a3e] shadow-lg' : 'bg-transparent';
  // Updated text color logic: Always beige as requested by design language
  const textColor = 'text-[#d4b896]';

  // Always show header if mobile menu is open
  const headerVisible = isHeaderVisible || mobileMenuOpen;

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-500 transform ${headerBg} top-0 ${headerVisible ? 'translate-y-0' : '-translate-y-[150%]'}`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-end h-24">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                link.highlight ? (
                  <Link key={link.page} to={createPageUrl(link.page)}>
                    <Button className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] rounded-none px-6 font-medium">
                      {link.name}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className={`text-sm tracking-wide transition-colors hover:text-[#d4b896] ${
                      currentPageName === link.page 
                        ? 'text-[#d4b896]' 
                        : textColor
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden relative z-50 p-2 ${mobileMenuOpen ? 'text-[#d4b896]' : textColor}`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#2d4a3e] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={createPageUrl(link.page)}
                    className={`text-2xl font-light transition-colors ${
                      link.highlight 
                        ? 'text-[#d4b896]' 
                        : currentPageName === link.page 
                          ? 'text-[#d4b896]' 
                          : 'text-white/80 hover:text-[#d4b896]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 }}
                >
                  <Link
                    to={createPageUrl('HowItWorks')}
                    className={`text-2xl font-light transition-colors ${
                      currentPageName === 'HowItWorks'
                        ? 'text-[#d4b896]' 
                        : 'text-white/80 hover:text-[#d4b896]'
                    }`}
                  >
                    Comment ça marche
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 + 0.1 }}
                >
                  <Link
                    to={createPageUrl('Gallery')}
                    className={`text-2xl font-light transition-colors ${
                      currentPageName === 'Gallery'
                        ? 'text-[#d4b896]' 
                        : 'text-white/80 hover:text-[#d4b896]'
                    }`}
                  >
                    Galerie
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 + 0.2 }}
                >
                  <Link
                    to={createPageUrl('Contact')}
                    className={`text-2xl font-light transition-colors ${
                      currentPageName === 'Contact'
                        ? 'text-[#d4b896]' 
                        : 'text-white/80 hover:text-[#d4b896]'
                    }`}
                  >
                    Contact
                  </Link>
                </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-[#d4b896]/60"
              >
                <p className="text-sm">06 65 65 69 95</p>
                <p className="text-sm mt-1">Hay Riad, Rabat</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className={`flex-grow ${isHome ? '' : 'pt-24'}`}>
        {children}
      </main>

      {/* Footer - only show on non-home pages */}
      {!isHome && (
        <footer className="bg-[#2d4a3e] text-[#d4b896] py-16 border-t border-[#d4b896]/20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <img 
                  src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/lixus+logo%20(1).png"
                  alt="LIXUS"
                  className="h-14 mb-6"
                />
                <p className="text-[#d4b896]/80 leading-relaxed text-sm">
                  L'élégance masculine sur mesure, au cœur de Rabat.
                </p>
              </div>
              <div>
                <h4 className="text-[#d4b896] font-medium mb-6 uppercase tracking-wider text-sm">Découvrir</h4>
                <div className="space-y-3 text-sm">
                  <Link to={createPageUrl('Collections')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Collections</Link>
                  <Link to={createPageUrl('Catalogue')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Catalogue Tissus</Link>
                  <Link to={createPageUrl('HowItWorks')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Comment ça marche</Link>
                  <Link to={createPageUrl('Gallery')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Galerie Clients</Link>
                  <Link to={createPageUrl('Reviews')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Avis Clients</Link>
                </div>
              </div>
              <div>
                <h4 className="text-[#d4b896] font-medium mb-6 uppercase tracking-wider text-sm">Aide & Légal</h4>
                <div className="space-y-3 text-sm">
                  <Link to={createPageUrl('Contact')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Contact</Link>
                  <Link to={createPageUrl('FAQs')} className="block text-[#d4b896]/70 hover:text-white transition-colors">FAQs</Link>
                  <Link to={createPageUrl('PrivacyPolicy')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Politique de Confidentialité</Link>
                  <Link to={createPageUrl('RefundPolicy')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Politique de Retour</Link>
                  <Link to={createPageUrl('Terms')} className="block text-[#d4b896]/70 hover:text-white transition-colors">Conditions Générales</Link>
                </div>
              </div>
              <div>
                <h4 className="text-[#d4b896] font-medium mb-6 uppercase tracking-wider text-sm">Nous Trouver</h4>
                <div className="space-y-3 text-[#d4b896]/80 text-sm">
                  <a href="https://maps.app.goo.gl/rZFjTHTdvMewHYo97" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                    <p>Magasin C 34, Mahaj Riad</p>
                    <p>Hay Riad - Rabat</p>
                  </a>
                  <p className="pt-2">06 65 65 69 95</p>
                  <div className="flex gap-4 pt-4">
                    <a href="https://instagram.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                    <a href="https://web.facebook.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#d4b896]/20 mt-12 pt-8 text-center text-[#d4b896]/50 text-sm">
              © 2024 LIXUS Atelier Sartorial. Tous droits réservés.
            </div>
          </div>
        </footer>
      )}

      {/* AI Assistant */}
      <AiAssistant />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && !mobileMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 bg-[#2d4a3e] text-[#d4b896] p-3 rounded-full shadow-xl hover:bg-[#234235] border border-[#d4b896]/20 transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
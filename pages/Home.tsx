import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Ruler, Shirt, Award, MapPin, Phone, Instagram, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { REVIEWS } from '../lib/data';

const HERO_IMAGES = [
  'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/FRONT%20STORE.jpg',
  'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/giphy.gif',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_692f8580989c6da35c8a231f/9ab2aa467_beigesuit_9_2048x2048__47640.jpg',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_692f8580989c6da35c8a231f/2ae98ae3f_post-lixusateliersartorial-apr-17-2023.jpg',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_692f8580989c6da35c8a231f/060783940_post-lixusateliersartorial-aug-04-2023.jpeg'
];

const SHOWCASE_SUITS = [
  {
    image: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/SIDE%20VIEW%20BLUE%20NUIT%20.jpg',
    title: 'Classic Navy',
    subtitle: 'Costume deux pièces'
  },
  {
    image: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/SMOOKING%20NOIR.jpg',
    title: 'Smoking Noir',
    subtitle: 'Tuxedo sur mesure'
  },
  {
    image: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/481293649_689102297015710_4167171937918863584_n26.jpg',
    title: 'Gris Élégant',
    subtitle: 'Costume d\'affaires'
  }
];

const PARTNERS = [
  { name: 'ZEGNA', logo: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/zegna-trs.png' },
  { name: 'REDA 1865', logo: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/reda-trs.png' },
  { name: 'DRAGO', logo: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/drago.png' },
  { name: 'DORMEUIL', logo: 'https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/Dormeuil-trs.png' }
];

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentHero]}
              alt="LIXUS Bespoke Suit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl"
            >
              <img 
                src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/lixus+logo%20(1).png"
                alt="LIXUS"
                className="h-20 mb-8"
              />
              <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight tracking-wide">
                L'Art du
                <span className="block font-serif italic text-[#d4b896]">Sur Mesure</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 font-light leading-relaxed">
                Costumes et chemises sur mesure, confectionnés avec les plus beaux tissus italiens.
                Une expérience sartoriale unique à Rabat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl('Order')}>
                  <Button 
                    size="lg"
                    className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] font-medium px-8 py-6 text-lg rounded-none"
                  >
                    Commander Sur Mesure
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl('Collections')}>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-[#d4b896]/60 text-[#d4b896] hover:bg-[#d4b896]/10 px-8 py-6 text-lg rounded-none"
                  >
                    Voir les Collections
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHero(idx)}
              className={`h-1 transition-all duration-500 ${
                idx === currentHero ? 'w-12 bg-[#d4b896]' : 'w-6 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Nos Services</span>
            <h2 className="text-4xl md:text-5xl font-light text-[#2d4a3e] mt-4">
              Artisanat d'Exception
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Ruler,
                title: 'Prise de Mesures',
                description: 'Un ajustement parfait grâce à plus de 25 mesures précises prises par nos experts.'
              },
              {
                icon: Shirt,
                title: 'Tissus Premium',
                description: 'Sélection exclusive de tissus italiens: Ermenegildo Zegna, Loro Piana, Reda, Drago.'
              },
              {
                icon: Award,
                title: 'Confection Artisanale',
                description: 'Chaque pièce est confectionnée à la main selon les traditions sartoriales italiennes.'
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 border border-[#e8e6e3] hover:border-[#d4b896] hover:shadow-lg transition-all duration-500"
              >
                <service.icon className="h-10 w-10 text-[#d4b896] mb-6" strokeWidth={1} />
                <h3 className="text-xl font-medium text-[#2d4a3e] mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 bg-[#2d4a3e]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Collection</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4">
              Créations Récentes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {SHOWCASE_SUITS.map((suit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative overflow-hidden aspect-[3/4]"
              >
                <img
                  src={suit.image}
                  alt={suit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl text-white font-medium">{suit.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{suit.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl('Collections')}>
              <Button 
                variant="outline"
                className="border-[#d4b896] text-[#d4b896] hover:bg-[#d4b896] hover:text-[#2d4a3e] px-8 py-6 rounded-none"
              >
                Voir Toutes les Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Atelier Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Notre Atelier</span>
              <h2 className="text-4xl md:text-5xl font-light text-[#2d4a3e] mt-4 mb-8">
                L'Excellence Sartoriale à Rabat
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Situé au cœur de Hay Riad, LIXUS Atelier Sartorial perpétue l'art du sur-mesure 
                avec passion et précision. Notre équipe de maîtres tailleurs vous accompagne 
                dans la création de pièces uniques qui reflètent votre personnalité.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                De la sélection du tissu aux finitions les plus minutieuses, chaque étape 
                est réalisée avec le souci du détail qui fait la signature des grandes 
                maisons de couture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#d4b896]" />
                  <span className="text-[#2d4a3e]">Hay Riad, Rabat</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#d4b896]" />
                  <span className="text-[#2d4a3e]">06 65 65 69 95</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/481260599_688424273750179_1317721555920267174_n38.jpg"
                alt="LIXUS Atelier"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#2d4a3e] p-8 border border-[#d4b896]/20">
                <img 
                  src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/lixus+logo%20(1).png"
                  alt="LIXUS Logo"
                  className="h-16"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-[#faf9f7] border-t border-[#d4b896]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Témoignages</span>
              <h2 className="text-4xl md:text-5xl font-light text-[#2d4a3e] mt-4">
                Nos Clients Témoignent
              </h2>
            </div>
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-2 mb-1">
                 <div className="flex text-[#d4b896]">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <Star key={star} className="h-6 w-6 fill-current" />
                   ))}
                 </div>
                 <span className="text-3xl font-serif text-[#2d4a3e] font-medium">4.3</span>
               </div>
               <p className="text-gray-500 text-sm">Basé sur 456 avis clients</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.slice(0, 3).map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 border border-[#d4b896]/20 shadow-sm relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-serif text-lg text-[#2d4a3e]">{review.name}</h4>
                    <div className="flex text-[#d4b896] mt-1 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className={`text-gray-600 font-light text-sm italic leading-relaxed ${review.language === 'ar' ? 'text-right' : ''}`}>
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl('Reviews')}>
              <Button 
                className="bg-[#2d4a3e] hover:bg-[#234235] text-white px-8 py-6 rounded-none"
              >
                Lire tous les avis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="py-20 bg-[#f5f4f2] border-y border-[#d4b896]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Partenaires</span>
            <h3 className="text-3xl md:text-4xl font-light text-[#2d4a3e] mt-4">Nos Collaborations</h3>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {PARTNERS.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-20 w-auto object-contain opacity-50 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_692f8580989c6da35c8a231f/13753b30f_dieter-betz-muenchen-900x675px.jpg"
          alt="Tailoring"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              Créez Votre Costume Idéal
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Prenez rendez-vous pour une consultation personnalisée et découvrez 
              l'art du sur-mesure LIXUS.
            </p>
            <Link to={createPageUrl('Order')}>
              <Button 
                size="lg"
                className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] font-medium px-12 py-6 text-lg rounded-none shadow-xl"
              >
                Prendre Rendez-vous
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d4a3e] text-[#d4b896] py-16 border-t border-[#d4b896]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <img 
                src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/lixus+logo%20(1).png"
                alt="LIXUS"
                className="h-14 mb-6"
              />
              <p className="text-[#d4b896]/80 leading-relaxed max-w-md">
                Costumes et chemises sur mesure, confectionnés avec passion 
                selon les traditions sartoriales les plus exigeantes.
              </p>
            </div>
            <div>
              <h4 className="text-[#d4b896] font-medium mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <div className="space-y-3 text-[#d4b896]/80">
                <a 
                  href="https://maps.app.goo.gl/rZFjTHTdvMewHYo97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  <p>Magasin C 34, Mahaj Riad</p>
                  <p>Hay Riad - Rabat</p>
                </a>
                <p className="pt-2">06 65 65 69 95</p>
              </div>
            </div>
            <div>
              <h4 className="text-[#d4b896] font-medium mb-6 uppercase tracking-wider text-sm">Suivez-nous</h4>
              <a 
                href="https://instagram.com/lixusateliersartorial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#d4b896]/80 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                @lixusateliersartorial
              </a>
              <div className="mt-4">
                <Link to={createPageUrl('Reviews')} className="text-sm hover:text-white transition-colors">
                  Avis Clients
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#d4b896]/20 mt-12 pt-8 text-center text-[#d4b896]/50 text-sm">
            © 2026 LIXUS Atelier Sartorial. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
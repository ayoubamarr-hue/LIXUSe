import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function AboutUs() {
  return (
    <div className="bg-[#faf9f7]">
      <div className="relative h-[60vh] bg-[#2d4a3e] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_692f8580989c6da35c8a231f/13753b30f_dieter-betz-muenchen-900x675px.jpg" 
            alt="Tailoring"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d4a3e] to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl">
             <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Notre Histoire</span>
             <h1 className="text-5xl md:text-7xl font-light text-white mt-4 mb-8">L'Art du Tailleur</h1>
             <p className="text-xl text-white/80 font-light">
               Une passion pour l'élégance masculine transmise à travers l'excellence du geste et la noblesse des matières.
             </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-serif text-[#2d4a3e] mb-8">La Philosophie LIXUS</h2>
            <div className="space-y-6 text-gray-700 font-light leading-relaxed text-lg">
              <p>
                Fondé au cœur de Rabat, LIXUS Atelier Sartorial est né d'une vision simple mais ambitieuse : redonner ses lettres de noblesse à l'élégance masculine au Maroc.
              </p>
              <p>
                Nous croyons que le véritable luxe ne réside pas dans l'ostentation, mais dans la justesse d'une coupe, la qualité d'un tissu et l'attention portée aux détails invisibles qui font toute la différence.
              </p>
              <p>
                Chaque vêtement qui sort de notre atelier est le fruit d'un dialogue entre le tailleur et le client, une pièce unique conçue pour sublimer une silhouette et affirmer une personnalité.
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <img 
              src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/481260599_688424273750179_1317721555920267174_n38.jpg"
              alt="Atelier"
              className="w-full shadow-lg"
            />
            <div className="bg-[#2d4a3e] p-8 text-white text-center">
              <p className="font-serif italic text-2xl">
                "L'élégance n'est pas de se faire remarquer, mais de se faire souvenir."
              </p>
              <p className="text-[#d4b896] mt-4 uppercase text-sm tracking-widest">— Giorgio Armani</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-24 pt-16 border-t border-[#d4b896]/20 text-center">
           <h2 className="text-3xl font-serif text-[#2d4a3e] mb-8">Rejoignez la Communauté</h2>
           <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
             Suivez nos créations et l'actualité de l'atelier sur les réseaux sociaux.
           </p>
           <div className="flex justify-center gap-6">
             <a href="https://web.facebook.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer">
               <div className="flex items-center gap-3 px-6 py-3 bg-[#1877F2] text-white rounded-none hover:bg-[#166fe5] transition-colors shadow-lg">
                 <Facebook className="h-5 w-5" />
                 <span>Facebook</span>
               </div>
             </a>
             <a href="https://instagram.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer">
               <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-none hover:opacity-90 transition-opacity shadow-lg">
                 <Instagram className="h-5 w-5" />
                 <span>Instagram</span>
               </div>
             </a>
           </div>
        </div>
      </div>
    </div>
  );
}
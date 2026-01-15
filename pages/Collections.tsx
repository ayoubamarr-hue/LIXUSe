import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PRODUCTS } from '../lib/data';

const { Link } = ReactRouterDOM;
const MotionDiv = motion.div as any;

const CATEGORIES = ['Tous', 'Costumes', 'Vestes', 'Chemises', 'Tuxedos', 'Accessoires'];

export default function Collections() {
  const [filter, setFilter] = useState('Tous');

  const filteredItems = filter === 'Tous' 
    ? PRODUCTS 
    : PRODUCTS.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Gallerie</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Nos Collections</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Découvrez nos réalisations récentes. Chaque pièce est unique, disponible à la commande 
            et adaptable à vos mesures.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 -mt-8">
        <div className="flex flex-wrap justify-center gap-4 bg-white p-6 shadow-lg border border-[#d4b896]/20 max-w-4xl mx-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === cat 
                  ? 'bg-[#2d4a3e] text-[#d4b896]' 
                  : 'text-[#2d4a3e] hover:bg-[#f0ece6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-16">
        <MotionDiv 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {filteredItems.map((item) => (
            <MotionDiv
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={item.id}
              className="group cursor-pointer"
            >
              <Link to={`/product/${item.id}`}>
                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-[#2d4a3e] px-6 py-3 uppercase tracking-widest text-sm font-medium hover:bg-[#d4b896] transition-colors">
                      Commander
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-[#2d4a3e] group-hover:text-[#d4b896] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{item.material}</p>
                  </div>
                  <span className="text-[#2d4a3e] font-serif font-medium whitespace-nowrap">
                    {item.price} MAD
                  </span>
                </div>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
}
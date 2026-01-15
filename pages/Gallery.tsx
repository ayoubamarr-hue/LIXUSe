import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../lib/data';

const MotionDiv = motion.div as any;

// Duplicate products to simulate a larger gallery for demonstration
const GALLERY_ITEMS = [...PRODUCTS, ...PRODUCTS].map((item, index) => ({
  ...item,
  uniqueId: `${item.id}-${index}`
}));

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Inspirations</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Galerie Clients</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Découvrez les créations réalisées pour nos clients. Chaque pièce raconte une histoire unique.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <MotionDiv
              key={item.uniqueId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-gray-100"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#d4b896] text-xs uppercase tracking-widest mb-1">{item.category}</span>
                <h3 className="text-white font-serif text-xl">{item.title}</h3>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Fabrics() {
  return (
    <div className="bg-[#faf9f7]">
       <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Matières</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Tissus d'Exception</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Nous travaillons exclusivement avec les plus prestigieuses maisons de tissus italiennes et anglaises 
            pour garantir une qualité irréprochable.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light text-[#2d4a3e] mb-6">La Qualité Avant Tout</h2>
            <p className="text-gray-600 leading-relaxed mb-6 font-light">
              Le choix du tissu est la première étape cruciale dans la création de votre costume sur mesure. 
              Il détermine non seulement l'apparence, mais aussi le confort, la durabilité et le tombé du vêtement.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 font-light">
              Nous sélectionnons nos drapiers pour leur savoir-faire séculaire, leur respect de l'environnement 
              et leur capacité à innover tout en préservant les traditions.
            </p>
            <ul className="space-y-4">
              {['Laine Super 130s à Super 180s', 'Cachemire Pur', 'Lin Irlandais', 'Coton Sea Island'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#2d4a3e]">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#d4b896]/20 text-[#d4b896]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
             <img 
              src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/zegnabooks.webp"
              alt="Fabrics"
              className="w-full aspect-square object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-xl border border-[#d4b896]/20">
               <span className="block text-4xl font-serif text-[#2d4a3e]">5000+</span>
               <span className="text-sm uppercase tracking-wider text-gray-500">Références</span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             {
               name: "Reda 1865",
               desc: "Excellence italienne dans la production de laine Mérinos, alliant innovation durable et tradition artisanale.",
               img: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/reda.png"
             },
             {
               name: "Ermenegildo Zegna",
               desc: "Pionnier dans la production de tissus de haute performance, alliant élégance et technologie.",
               img: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/zegnacloth.webp"
             },
             {
               name: "Dormeuil",
               desc: "L'élégance à la française combinée au savoir-faire anglais, pour des tissus au caractère unique.",
               img: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/fabric_dormeuil_03.jpg"
             }
           ].map((partner, idx) => (
             <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 border-t-4 border-[#d4b896] shadow-sm hover:shadow-xl transition-all"
             >
               <h3 className="text-2xl font-serif text-[#2d4a3e] mb-4">{partner.name}</h3>
               <p className="text-gray-600 font-light leading-relaxed mb-6">{partner.desc}</p>
               <div className="h-48 overflow-hidden">
                  <img src={partner.img} alt={partner.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
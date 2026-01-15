import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const MotionDiv = motion.div as any;

const QA_ITEMS = [
  {
    q: "Combien de temps faut-il pour confectionner un costume ?",
    a: "Le délai standard de confection est d'environ 2 semaines à partir de la prise de mesures. Ce délai nous permet de garantir la qualité et la précision des finitions."
  },
  {
    q: "Faut-il prendre rendez-vous ?",
    a: "Oui, nous recommandons vivement de prendre rendez-vous pour nous assurer de pouvoir vous consacrer le temps nécessaire pour la consultation et la prise de mesures."
  },
  {
    q: "Quels types de tissus proposez-vous ?",
    a: "Nous travaillons avec les plus grandes maisons italiennes et anglaises comme Loro Piana, Zegna, Drago, Reda et Dormeuil. Nous avons plus de 5000 références disponibles."
  },
  {
    q: "Proposez-vous des retouches ?",
    a: "Oui, pour tous les vêtements confectionnés par LIXUS, les retouches nécessaires à l'ajustement parfait lors de la livraison sont incluses."
  },
  {
    q: "Quelle est la différence entre sur-mesure et prêt-à-porter ?",
    a: "Le sur-mesure (bespoke/made-to-measure) est créé spécifiquement pour votre corps, prenant en compte votre posture et vos préférences, contrairement au prêt-à-porter qui utilise des tailles standardisées."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Aide</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Questions Fréquentes</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Retrouvez ici les réponses aux questions les plus courantes sur nos services et produits.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="max-w-3xl mx-auto space-y-4">
          {QA_ITEMS.map((item, idx) => (
            <div key={idx} className="bg-white border border-[#d4b896]/20 shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-serif text-lg ${openIndex === idx ? 'text-[#d4b896]' : 'text-[#2d4a3e]'}`}>
                  {item.q}
                </span>
                {openIndex === idx ? (
                  <Minus className="h-5 w-5 text-[#d4b896] shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-[#2d4a3e] shrink-0" />
                )}
              </button>
              <MotionDiv
                initial={false}
                animate={{ height: openIndex === idx ? 'auto' : 0, opacity: openIndex === idx ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-gray-600 font-light leading-relaxed">
                  {item.a}
                </div>
              </MotionDiv>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
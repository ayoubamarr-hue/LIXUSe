import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { createPageUrl } from '../lib/utils';
import { Calendar, Ruler, Scissors, Clock, Smile } from 'lucide-react';

const STEPS = [
  {
    icon: Calendar,
    title: "1. Prise de Rendez-vous",
    desc: "Tout commence par la réservation d'un créneau. C'est simple et rapide via notre site web."
  },
  {
    icon: Smile,
    title: "2. Consultation en Boutique",
    desc: "Lors de votre venue, nous répondons à toutes vos questions. C'est à ce moment que nous discutons des détails, du style et que vous obtenez vos réponses personnalisées."
  },
  {
    icon: Ruler,
    title: "3. Prise de Mesures",
    desc: "Nous prenons vos mesures avec précision pour garantir un ajustement parfait adapté à votre morphologie."
  },
  {
    icon: Clock,
    title: "4. Confection (2 Semaines)",
    desc: "Nos artisans se mettent au travail. Il faut compter environ 2 semaines pour la réalisation de votre pièce unique."
  },
  {
    icon: Scissors,
    title: "5. Essayage & Livraison",
    desc: "Une fois prêt, vous revenez pour un essayage final. Si tout est parfait, vous repartez avec votre création."
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Guide</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Comment ça marche ?</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Le processus LIXUS est conçu pour être simple, transparent et rassurant.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-[#d4b896]/30 ml-4 md:ml-8 space-y-16">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute -left-[9px] md:-left-[11px] top-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#2d4a3e] border-4 border-[#faf9f7]" />
                
                <div className="bg-white p-8 border border-[#d4b896]/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#2d4a3e]/5 rounded-full text-[#2d4a3e]">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#2d4a3e]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-serif text-[#2d4a3e] mb-6">Prêt à commencer l'expérience ?</h3>
            <Link to={createPageUrl('Booking')}>
              <Button size="lg" className="px-12 py-6 text-lg bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e]">
                Réserver mon créneau
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
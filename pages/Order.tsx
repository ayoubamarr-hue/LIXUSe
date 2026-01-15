import React from 'react';
import { motion } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { Button } from '../components/ui/button';
import { createPageUrl } from '../lib/utils';
import { Scissors, Ruler, UserCheck, Package } from 'lucide-react';

const { Link } = ReactRouterDOM;
const MotionDiv = motion.div as any;

const STEPS = [
  {
    icon: UserCheck,
    title: "1. La Rencontre",
    desc: "Tout commence par un échange. Nous discutons de votre style, de vos besoins et de l'occasion. Nous vous guidons à travers notre sélection de plus de 5000 tissus."
  },
  {
    icon: Ruler,
    title: "2. La Prise de Mesures",
    desc: "Nous prenons plus de 25 mesures corporelles et analysons votre posture pour créer un patron unique, exclusivement pour vous."
  },
  {
    icon: Scissors,
    title: "3. L'Essayage",
    desc: "Quelques semaines plus tard, un essayage intermédiaire permet d'ajuster les moindres détails du tombé et du confort de votre vêtement."
  },
  {
    icon: Package,
    title: "4. La Livraison",
    desc: "Votre costume est prêt. Après un dernier contrôle qualité rigoureux, vous repartez avec une pièce unique, faite pour durer."
  }
];

export default function Order() {
  return (
    <div className="bg-[#faf9f7] min-h-screen">
       <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Processus</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">L'Expérience Sur Mesure</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Commander chez LIXUS, c'est s'offrir le temps de la perfection. Comptez 4 à 6 semaines 
            pour la réalisation de votre costume complet.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Steps Column */}
            <div className="w-full lg:w-1/2 relative">
                 {/* Vertical Line */}
                 <div className="absolute right-8 top-8 bottom-8 w-px bg-[#d4b896]/30 hidden lg:block" />
                 
                 <div className="space-y-16">
                    {STEPS.map((step, idx) => (
                        <MotionDiv 
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col md:flex-row gap-6 items-center lg:justify-end text-center lg:text-right"
                        >
                            <div className="flex-1 lg:pr-8">
                                <h3 className="text-2xl font-serif text-[#2d4a3e] mb-4">{step.title}</h3>
                                <p className="text-gray-600 font-light leading-relaxed">{step.desc}</p>
                            </div>

                            <div className="relative z-10 flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-[#2d4a3e] border-4 border-[#faf9f7] shadow-xl flex items-center justify-center text-[#d4b896]">
                                    <step.icon className="h-8 w-8" />
                                </div>
                            </div>
                        </MotionDiv>
                    ))}
                 </div>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-1/2">
                <MotionDiv
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="sticky top-32"
                >
                     <img 
                        src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/ZEGNAGIF.jfif" 
                        alt="LIXUS Process" 
                        className="w-full h-auto object-cover shadow-2xl border border-[#d4b896]/20"
                     />
                </MotionDiv>
            </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-2xl font-serif text-[#2d4a3e] mb-8">Prêt à commencer ?</h3>
          <Link to={createPageUrl('Booking')}>
            <Button size="lg" className="px-12 py-6 text-lg bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e]">
              Réserver ma consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
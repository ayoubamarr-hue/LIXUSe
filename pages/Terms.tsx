import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Conditions Générales</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-[#d4b896]/20 shadow-sm text-gray-700">
           <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-6">1. Introduction</h3>
           <p className="mb-6 leading-relaxed text-gray-700">
             Bienvenue sur le site de LIXUS Atelier Sartorial. En accédant à ce site, vous acceptez d'être lié par ces conditions générales d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect des lois locales applicables.
           </p>

           <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">2. Propriété Intellectuelle</h3>
           <p className="mb-6 leading-relaxed text-gray-700">
             Tout le contenu présent sur ce site (images, textes, logos) est la propriété exclusive de LIXUS Atelier Sartorial. Toute reproduction ou redistribution est interdite sans autorisation écrite.
           </p>

           <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">3. Commandes et Paiement</h3>
           <p className="mb-6 leading-relaxed text-gray-700">
             Les prix affichés sur le site sont en Dirhams Marocains (MAD). Le paiement des commandes en ligne s'effectue à la livraison en espèces ou par chèque certifié. Pour les commandes sur mesure, un acompte est généralement demandé en boutique.
           </p>

           <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">4. Délais</h3>
           <p className="mb-6 leading-relaxed text-gray-700">
             Les délais de confection mentionnés (environ 2 semaines) sont indicatifs et peuvent varier selon la charge de travail de l'atelier et la disponibilité des tissus.
           </p>

           <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">5. Droit applicable</h3>
           <p className="mb-6 leading-relaxed text-gray-700">
             Tout litige relatif au site de LIXUS Atelier Sartorial sera régi par les lois du Royaume du Maroc.
           </p>
        </div>
      </div>
    </div>
  );
}
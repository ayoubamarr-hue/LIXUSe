import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Politique de Retour</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-[#d4b896]/20 shadow-sm text-gray-700">
          <h2 className="text-[#2d4a3e] font-serif text-2xl mb-6">Politique d'Échange Uniquement</h2>
          <p className="mb-6 leading-relaxed text-gray-700">
            Chez LIXUS Atelier Sartorial, nous nous engageons à fournir des produits de la plus haute qualité. 
            Veuillez lire attentivement notre politique concernant les retours et les échanges.
          </p>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">1. Pas de Remboursement</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Nous n'effectuons <strong>aucun remboursement</strong> en espèces ou par carte bancaire pour les achats effectués, 
            que ce soit en boutique ou pour les commandes livrées.
          </p>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">2. Échanges Autorisés</h3>
          <p className="mb-4 leading-relaxed text-gray-700">
            Nous acceptons les échanges dans les conditions suivantes :
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
            <li>
              <strong>Problème de Taille :</strong> Si l'article commandé ne vous va pas, vous pouvez l'échanger contre une autre taille du même modèle (sous réserve de disponibilité).
            </li>
            <li>
              <strong>Échange de Produit :</strong> Vous pouvez échanger votre article contre un autre produit de notre collection d'une valeur égale ou supérieure (en payant la différence).
            </li>
          </ul>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">3. Conditions de Retour</h3>
          <p className="mb-4 leading-relaxed text-gray-700">
            Pour être éligible à un échange, l'article doit être :
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
            <li>Inutilisé et dans le même état que vous l'avez reçu.</li>
            <li>Dans son emballage d'origine.</li>
            <li>Accompagné du reçu ou de la preuve d'achat.</li>
          </ul>
          <p className="mb-6 leading-relaxed text-gray-700">
            Les demandes d'échange doivent être faites dans les <strong>7 jours</strong> suivant la date d'achat ou de livraison.
          </p>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">4. Articles Sur Mesure</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Pour les articles confectionnés <strong>sur mesure</strong> (Costumes, Chemises Bespoke), aucun retour ni échange n'est possible une fois la production lancée, sauf défaut de fabrication majeur. 
            Les retouches nécessaires à l'ajustement sont incluses dans le service.
          </p>
        </div>
      </div>
    </div>
  );
}
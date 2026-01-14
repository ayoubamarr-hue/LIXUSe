import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Politique de Confidentialité</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-[#d4b896]/20 shadow-sm text-gray-700">
          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Mars 2024</p>
          
          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-6">1. Collecte de l'information</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Nous recueillons des informations lorsque vous prenez rendez-vous sur notre site, passez une commande ou remplissez un formulaire de contact. 
            Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone et, le cas échéant, vos mensurations.
          </p>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">2. Utilisation des informations</h3>
          <p className="mb-4 leading-relaxed text-gray-700">
            Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
            <li>Améliorer notre site Web</li>
            <li>Améliorer le service client et vos besoins de prise en charge</li>
            <li>Vous contacter par e-mail ou téléphone concernant votre commande</li>
          </ul>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">3. Confidentialité</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
          </p>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">4. Protection des informations</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles.
          </p>

          <h3 className="text-[#2d4a3e] font-serif text-xl mb-3 mt-8">5. Consentement</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            En utilisant notre site, vous consentez à notre politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
}
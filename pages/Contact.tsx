import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const whatsappMessage = `*Nouveau Message Contact LIXUS*\n\n` +
      `👤 *Nom:* ${formData.name}\n` +
      `📞 *Téléphone:* ${formData.phone}\n` +
      `💬 *Message:* ${formData.message}`;
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/212620565941?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form optionally or just leave it
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Contact</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Nous Contacter</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Une question ? Besoin d'informations supplémentaires ? Notre équipe est à votre écoute.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 border border-[#d4b896]/20 shadow-sm">
              <h3 className="text-2xl font-serif text-[#2d4a3e] mb-6">Nos Coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#d4b896] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#2d4a3e]">Adresse</h4>
                    <p className="text-gray-600 font-light">Magasin C 34, Mahaj Riad<br/>Hay Riad, Rabat, Maroc</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#d4b896] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#2d4a3e]">Téléphone</h4>
                    <p className="text-gray-600 font-light">06 65 65 69 95</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#d4b896] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#2d4a3e]">Email</h4>
                    <p className="text-gray-600 font-light">contact@lixus-sartorial.ma</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-[#d4b896] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#2d4a3e]">Horaires</h4>
                    <p className="text-gray-600 font-light">Lundi - Samedi : 10h00 - 20h00<br/>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-200 h-80 border border-[#d4b896]/20">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4558.820784988291!2d-6.867234028836059!3d33.96070815827989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda713e0cf5acc2b%3A0x46ecbadf207317d1!2sLixus%20atelier%20sartorial!5e1!3m2!1sen!2sma!4v1768345731899!5m2!1sen!2sma" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="LIXUS Atelier Sartorial Location"
               ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 border border-[#d4b896]/20 shadow-lg">
             <h3 className="text-2xl font-serif text-[#2d4a3e] mb-6">Envoyez-nous un message</h3>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-[#2d4a3e]">Nom complet</Label>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="mt-2" 
                  />
                </div>
                <div>
                  <Label className="text-[#2d4a3e]">Téléphone</Label>
                  <Input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="mt-2" 
                    placeholder="06 XX XX XX XX"
                  />
                </div>
                <div>
                  <Label className="text-[#2d4a3e]">Message</Label>
                  <Textarea 
                    required 
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="mt-2" 
                  />
                </div>
                <Button type="submit" className="w-full bg-[#2d4a3e] hover:bg-[#234235] text-white py-6 rounded-none">
                  Envoyer le message (WhatsApp)
                </Button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Truck, ShieldCheck, Ruler, X, Loader2, CheckCircle, Minus, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { PRODUCTS } from '../lib/data';
import { supabase } from '../lib/supabase';

const SIZES = ['44', '46', '48', '50', '52', '54', '56', '58', '60', '62'];

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f7] text-[#2d4a3e]">
        <h2 className="text-2xl font-serif mb-4">Produit non trouvé</h2>
        <Link to="/Collections">
          <Button variant="outline">Retour aux collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-12 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <Link to="/Collections" className="inline-flex items-center text-[#2d4a3e]/60 hover:text-[#2d4a3e] mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux collections
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-[3/4] lg:aspect-[4/5] bg-gray-100"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[#d4b896] text-sm tracking-[0.2em] uppercase mb-2">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2d4a3e] mb-4">{product.title}</h1>
            <p className="text-2xl text-[#2d4a3e] font-light mb-8">{product.price} MAD</p>

            <div className="prose text-gray-600 mb-8 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            <div className="bg-white p-6 border border-[#d4b896]/20 mb-8">
              <h3 className="text-lg font-medium text-[#2d4a3e] mb-4">Caractéristiques</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#d4b896] mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full h-14 text-lg bg-[#2d4a3e] hover:bg-[#234235] text-white rounded-none"
              >
                Commander (Paiement à la livraison)
              </Button>
              <Link to="/Booking">
                <Button 
                  variant="outline"
                  className="w-full h-14 text-lg border-[#2d4a3e] text-[#2d4a3e] hover:bg-[#2d4a3e]/5 rounded-none"
                >
                  Prendre rendez-vous pour essayage
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-[#d4b896]/20">
              <div className="text-center">
                <Truck className="h-6 w-6 text-[#d4b896] mx-auto mb-2" />
                <p className="text-xs text-[#2d4a3e] uppercase tracking-wide">Livraison Gratuite</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="h-6 w-6 text-[#d4b896] mx-auto mb-2" />
                <p className="text-xs text-[#2d4a3e] uppercase tracking-wide">Qualité Garantie</p>
              </div>
              <div className="text-center">
                <Ruler className="h-6 w-6 text-[#d4b896] mx-auto mb-2" />
                <p className="text-xs text-[#2d4a3e] uppercase tracking-wide">Retouches Incluses</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <OrderModal 
            product={product} 
            onClose={() => setIsOrderModalOpen(false)} 
            onSuccess={() => setIsSuccess(true)}
          />
        )}
        {isSuccess && (
          <SuccessModal onClose={() => setIsSuccess(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderModal({ product, onClose, onSuccess }: { product: any, onClose: () => void, onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Rabat',
    notes: '',
    size: '',
    jacketSize: '',
    pantsSize: '',
    quantity: 1
  });

  const isSuit = ['Costumes', 'Tuxedos'].includes(product.category);
  const isAccessory = ['Accessoires'].includes(product.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation based on product type
    if (isSuit) {
      if (!formData.jacketSize || !formData.pantsSize) return;
    } else if (isAccessory) {
       if (formData.quantity < 1) return;
    } else {
      if (!formData.size) return;
    }

    setIsLoading(true);
    
    try {
      // Push order to Supabase
      const { error } = await supabase.from('orders').insert([
        {
          product_id: product.id,
          product_title: product.title,
          customer_name: formData.name,
          customer_phone: formData.phone,
          address: formData.address,
          city: formData.city,
          size: isSuit ? null : formData.size,
          jacket_size: isSuit ? formData.jacketSize : null,
          pants_size: isSuit ? formData.pantsSize : null,
          quantity: formData.quantity,
          total_price: product.price * formData.quantity,
          status: 'pending', // Default status
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error('Error inserting order:', error);
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onClose();
      onSuccess();
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Une erreur est survenue.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-lg p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#2d4a3e]">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-serif text-[#2d4a3e] mb-2">Commander</h2>
        <p className="text-gray-500 mb-6 text-sm">Paiement à la livraison. Livraison gratuite sur Rabat.</p>

        <div className="bg-[#faf9f7] p-4 mb-6 flex gap-4 items-center">
          <img src={product.image} alt={product.title} className="w-16 h-20 object-cover" />
          <div>
            <h4 className="font-medium text-[#2d4a3e]">{product.title}</h4>
            <p className="text-[#d4b896]">{product.price * formData.quantity} MAD</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Conditional Fields based on Product Type */}
          {isSuit ? (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="mb-2 block">Taille Veste (EU) *</Label>
                <div className="grid grid-cols-5 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={`jacket-${size}`}
                      type="button"
                      onClick={() => setFormData({ ...formData, jacketSize: size })}
                      className={`py-2 text-sm border transition-colors ${
                        formData.jacketSize === size
                          ? 'bg-[#2d4a3e] text-white border-[#2d4a3e]'
                          : 'border-gray-200 text-gray-700 hover:border-[#d4b896] bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!formData.jacketSize && <p className="text-xs text-gray-400 mt-1">Veuillez sélectionner une taille de veste</p>}
              </div>
              
              <div>
                <Label className="mb-2 block">Taille Pantalon (EU) *</Label>
                <div className="grid grid-cols-5 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={`pants-${size}`}
                      type="button"
                      onClick={() => setFormData({ ...formData, pantsSize: size })}
                      className={`py-2 text-sm border transition-colors ${
                        formData.pantsSize === size
                          ? 'bg-[#2d4a3e] text-white border-[#2d4a3e]'
                          : 'border-gray-200 text-gray-700 hover:border-[#d4b896] bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!formData.pantsSize && <p className="text-xs text-gray-400 mt-1">Veuillez sélectionner une taille de pantalon</p>}
              </div>
            </div>
          ) : isAccessory ? (
            <div>
              <Label className="mb-2 block">Quantité *</Label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                  className="h-10 w-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-[#2d4a3e]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-medium w-8 text-center">{formData.quantity}</span>
                 <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                  className="h-10 w-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-[#2d4a3e]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Label className="mb-2 block">Taille (EU) *</Label>
              <div className="grid grid-cols-5 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, size })}
                    className={`py-2 text-sm border transition-colors ${
                      formData.size === size
                        ? 'bg-[#2d4a3e] text-white border-[#2d4a3e]'
                        : 'border-gray-200 text-gray-700 hover:border-[#d4b896] bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!formData.size && <p className="text-xs text-gray-400 mt-1">Veuillez sélectionner une taille</p>}
            </div>
          )}

          <div>
            <Label>Nom complet *</Label>
            <Input 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="Votre nom" 
              className="mt-1"
            />
          </div>
          <div>
            <Label>Téléphone *</Label>
            <Input 
              required 
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              placeholder="06 XX XX XX XX" 
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Ville *</Label>
              <Input 
                required 
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                placeholder="Rabat" 
                className="mt-1"
              />
            </div>
            <div>
              <Label>Code Postal</Label>
              <Input placeholder="10000" className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Adresse de livraison *</Label>
            <Textarea 
              required 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              placeholder="Votre adresse complète" 
              className="mt-1"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={
              isLoading || 
              (isSuit && (!formData.jacketSize || !formData.pantsSize)) || 
              (!isSuit && !isAccessory && !formData.size)
            }
            className="w-full bg-[#2d4a3e] hover:bg-[#234235] text-white h-12 mt-4"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmer la commande"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white w-full max-w-sm p-8 text-center shadow-2xl"
      >
        <div className="w-16 h-16 bg-[#2d4a3e] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-[#d4b896]" />
        </div>
        <h2 className="text-2xl font-serif text-[#2d4a3e] mb-2">Commande Reçue !</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Merci pour votre confiance. Notre équipe vous contactera sous 24h pour confirmer la livraison.
        </p>
        <Button onClick={onClose} className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] w-full">
          Fermer
        </Button>
      </motion.div>
    </div>
  );
}
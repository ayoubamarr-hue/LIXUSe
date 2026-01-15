import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, MessageSquare, PenTool } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { REVIEWS } from '../lib/data';

const MotionDiv = motion.div as any;

export default function Reviews() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setShowForm(false);
      setFormData({ name: '', rating: 5, message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Expérience</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Avis Clients</h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3">
               <span className="text-5xl font-serif text-[#d4b896]">4.3</span>
               <div className="flex flex-col items-start">
                 <div className="flex text-[#d4b896]">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <Star key={star} className={`h-6 w-6 ${star <= 4 ? 'fill-current' : 'fill-current opacity-30'}`} />
                   ))}
                 </div>
                 <span className="text-white/60 text-sm mt-1">Basé sur 456 avis</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Action Bar */}
          <div className="bg-white p-6 shadow-lg border border-[#d4b896]/20 flex justify-between items-center mb-12">
            <h3 className="text-xl font-serif text-[#2d4a3e]">Votre avis compte</h3>
            <Button 
              onClick={() => {
                setShowForm(true);
                setIsSuccess(false);
              }}
              className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e]"
            >
              <PenTool className="h-4 w-4 mr-2" />
              Laisser un avis
            </Button>
          </div>

          {/* Submission Form Modal */}
          <AnimatePresence>
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                 <MotionDiv 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowForm(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  />
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-lg p-8 shadow-2xl rounded-sm"
                  >
                    <h2 className="text-2xl font-serif text-[#2d4a3e] mb-6">Partagez votre expérience</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label>Votre Note</Label>
                        <div className="flex gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData({...formData, rating: star})}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star 
                                className={`h-8 w-8 ${
                                  star <= formData.rating 
                                    ? 'fill-[#d4b896] text-[#d4b896]' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Nom complet</Label>
                        <Input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Votre nom"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Votre message</Label>
                        <Textarea 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Racontez-nous votre expérience..."
                          rows={4}
                          className="mt-2"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowForm(false)}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="flex-1 bg-[#2d4a3e] hover:bg-[#234235] text-white"
                        >
                          {isSubmitting ? 'Envoi...' : 'Publier l\'avis'}
                        </Button>
                      </div>
                    </form>
                  </MotionDiv>
              </div>
            )}
          </AnimatePresence>
          
          {/* Success Message */}
          <AnimatePresence>
            {isSuccess && (
               <MotionDiv
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border border-green-200 p-6 mb-8 text-center"
               >
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                   <CheckCircle className="h-6 w-6 text-green-600" />
                 </div>
                 <h4 className="text-green-800 font-medium text-lg">Merci pour votre avis !</h4>
                 <p className="text-green-700">Votre commentaire a été soumis et sera publié après modération.</p>
               </MotionDiv>
            )}
          </AnimatePresence>

          {/* Reviews List */}
          <div className="grid gap-6">
            {REVIEWS.map((review, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 border-l-4 border-[#d4b896] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-serif text-lg text-[#2d4a3e] font-medium">{review.name}</h4>
                    <div className="flex text-[#d4b896] mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {review.date}
                  </span>
                </div>
                <div className="relative">
                  <MessageSquare className="absolute -top-2 -left-2 h-8 w-8 text-[#d4b896]/10 rotate-180" />
                  <p className={`text-gray-600 font-light leading-relaxed relative z-10 ${review.language === 'ar' ? 'text-right font-arabic text-lg' : ''}`}>
                    {review.text}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
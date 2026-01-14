import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, CheckCircle, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import Calendar from '../components/booking/Calendar';
import TimeSlotPicker from '../components/booking/TimeSlotPicker';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SERVICE_TYPES = [
  { value: 'consultation', label: 'Consultation & Sélection Tissus', duration: '45 min' },
  { value: 'prise_mesures', label: 'Prise de Mesures', duration: '30 min' },
  { value: 'essayage', label: 'Essayage', duration: '30 min' },
  { value: 'retrait', label: 'Retrait de Commande', duration: '15 min' }
];

interface Appointment {
  appointment_date: string;
  appointment_time: string;
  status?: string;
}

export default function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    appointment_date: Date | null;
    appointment_time: string;
    service_type: string;
    notes: string;
    garment_type: string;
  }>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    appointment_date: null,
    appointment_time: '',
    service_type: 'consultation',
    notes: '',
    garment_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  // Fetch appointments to calculate availability
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Wrap in try-catch to prevent blocking if table missing
        const { data, error } = await supabase
          .from('appointments')
          .select('appointment_date, appointment_time, status')
          .gte('appointment_date', today)
          .neq('status', 'cancelled');

        if (error) {
          // Log as warning only
          console.warn('Supabase fetch warning (Availability data limited):', error);
        } else if (data) {
          setAppointments(data);
        }
      } catch (err) {
        console.warn('Supabase connection warning:', err);
      } finally {
        setIsLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  // Get booked dates and slots based on fetched data
  const bookedDates = appointments.map((apt) => apt.appointment_date);
  
  const bookedSlots = appointments.map((apt) => 
    `${apt.appointment_date}_${apt.appointment_time}`
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!formData.appointment_date) {
        throw new Error("Date de rendez-vous manquante");
      }
      
      const formattedDate = format(formData.appointment_date, 'yyyy-MM-dd');

      // Attempt to save to Supabase
      // We process this in a non-blocking way so that if the DB table is missing or API fails,
      // the user can still proceed to WhatsApp (which is the primary confirmation method).
      try {
        const { error } = await supabase.from('appointments').insert([
          {
            customer_name: formData.customer_name,
            customer_email: formData.customer_email,
            customer_phone: formData.customer_phone,
            appointment_date: formattedDate,
            appointment_time: formData.appointment_time,
            service_type: formData.service_type,
            garment_type: formData.garment_type,
            notes: formData.notes,
            status: 'confirmed'
          }
        ]);

        if (error) {
           console.warn('Supabase insert warning (Using WhatsApp fallback):', error);
        }
      } catch (dbError) {
        console.warn('Database operation warning (Using WhatsApp fallback):', dbError);
      }

      // WhatsApp Notification
      const serviceLabel = SERVICE_TYPES.find(s => s.value === formData.service_type)?.label || formData.service_type;
      const dateStr = format(formData.appointment_date, 'dd/MM/yyyy');
      
      const message = `*Nouveau Rendez-vous LIXUS*\n\n` +
        `👤 *Client:* ${formData.customer_name}\n` +
        `📞 *Tél:* ${formData.customer_phone}\n` +
        `✂️ *Service:* ${serviceLabel}\n` +
        `📅 *Date:* ${dateStr}\n` +
        `🕒 *Heure:* ${formData.appointment_time}\n` +
        (formData.notes ? `📝 *Notes:* ${formData.notes}` : '');

      const whatsappUrl = `https://wa.me/212620565941?text=${encodeURIComponent(message)}`;
      
      // Attempt to open WhatsApp
      window.open(whatsappUrl, '_blank');

      setBookingComplete(true);
    } catch (error: any) {
      console.error('Booking failed:', error);
      alert('Une erreur est survenue lors de la génération de la réservation. Veuillez nous contacter par téléphone au 06 65 65 69 95.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.service_type;
      case 2: return !!formData.appointment_date && !!formData.appointment_time;
      case 3: return !!formData.customer_name && !!formData.customer_phone;
      default: return true;
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-[#2d4a3e] rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-[#d4b896]" />
          </div>
          <h1 className="text-4xl font-light text-[#2d4a3e] mb-4">Rendez-vous Confirmé !</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Merci {formData.customer_name} ! Votre rendez-vous a été enregistré. 
            La confirmation a été préparée pour envoi via WhatsApp.
          </p>
          
          <div className="p-6 bg-white border border-[#d4b896]/30 rounded-sm text-left mb-8">
            <h4 className="font-medium text-[#2d4a3e] mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#d4b896]" />
              Détails du rendez-vous
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-[#2d4a3e]">
                  {formData.appointment_date && format(formData.appointment_date, 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Heure:</span>
                <span className="font-medium text-[#2d4a3e]">{formData.appointment_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-medium text-[#2d4a3e]">
                  {SERVICE_TYPES.find(s => s.value === formData.service_type)?.label}
                </span>
              </div>
            </div>
          </div>

          <Button 
             onClick={() => {
                const serviceLabel = SERVICE_TYPES.find(s => s.value === formData.service_type)?.label || formData.service_type;
                const dateStr = formData.appointment_date ? format(formData.appointment_date, 'dd/MM/yyyy') : '';
                const message = `*Nouveau Rendez-vous LIXUS*\n\n` +
                    `👤 *Client:* ${formData.customer_name}\n` +
                    `📞 *Tél:* ${formData.customer_phone}\n` +
                    `✂️ *Service:* ${serviceLabel}\n` +
                    `📅 *Date:* ${dateStr}\n` +
                    `🕒 *Heure:* ${formData.appointment_time}\n` +
                    (formData.notes ? `📝 *Notes:* ${formData.notes}` : '');
                window.open(`https://wa.me/212620565941?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-none mb-4 flex items-center justify-center gap-2"
          >
             <MessageSquare className="h-5 w-5" />
             Renvoyer la confirmation WhatsApp
          </Button>

          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full border-[#2d4a3e] text-[#2d4a3e] px-8 py-5 rounded-none"
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <div className="bg-[#2d4a3e] py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <CalendarIcon className="h-12 w-12 text-[#d4b896] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Réserver un Rendez-vous
            </h1>
            <p className="text-[#d4b896]/80 max-w-2xl mx-auto">
              Prenez rendez-vous pour une consultation personnalisée, une prise de mesures, 
              ou un essayage dans notre atelier de Hay Riad.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[#d4b896]/20 sticky top-0 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Heure' },
              { num: 3, label: 'Coordonnées' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step >= s.num ? 'bg-[#2d4a3e] text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                  </div>
                  <span className={`text-xs mt-2 ${step >= s.num ? 'text-[#2d4a3e]' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-px mx-4 ${step > s.num ? 'bg-[#2d4a3e]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Service Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-light text-[#2d4a3e] mb-8 text-center">
                Quel service souhaitez-vous ?
              </h2>
              
              <div className="space-y-4">
                {SERVICE_TYPES.map((service) => (
                  <button
                    key={service.value}
                    onClick={() => setFormData({ ...formData, service_type: service.value })}
                    className={`w-full p-6 border-2 rounded-sm transition-all text-left ${
                      formData.service_type === service.value
                        ? 'border-[#2d4a3e] bg-[#2d4a3e]/5 shadow-md'
                        : 'border-[#d4b896]/30 hover:border-[#d4b896]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#2d4a3e] mb-1">{service.label}</h3>
                        <p className="text-sm text-gray-500">Durée: {service.duration}</p>
                      </div>
                      {formData.service_type === service.value && (
                        <div className="w-6 h-6 bg-[#2d4a3e] rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-[#d4b896]" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {formData.service_type === 'consultation' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6"
                >
                  <Label className="text-[#2d4a3e]">Type de vêtement (optionnel)</Label>
                  <Input
                    value={formData.garment_type}
                    onChange={(e) => setFormData({ ...formData, garment_type: e.target.value })}
                    placeholder="Ex: Costume, Chemise, Manteau..."
                    className="mt-2"
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-light text-[#2d4a3e] mb-8 text-center">
                Choisissez votre créneau
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {isLoadingAppointments ? (
                  <div className="col-span-2 flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-[#d4b896] animate-spin" />
                  </div>
                ) : (
                  <>
                    <Calendar
                      selectedDate={formData.appointment_date}
                      onSelectDate={(date) => setFormData({ ...formData, appointment_date: date })}
                      bookedDates={bookedDates}
                    />
                    
                    <TimeSlotPicker
                      selectedDate={formData.appointment_date}
                      selectedTime={formData.appointment_time}
                      onSelectTime={(time) => setFormData({ ...formData, appointment_time: time })}
                      bookedSlots={bookedSlots}
                    />
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto"
            >
              <h2 className="text-2xl font-light text-[#2d4a3e] mb-8 text-center">
                Vos coordonnées
              </h2>
              
              <div className="space-y-6 bg-white p-8 border border-[#d4b896]/30 rounded-sm">
                <div>
                  <Label className="text-[#2d4a3e] flex items-center gap-2">
                    <User className="h-4 w-4 text-[#d4b896]" />
                    Nom complet *
                  </Label>
                  <Input
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="Votre nom"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-[#2d4a3e] flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#d4b896]" />
                    Téléphone *
                  </Label>
                  <Input
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    placeholder="06 XX XX XX XX"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-[#2d4a3e] flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#d4b896]" />
                    Email (optionnel)
                  </Label>
                  <Input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    placeholder="votre@email.com"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pour recevoir la confirmation par email
                  </p>
                </div>
                
                <div>
                  <Label className="text-[#2d4a3e] flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#d4b896]" />
                    Notes (optionnel)
                  </Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Questions, demandes spéciales..."
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-8 p-8 bg-[#fcfbf9] border border-[#d4b896]/20 rounded-sm">
                <h4 className="font-serif text-xl text-[#2d4a3e] mb-6">Récapitulatif</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center border-b border-[#d4b896]/10 pb-2">
                    <span className="text-gray-500 font-light">Service:</span>
                    <span className="font-medium text-[#2d4a3e] text-right">
                      {SERVICE_TYPES.find(s => s.value === formData.service_type)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#d4b896]/10 pb-2">
                    <span className="text-gray-500 font-light">Date:</span>
                    <span className="font-medium text-[#2d4a3e]">
                      {formData.appointment_date ? format(formData.appointment_date, 'dd/MM/yyyy') : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#d4b896]/10 pb-2">
                    <span className="text-gray-500 font-light">Heure:</span>
                    <span className="font-medium text-[#2d4a3e]">{formData.appointment_time || '-'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="max-w-xl mx-auto mt-12 flex justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="px-6 py-5 rounded-none border-[#2d4a3e] text-[#2d4a3e]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          ) : <div />}
          
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-8 py-5 rounded-none bg-[#2d4a3e] hover:bg-[#234235] text-[#d4b896] disabled:opacity-50"
            >
              Continuer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              className="px-8 py-5 rounded-none bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirmation...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirmer le rendez-vous
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
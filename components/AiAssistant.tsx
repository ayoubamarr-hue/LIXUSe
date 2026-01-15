import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const MotionDiv = motion.div as any;

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Bonjour ! Je suis le concierge virtuel de LIXUS. Comment puis-je vous accompagner dans votre recherche d'élégance aujourd'hui ?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Gemini Chat
    try {
        if (process.env.API_KEY) {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: `Vous êtes le concierge virtuel de LIXUS Atelier Sartorial, une maison de haute couture masculine située à Rabat, Maroc (Hay Riad).
                    
                    Informations clés:
                    - Services: Costumes, chemises, tuxedos, manteaux sur mesure.
                    - Tissus: Zegna, Loro Piana, Drago, Reda, Dormeuil.
                    - Processus: Consultation, Prise de mesures (25+ points), Essayage, Livraison. Délai 4-6 semaines.
                    - Localisation: Magasin C 34, Mahaj Riad, Rabat.
                    - Téléphone: 06 65 65 69 95.
                    - Instagram: @lixusateliersartorial.
                    
                    Votre ton doit être poli, élégant, professionnel et chaleureux. Vous vous exprimez principalement en français, mais adaptez-vous si l'utilisateur parle une autre langue.
                    Soyez concis mais serviable. Invitez les utilisateurs à prendre rendez-vous via la page 'Rendez-vous' pour les demandes spécifiques.`,
                }
            });
        }
    } catch (error) {
        console.error("Failed to initialize AI", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
        if (!chatRef.current) {
             // Fallback if API key is missing or init failed
             throw new Error("Chat not initialized");
        }
        
        const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: userMsg });
        const text = response.text;
        
        if (text) {
             setMessages(prev => [...prev, { role: 'model', text: text }]);
        }
    } catch (error) {
        console.error("Error sending message", error);
        setMessages(prev => [...prev, { role: 'model', text: "Je suis désolé, je ne peux pas répondre pour le moment. Veuillez nous contacter directement par téléphone au 06 65 65 69 95." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] md:w-[380px] h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-[#d4b896]/20"
          >
            {/* Header */}
            <div className="bg-[#2d4a3e] p-4 flex justify-between items-center text-[#d4b896] shadow-md z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <h3 className="font-serif font-medium tracking-wide">LIXUS Concierge</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf9f7]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#2d4a3e] text-white rounded-tr-none' 
                      : 'bg-white border border-[#d4b896]/20 text-gray-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#d4b896]/20 p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#d4b896]" />
                    <span className="text-xs text-gray-500 italic">LIXUS écrit...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <Input 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 border-[#d4b896]/30 focus-visible:ring-[#2d4a3e] bg-[#faf9f7]" 
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] rounded-sm"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </MotionDiv>
        )}
      </AnimatePresence>

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] shadow-xl flex items-center justify-center transition-transform hover:scale-105 border-2 border-white/20"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
}
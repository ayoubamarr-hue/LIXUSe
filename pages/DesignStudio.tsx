import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Wand2, Download, AlertTriangle, Key } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const MotionDiv = motion.div as any;

export default function DesignStudio() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const has = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Assume success as per instructions to handle race conditions
      setHasApiKey(true);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Create instance right before call to capture env key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
             imageSize: size,
             aspectRatio: "1:1"
          }
        },
      });

      let found = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64 = part.inlineData.data;
                const mime = part.inlineData.mimeType || 'image/png';
                setGeneratedImage(`data:${mime};base64,${base64}`);
                found = true;
                break;
            }
        }
      }

      if (!found) {
        throw new Error("Aucune image n'a été générée. Veuillez réessayer.");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found") || err.toString().includes("Requested entity was not found")) {
         setError("Clé API invalide ou non sélectionnée.");
         setHasApiKey(false);
      } else {
         setError(err.message || "Une erreur est survenue lors de la génération.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `lixus-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#2d4a3e]">
      {/* Header */}
      <div className="bg-[#2d4a3e] text-white py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Expérimental</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-6 font-serif">LIXUS Design Studio</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Imaginez votre prochaine création. Utilisez notre intelligence artificielle pour visualiser 
            des costumes uniques, des associations de couleurs ou des textures audacieuses.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {!hasApiKey ? (
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center bg-white p-8 md:p-12 border border-[#d4b896]/30 shadow-lg rounded-sm"
          >
            <Key className="h-12 w-12 text-[#d4b896] mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-[#2d4a3e] mb-4">Accès Restreint</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Le Design Studio utilise un modèle d'IA avancé qui nécessite votre propre clé API Google. 
              Veuillez sélectionner un projet avec facturation activée pour continuer.
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleSelectKey}
                className="bg-[#2d4a3e] hover:bg-[#234235] text-white px-8 py-6 rounded-none text-lg w-full"
              >
                Sélectionner ma clé API
              </Button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-[#d4b896] hover:underline"
              >
                En savoir plus sur la facturation
              </a>
            </div>
          </MotionDiv>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Input Section */}
            <MotionDiv 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 border border-[#d4b896]/20 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-[#d4b896]">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-wider font-medium">Création</span>
                </div>

                <div className="space-y-6 flex-1">
                   <div>
                     <Label className="text-base text-[#2d4a3e] mb-2 block">Votre Vision</Label>
                     <Textarea 
                       value={prompt}
                       onChange={(e) => setPrompt(e.target.value)}
                       placeholder="Décrivez votre costume idéal. Ex: Un costume croisé bleu nuit en laine froide, revers à cran aigu, boutons dorés, porté avec une chemise blanche à col italien..."
                       className="min-h-[150px] text-base leading-relaxed bg-[#faf9f7] border-[#d4b896]/30 focus-visible:ring-[#2d4a3e]"
                     />
                     <p className="text-xs text-gray-400 mt-2 text-right">Plus votre description est précise, meilleur sera le résultat.</p>
                   </div>

                   <div>
                     <Label className="text-base text-[#2d4a3e] mb-2 block">Qualité d'image</Label>
                     <Select value={size} onValueChange={(v: any) => setSize(v)}>
                        <SelectTrigger className="w-full h-12 rounded-none border-[#d4b896]/30 bg-[#faf9f7] text-[#2d4a3e]">
                           <SelectValue placeholder="Sélectionner la qualité" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#d4b896]/30 z-[70]">
                           <SelectItem value="1K">Standard (1K)</SelectItem>
                           <SelectItem value="2K">Haute Définition (2K)</SelectItem>
                           <SelectItem value="4K">Ultra Haute Définition (4K)</SelectItem>
                        </SelectContent>
                     </Select>
                   </div>
                </div>

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <Button 
                   onClick={handleGenerate}
                   disabled={!prompt.trim() || isLoading}
                   className="w-full mt-8 bg-[#2d4a3e] hover:bg-[#234235] text-white py-6 rounded-none text-lg flex items-center justify-center gap-2"
                >
                   {isLoading ? (
                     <>
                       <Loader2 className="h-5 w-5 animate-spin" />
                       Création en cours...
                     </>
                   ) : (
                     <>
                       <Wand2 className="h-5 w-5" />
                       Générer le Design
                     </>
                   )}
                </Button>
              </div>
            </MotionDiv>

            {/* Output Section */}
            <MotionDiv 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 border border-[#d4b896]/20 shadow-sm min-h-[500px] flex flex-col"
            >
               {generatedImage ? (
                 <div className="relative h-full w-full bg-gray-100 flex items-center justify-center overflow-hidden group">
                    <img 
                      src={generatedImage} 
                      alt="Design généré" 
                      className="max-w-full max-h-[600px] object-contain shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <Button 
                         onClick={handleDownload}
                         className="bg-white text-[#2d4a3e] hover:bg-[#d4b896] border-none"
                       >
                         <Download className="h-5 w-5 mr-2" />
                         Télécharger
                       </Button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full w-full bg-[#faf9f7] border-2 border-dashed border-[#d4b896]/20 flex flex-col items-center justify-center text-center p-8">
                    {isLoading ? (
                       <div className="flex flex-col items-center">
                          <Loader2 className="h-12 w-12 text-[#d4b896] animate-spin mb-4" />
                          <p className="text-[#2d4a3e] font-serif text-xl">Nos artisans virtuels travaillent...</p>
                          <p className="text-gray-400 text-sm mt-2">Cela peut prendre quelques secondes.</p>
                       </div>
                    ) : (
                       <div className="flex flex-col items-center text-gray-400">
                          <Sparkles className="h-16 w-16 mb-4 opacity-20" />
                          <p className="text-lg">Votre création apparaîtra ici</p>
                          <p className="text-sm mt-2 max-w-xs">Utilisez le formulaire pour décrire le costume de vos rêves.</p>
                       </div>
                    )}
                 </div>
               )}
            </MotionDiv>
          </div>
        )}
      </div>
    </div>
  );
}
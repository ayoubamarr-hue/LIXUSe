import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Truck, ShieldCheck, Ruler, X, Loader2, CheckCircle, Minus, Plus, ChevronRight, ChevronLeft, Star, ZoomIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { PRODUCTS } from '../lib/data';
import { supabase } from '../lib/supabase';

const { useParams, Link, useNavigate } = ReactRouterDOM;
const MotionDiv = motion.div as any;

const SIZES = ['44', '46', '48', '50', '52', '54', '56', '58', '60', '62'];
const SHIRT_SIZES = ['37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];
const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COLORS = [
  { name: 'Blanc', hex: '#ffffff', border: true },
  { name: 'Bleu Ciel', hex: '#a8d1ff' },
  { name: 'Bleu Marine', hex: '#1a2b4b' },
  { name: 'Rose Pâle', hex: '#ffd1dc' },
  { name: 'Gris', hex: '#808080' },
  { name: 'Noir', hex: '#000000' }
];

const MOROCCAN_CITIES = [
  "Agadir", "Al Hoceima", "Beni Mellal", "Berkane", "Berrechid", 
  "Casablanca", "Dakhla", "El Jadida", "Errachidia", "Essaouira", 
  "Fès", "Guelmim", "Ifrane", "Kenitra", "Khemisset", "Khouribga", 
  "Laayoune", "Larache", "Marrakech", "Meknès", "Mohammedia", 
  "Nador", "Ouarzazate", "Oujda", "Rabat", "Safi", "Salé", 
  "Settat", "Tanger", "Taza", "Temara", "Tetouan"
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Order State
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedJacketSize, setSelectedJacketSize] = useState("");
  const [selectedPantsSize, setSelectedPantsSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState({ x: 0, y: 0, isActive: false });
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      setIsLoading(true);
      const staticProduct = PRODUCTS.find(p => p.id === id);
      setProduct(staticProduct || null);
      
      if (staticProduct) {
        // Set default color based on product ID
        if (staticProduct.id === 'gala-black-tie') {
          setSelectedColor('Noir');
        } else if (staticProduct.id === 'gala-white-tie') {
          setSelectedColor('Blanc');
        } else {
          setSelectedColor('Blanc');
        }
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleColorSelect = (colorName: string) => {
    // Redirect logic for Gala Ties
    if (product.id === 'gala-black-tie' && colorName === 'Blanc') {
      navigate('/product/gala-white-tie');
      return;
    }
    if (product.id === 'gala-white-tie' && colorName === 'Noir') {
      navigate('/product/gala-black-tie');
      return;
    }
    
    setSelectedColor(colorName);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f7] text-[#2d4a3e]">
        <Loader2 className="h-10 w-10 animate-spin mb-4 text-[#d4b896]" />
        <p>Chargement du produit...</p>
      </div>
    );
  }

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

  // Simulate multiple images for gallery functionality as requested
  // In a real app, this would come from the product data
  const productImages = [product.image, product.image, product.image]; 

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const isSuit = ['Costumes', 'Tuxedos'].includes(product.category);
  const isShirt = ['Chemises'].includes(product.category);
  const isAccessory = ['Accessoires'].includes(product.category);

  const availableSizes = isShirt ? SHIRT_SIZES : isSuit ? SIZES : STANDARD_SIZES;

  const handleOrderClick = () => {
    // Validation
    if (isSuit && (!selectedJacketSize || !selectedPantsSize)) {
      alert("Veuillez sélectionner les tailles de veste et de pantalon.");
      return;
    }
    if (!isSuit && !isAccessory && !selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ x, y, isActive: true });
  };

  const handleZoomLeave = () => {
    setZoom(prev => ({ ...prev, isActive: false }));
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-4 md:pt-12 pb-12 md:pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4 md:mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide">
            <Link to="/" className="hover:text-[#2d4a3e]">Accueil</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/Collections" className="hover:text-[#2d4a3e]">Collections</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-[#2d4a3e] font-medium">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-7">
            <MotionDiv 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-24"
            >
              <div 
                className="relative aspect-[3/4] lg:aspect-auto lg:h-[800px] bg-gray-100 overflow-hidden group cursor-crosshair"
                onMouseMove={handleZoomMove}
                onMouseLeave={handleZoomLeave}
              >
                <img 
                  src={productImages[currentImageIndex]} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
                  style={{
                    transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    transform: zoom.isActive ? 'scale(2)' : 'scale(1)'
                  }}
                />
                
                {/* Zoom Hint - Only show on desktop */}
                <div className={`absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-[#2d4a3e] rounded-sm pointer-events-none transition-opacity duration-300 items-center gap-2 hidden md:flex ${zoom.isActive ? 'opacity-0' : 'opacity-100'}`}>
                    <ZoomIn className="h-3 w-3" />
                    Survoler pour zoomer
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-[#2d4a3e] hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-[#2d4a3e] hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className={`absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 text-xs rounded-full transition-opacity duration-300 ${zoom.isActive ? 'opacity-0' : 'opacity-100'}`}>
                  {currentImageIndex + 1} / {productImages.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2 justify-center lg:justify-start">
                 {productImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-20 h-24 flex-shrink-0 border-2 transition-colors ${currentImageIndex === idx ? 'border-[#2d4a3e]' : 'border-transparent'}`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                 ))}
              </div>
            </MotionDiv>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 flex flex-col">
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2d4a3e] mb-2 text-center lg:text-left">{product.title}</h1>
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                 <p className="text-2xl text-[#2d4a3e] font-light">{product.price} MAD</p>
                 <div className="flex text-[#d4b896] text-sm items-center">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-gray-400 ml-2">(24 avis)</span>
                 </div>
              </div>

              <div className="text-gray-600 mb-8 leading-relaxed font-light text-sm text-center lg:text-justify px-2 lg:px-0">
                <p>{product.description}</p>
              </div>

              {/* Configuration Box */}
              <div className="bg-white p-5 md:p-8 border border-[#d4b896]/20 mb-8 shadow-sm">
                <h3 className="font-serif text-[#2d4a3e] text-lg mb-6 pb-2 border-b border-gray-100 text-center lg:text-left">Configuration</h3>
                
                {/* Color Selector */}
                <div className="mb-8 flex flex-col items-center lg:items-start">
                    <Label className="text-sm text-gray-500 mb-3 block">
                        Couleur: <span className="text-[#2d4a3e] font-medium ml-1">{selectedColor}</span>
                    </Label>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        {COLORS.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => handleColorSelect(color.name)}
                                className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                                    selectedColor === color.name 
                                        ? 'border-[#2d4a3e] scale-110 ring-2 ring-[#2d4a3e] ring-offset-2' 
                                        : 'border-transparent hover:scale-110'
                                }`}
                                style={{ 
                                  backgroundColor: color.hex, 
                                  borderWidth: color.border ? '1px' : '0px', 
                                  borderColor: color.border ? '#e5e7eb' : 'transparent',
                                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Size Selector */}
                {isSuit ? (
                    <div className="space-y-6 mb-8 w-full">
                        <div>
                            <div className="flex justify-between items-center mb-3 px-1">
                                <Label className="text-sm text-gray-500 w-full text-center lg:text-left">Taille Veste (EU)</Label>
                                <span className="text-xs underline cursor-pointer text-[#d4b896] whitespace-nowrap">Guide des tailles</span>
                            </div>
                            <Select value={selectedJacketSize} onValueChange={setSelectedJacketSize}>
                                <SelectTrigger className="w-full h-12 rounded-none border-[#d4b896]/30 bg-white text-[#2d4a3e]">
                                    <SelectValue placeholder="Sélectionner la taille veste" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#d4b896]/30 max-h-[200px] z-[70] text-[#2d4a3e]">
                                    {SIZES.map((size) => (
                                        <SelectItem key={`jacket-${size}`} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-3 px-1">
                                <Label className="text-sm text-gray-500 w-full text-center lg:text-left">Taille Pantalon (EU)</Label>
                            </div>
                            <Select value={selectedPantsSize} onValueChange={setSelectedPantsSize}>
                                <SelectTrigger className="w-full h-12 rounded-none border-[#d4b896]/30 bg-white text-[#2d4a3e]">
                                    <SelectValue placeholder="Sélectionner la taille pantalon" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#d4b896]/30 max-h-[200px] z-[70] text-[#2d4a3e]">
                                    {SIZES.map((size) => (
                                        <SelectItem key={`pants-${size}`} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ) : !isAccessory ? (
                     <div className="mb-8 w-full">
                        <div className="flex justify-between items-center mb-3 px-1">
                             <Label className="text-sm text-gray-500 w-full text-center lg:text-left">Taille {isShirt ? '(Col)' : ''}</Label>
                             <span className="text-xs underline cursor-pointer text-[#d4b896] whitespace-nowrap">Guide des tailles</span>
                        </div>
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                            <SelectTrigger className="w-full h-12 rounded-none border-[#d4b896]/30 bg-white text-[#2d4a3e]">
                                <SelectValue placeholder={`Sélectionner la taille ${isShirt ? '(Col)' : ''}`} />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-[#d4b896]/30 max-h-[200px] z-[70] text-[#2d4a3e]">
                                {availableSizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : null}

                {/* Quantity */}
                <div className="pt-6 border-t border-gray-100 flex flex-col items-center lg:items-start">
                    <Label className="text-sm text-gray-500 mb-3 block">Quantité</Label>
                    <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                          className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-[#d4b896] transition-colors"
                        >
                          <Minus className="h-4 w-4"/>
                        </button>
                        <span className="w-12 text-center font-bold text-xl text-black">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)} 
                          className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-[#d4b896] transition-colors"
                        >
                          <Plus className="h-4 w-4"/>
                        </button>
                    </div>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-[#faf9f7] border border-[#d4b896]/10 p-6 mb-8 rounded-sm">
                <h3 className="font-serif text-[#2d4a3e] mb-4 text-lg text-center lg:text-left">Caractéristiques</h3>
                {product.features && (
                    <ul className="space-y-3">
                    {product.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start text-gray-600 text-sm">
                        <Check className="h-5 w-5 text-[#d4b896] mr-3 mt-0.5 flex-shrink-0" />
                        {feature}
                        </li>
                    ))}
                    </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mt-auto">
                <Button 
                  onClick={handleOrderClick}
                  className="w-full h-14 md:h-16 text-base md:text-lg bg-[#2d4a3e] hover:bg-[#234235] text-white rounded-none shadow-xl uppercase tracking-wider font-medium flex items-center justify-center gap-2"
                >
                  Commander (Paiement à la livraison)
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Link to="/Booking" className="block">
                  <Button 
                    variant="outline"
                    className="w-full h-14 text-base border-[#2d4a3e] text-[#2d4a3e] hover:bg-[#2d4a3e]/5 rounded-none"
                  >
                    Prendre rendez-vous pour essayage
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 md:mt-10 pt-8 border-t border-[#d4b896]/20">
                <div className="text-center px-2 group cursor-default">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100 shadow-sm group-hover:border-[#d4b896] transition-colors">
                     <Truck className="h-5 w-5 text-[#d4b896]" />
                  </div>
                  <p className="text-[10px] md:text-xs text-[#2d4a3e] uppercase tracking-wide font-medium">Livraison Gratuite</p>
                </div>
                <div className="text-center px-2 group cursor-default">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100 shadow-sm group-hover:border-[#d4b896] transition-colors">
                     <ShieldCheck className="h-5 w-5 text-[#d4b896]" />
                  </div>
                  <p className="text-[10px] md:text-xs text-[#2d4a3e] uppercase tracking-wide font-medium">Qualité Garantie</p>
                </div>
                <div className="text-center px-2 group cursor-default">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100 shadow-sm group-hover:border-[#d4b896] transition-colors">
                     <Ruler className="h-5 w-5 text-[#d4b896]" />
                  </div>
                  <p className="text-[10px] md:text-xs text-[#2d4a3e] uppercase tracking-wide font-medium">Retouches Incluses</p>
                </div>
              </div>

            </MotionDiv>
          </div>
        </div>
      </div>

      {/* Order Modal (Simplified) */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <OrderModal 
            product={product} 
            selection={{
                color: selectedColor,
                size: selectedSize,
                jacketSize: selectedJacketSize,
                pantsSize: selectedPantsSize,
                quantity: quantity
            }}
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

interface OrderSelection {
    color: string;
    size: string;
    jacketSize: string;
    pantsSize: string;
    quantity: number;
}

function OrderModal({ product, selection, onClose, onSuccess }: { product: any, selection: OrderSelection, onClose: () => void, onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Rabat',
    postalCode: '10000',
  });

  const isSuit = ['Costumes', 'Tuxedos'].includes(product.category);
  const isAccessory = ['Accessoires'].includes(product.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Push order to Supabase
      const { error } = await supabase.from('orders').insert([
        {
          product_title: product.title,
          customer_name: formData.name,
          customer_phone: formData.phone,
          address: formData.address,
          city: formData.city,
          size: isSuit ? null : selection.size,
          jacket_size: isSuit ? selection.jacketSize : null,
          pants_size: isSuit ? selection.pantsSize : null,
          color: selection.color,
          quantity: selection.quantity,
          total_price: product.price * selection.quantity,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      setIsLoading(false);
      onClose();
      onSuccess();
    } catch (error: any) {
      console.warn('Database insertion failed (using WhatsApp fallback):', error.message || error);
      
      // FALLBACK: WhatsApp
      const sizeDetails = isSuit 
        ? `Veste: ${selection.jacketSize}, Pantalon: ${selection.pantsSize}`
        : isAccessory 
          ? `Taille Unique`
          : `Taille: ${selection.size}`;

      const message = `*Nouvelle Commande (Site Web)*\n\n` +
        `📦 *Produit:* ${product.title}\n` +
        `🎨 *Couleur:* ${selection.color}\n` +
        `💰 *Prix Total:* ${product.price * selection.quantity} MAD\n` +
        `🔢 *Quantité:* ${selection.quantity}\n` +
        `📏 *Détails:* ${sizeDetails}\n\n` +
        `👤 *Nom:* ${formData.name}\n` +
        `📞 *Tél:* ${formData.phone}\n` +
        `📍 *Adresse:* ${formData.address}, ${formData.city} (${formData.postalCode})`;

      const whatsappUrl = `https://wa.me/212620565941?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setIsLoading(false);
      onClose();
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-lg p-5 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-[#2d4a3e]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#2d4a3e]">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-serif text-[#2d4a3e] mb-2">Finaliser la Commande</h2>
        <p className="text-gray-500 mb-6 text-sm">Vos informations de livraison.</p>

        <div className="bg-[#faf9f7] p-4 mb-6 flex gap-4 items-start border border-[#d4b896]/20">
          <img src={product.image} alt={product.title} className="w-16 h-20 object-cover" />
          <div className="flex-1">
            <h4 className="font-medium text-[#2d4a3e]">{product.title}</h4>
            <p className="text-sm text-gray-500">
               {isSuit ? `Veste ${selection.jacketSize} / Pantalon ${selection.pantsSize}` : `Taille ${selection.size || 'Unique'}`} • {selection.color}
            </p>
            <div className="flex justify-between items-center mt-1">
               <p className="text-[#d4b896] font-medium">{product.price * selection.quantity} MAD</p>
               <span className="text-xs text-gray-400">Qté: {selection.quantity}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Select 
                value={formData.city} 
                onValueChange={(value) => setFormData({...formData, city: value})}
              >
                <SelectTrigger className="mt-1 h-12 rounded-none border-[#d4b896]/30 bg-white text-[#2d4a3e]">
                  <SelectValue placeholder="Sélectionner une ville" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#d4b896]/30 max-h-[200px] z-[70] text-[#2d4a3e]">
                  {MOROCCAN_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Code Postal</Label>
              <Input 
                value={formData.postalCode} 
                onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                placeholder="10000" 
                className="mt-1" 
              />
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
            className="w-full bg-[#2d4a3e] hover:bg-[#234235] text-white h-12 mt-4 rounded-none"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmer la commande"}
          </Button>
        </form>
      </MotionDiv>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <MotionDiv
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
        <Button onClick={onClose} className="bg-[#d4b896] hover:bg-[#c9a96e] text-[#2d4a3e] w-full rounded-none">
          Fermer
        </Button>
      </MotionDiv>
    </div>
  );
}
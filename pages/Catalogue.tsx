import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check, ChevronDown, Search, ArrowRight, Copy, Plus, Minus, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const MotionDiv = motion.div as any;

// 🔹 TypeScript Data Model
interface Fabric {
  id: string;
  name: string;
  brand: "Zegna" | "Reda" | "Drago" | "Dormeuil";
  collection: string;
  pricePerMeter: number;
  season: "Summer" | "Winter" | "All Season";
  weight: string;
  pattern: "Plain" | "Striped" | "Check" | "Micro-pattern";
  image: string;
}

// 🔹 STATIC FALLBACK DATA
const STATIC_FABRICS: Fabric[] = [
  // 🇮🇹 ZEGNA FABRICS
  {
    id: "zegna-1",
    name: "Trofeo Super 130’s Navy",
    brand: "Zegna",
    collection: "Trofeo",
    pricePerMeter: 3200,
    season: "All Season",
    weight: "250g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Trofeo%20Super%20130s%20Navy.jpg"
  },
  {
    id: "zegna-2",
    name: "Trofeo Super 150’s Black",
    brand: "Zegna",
    collection: "Trofeo",
    pricePerMeter: 3800,
    season: "Winter",
    weight: "240g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Trofeo%20Super%20150s%20Black.jpg"
  },
  {
    id: "zegna-3",
    name: "Electa Charcoal",
    brand: "Zegna",
    collection: "Electa",
    pricePerMeter: 2800,
    season: "All Season",
    weight: "270g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Electa%20Charcoal.jpg"
  },
  {
    id: "zegna-4",
    name: "Traveller Micro Design",
    brand: "Zegna",
    collection: "Traveller",
    pricePerMeter: 3600,
    season: "All Season",
    weight: "260g",
    pattern: "Micro-pattern",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Traveller%20Micro%20Design.webp"
  },
  {
    id: "zegna-5",
    name: "Cool Effect Light Grey",
    brand: "Zegna",
    collection: "Cool Effect",
    pricePerMeter: 3300,
    season: "Summer",
    weight: "230g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Cool%20Effect%20Light%20Grey.jpeg"
  },
  {
    id: "zegna-6",
    name: "Trofeo Cashmere Anthracite",
    brand: "Zegna",
    collection: "Trofeo Cashmere",
    pricePerMeter: 4800,
    season: "Winter",
    weight: "260g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Trofeo%20Cashmere%20Anthracite%20(1).webp"
  },
  {
    id: "zegna-7",
    name: "High Performance Stretch Navy",
    brand: "Zegna",
    collection: "High Performance",
    pricePerMeter: 3200,
    season: "All Season",
    weight: "260g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/High%20Performance%20Stretch%20Navy%20(1).webp"
  },
  {
    id: "zegna-8",
    name: "Silk Blend Midnight Blue",
    brand: "Zegna",
    collection: "Silk Blend",
    pricePerMeter: 5500,
    season: "All Season",
    weight: "240g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Silk%20Blend%20Midnight%20Blue.jpg"
  },
  {
    id: "zegna-9",
    name: "15 MILMIL 15 Striped Grey Hazelnut",
    brand: "Zegna",
    collection: "15MILMIL15",
    pricePerMeter: 2600,
    season: "Winter",
    weight: "280g",
    pattern: "Striped",
    image: "https://www.tessin.it/media/catalog/product/cache/e3a6d4fe5c6306a2ca1ada008b15dbf3/e/z/ez-217-0141-02.jpg"
  },

  // 🇮🇹 REDA FABRICS
  {
    id: "reda-1",
    name: "Super 130’s Navy",
    brand: "Reda",
    collection: "Super 130’s",
    pricePerMeter: 2200,
    season: "All Season",
    weight: "250g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Trofeo%20Super%20130s%20Navy.jpg"
  },
  {
    id: "reda-2",
    name: "Flexo Stretch Grey",
    brand: "Reda",
    collection: "Flexo",
    pricePerMeter: 2400,
    season: "All Season",
    weight: "260g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Flexo%20Stretch%20Grey.png"
  },
  {
    id: "reda-3",
    name: "Active Traveller Blue",
    brand: "Reda",
    collection: "Active",
    pricePerMeter: 2600,
    season: "All Season",
    weight: "270g",
    pattern: "Micro-pattern",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Active%20Traveller%20Blue%20reda.webp"
  },
  {
    id: "reda-4",
    name: "Summer Fresco Beige",
    brand: "Reda",
    collection: "Fresco",
    pricePerMeter: 2100,
    season: "Summer",
    weight: "220g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Summer%20Fresco%20Beige.jpg"
  },

  // 🇮🇹 DRAGO FABRICS
  {
    id: "drago-1",
    name: "Super 130’s Classic Blue",
    brand: "Drago",
    collection: "Super 130’s",
    pricePerMeter: 2000,
    season: "All Season",
    weight: "250g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Super130sClassicBlue.jpg"
  },
  {
    id: "drago-2",
    name: "Skyfall Check Grey",
    brand: "Drago",
    collection: "Skyfall",
    pricePerMeter: 2300,
    season: "All Season",
    weight: "260g",
    pattern: "Check",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Skyfall%20Check%20Grey.jpg"
  },

  // 🇫🇷 DORMEUIL FABRICS
  {
    id: "dormeuil-1",
    name: "Amadeus 365 Navy",
    brand: "Dormeuil",
    collection: "Amadeus 365",
    pricePerMeter: 3500,
    season: "All Season",
    weight: "260g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Amadeus%20365%20Navy.webp"
  },
  {
    id: "dormeuil-2",
    name: "Tonik Wool Mohair Grey",
    brand: "Dormeuil",
    collection: "Tonik",
    pricePerMeter: 4200,
    season: "Summer",
    weight: "240g",
    pattern: "Plain",
    image: "https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/tissus/Tonik%20Wool%20Mohair%20Grey%20(1).jpg"
  }
];

// Fallback image for broken paths
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1596541223126-72bb1f92e922?q=80&w=800&auto=format&fit=crop";

export default function Catalogue() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1500, 6000]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [meters, setMeters] = useState(3.0);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState({ x: 0, y: 0, isActive: false });

  // Data state
  const [fabrics] = useState<Fabric[]>(STATIC_FABRICS);
  const [isLoading] = useState(false);

  // Reset meters and zoom when modal opens
  useEffect(() => {
    if (selectedFabric) {
      setMeters(3.0);
      setZoom({ x: 0, y: 0, isActive: false });
    }
  }, [selectedFabric]);

  // Derive unique options from current data
  // Cast to string[] to ensure type safety in filters
  const brands = Array.from(new Set(fabrics.map(f => f.brand))) as string[];
  const seasons = Array.from(new Set(fabrics.map(f => f.season))) as string[];
  const patterns = Array.from(new Set(fabrics.map(f => f.pattern))) as string[];

  // Filtering Logic
  const filteredFabrics = useMemo(() => {
    return fabrics.filter(fabric => {
      // Search
      if (searchQuery && !fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) && !fabric.collection.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(fabric.brand)) {
        return false;
      }
      // Seasons
      if (selectedSeasons.length > 0 && !selectedSeasons.includes(fabric.season)) {
        return false;
      }
      // Patterns
      if (selectedPatterns.length > 0 && !selectedPatterns.includes(fabric.pattern)) {
        return false;
      }
      // Price
      if (fabric.pricePerMeter < priceRange[0] || fabric.pricePerMeter > priceRange[1]) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerMeter - b.pricePerMeter;
      if (sortBy === 'price-desc') return b.pricePerMeter - a.pricePerMeter;
      return 0; // Default order
    });
  }, [fabrics, searchQuery, selectedBrands, selectedSeasons, selectedPatterns, priceRange, sortBy]);

  const toggleFilter = (item: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSeasons([]);
    setSelectedPatterns([]);
    setPriceRange([1500, 6000]);
    setSearchQuery("");
  };

  const handleWhatsAppInquiry = () => {
    if (!selectedFabric) return;

    const totalPrice = selectedFabric.pricePerMeter * meters;

    // Use template literal without indentation to preserve formatting in URL
    const message = `Bonjour, je suis intéressé par ce tissu :
Nom : ${selectedFabric.name}
Référence: ${selectedFabric.id.toUpperCase()}
Marque : ${selectedFabric.brand}
Collection : ${selectedFabric.collection}
Métrage souhaité : ${meters.toFixed(1)} mètres
Prix unitaire : ${selectedFabric.pricePerMeter} MAD / mètre
Prix Total estimé : ${totalPrice} MAD
Image : ${selectedFabric.image}`;

    const whatsappUrl = `https://wa.me/212620565941?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyReference = () => {
    if (selectedFabric) {
        navigator.clipboard.writeText(selectedFabric.id.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
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
    <div className="min-h-screen bg-[#faf9f7] text-[#2d4a3e]">
      {/* Header */}
      <div className="bg-[#2d4a3e] text-white py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Catalogue</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-6 font-serif">Tissus d'Exception</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Explorez notre collection exclusive de tissus italiens et anglais. 
            Sélectionnez la matière parfaite pour votre prochaine création sur mesure.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <Button 
              onClick={() => setMobileFiltersOpen(true)}
              variant="outline"
              className="border-[#2d4a3e] text-[#2d4a3e]"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <span className="text-sm text-gray-500">{filteredFabrics.length} Tissus</span>
          </div>

          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:static lg:bg-transparent lg:p-0 lg:w-64 lg:block lg:border-r lg:border-[#d4b896]/20 lg:pr-8
            ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex justify-between items-center mb-8 lg:hidden">
              <h2 className="text-xl font-serif">Filtres</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#d4b896]/30"
                />
              </div>
            </div>

            {/* Active Filters Summary */}
            {(selectedBrands.length > 0 || selectedSeasons.length > 0 || selectedPatterns.length > 0) && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Filtres actifs</span>
                  <button onClick={clearFilters} className="text-xs text-[#d4b896] hover:underline">Tout effacer</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...selectedBrands, ...selectedSeasons, ...selectedPatterns].map((f) => (
                    <span key={f} className="text-xs bg-[#2d4a3e] text-white px-2 py-1 rounded-sm flex items-center gap-1">
                      {f}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => {
                         if(brands.includes(f)) toggleFilter(f, selectedBrands, setSelectedBrands);
                         if(seasons.includes(f)) toggleFilter(f, selectedSeasons, setSelectedSeasons);
                         if(patterns.includes(f)) toggleFilter(f, selectedPatterns, setSelectedPatterns);
                      }} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#d4b896]/20 pb-2">Marque</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 border border-[#2d4a3e] flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-[#2d4a3e]' : 'bg-white'}`}>
                      {selectedBrands.includes(brand) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                    />
                    <span className="text-sm group-hover:text-[#d4b896] transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#d4b896]/20 pb-2">
                Prix / Mètre
              </h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="1500" 
                  max="6000" 
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#2d4a3e] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                  <span>{priceRange[0]} MAD</span>
                  <span>{priceRange[1]} MAD</span>
                </div>
              </div>
            </div>

            {/* Season Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#d4b896]/20 pb-2">Saison</h3>
              <div className="space-y-2">
                {seasons.map(season => (
                  <label key={season} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 border border-[#2d4a3e] flex items-center justify-center transition-colors ${selectedSeasons.includes(season) ? 'bg-[#2d4a3e]' : 'bg-white'}`}>
                      {selectedSeasons.includes(season) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedSeasons.includes(season)}
                      onChange={() => toggleFilter(season, selectedSeasons, setSelectedSeasons)}
                    />
                    <span className="text-sm group-hover:text-[#d4b896] transition-colors">{season}</span>
                  </label>
                ))}
              </div>
            </div>

             {/* Pattern Filter */}
             <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#d4b896]/20 pb-2">Motif</h3>
              <div className="space-y-2">
                {patterns.map(pattern => (
                  <label key={pattern} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 border border-[#2d4a3e] flex items-center justify-center transition-colors ${selectedPatterns.includes(pattern) ? 'bg-[#2d4a3e]' : 'bg-white'}`}>
                      {selectedPatterns.includes(pattern) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedPatterns.includes(pattern)}
                      onChange={() => toggleFilter(pattern, selectedPatterns, setSelectedPatterns)}
                    />
                    <span className="text-sm group-hover:text-[#d4b896] transition-colors">{pattern}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="lg:hidden mt-8">
               <Button className="w-full bg-[#2d4a3e] text-white" onClick={() => setMobileFiltersOpen(false)}>
                 Voir {filteredFabrics.length} Tissus
               </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sorting Bar */}
            <div className="flex justify-between items-center mb-6 border-b border-[#d4b896]/20 pb-4">
               <span className="text-sm text-gray-500 hidden md:block">
                 Affichage de {filteredFabrics.length} résultats
               </span>
               <div className="flex items-center gap-2 ml-auto">
                 <span className="text-sm text-gray-500">Trier par:</span>
                 <div className="relative">
                   <select 
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value as any)}
                     className="appearance-none bg-transparent text-sm font-medium pr-8 pl-2 py-1 focus:outline-none cursor-pointer"
                   >
                     <option value="newest">Nouveautés</option>
                     <option value="price-asc">Prix croissant</option>
                     <option value="price-desc">Prix décroissant</option>
                   </select>
                   <ChevronDown className="h-4 w-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                 </div>
               </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="h-12 w-12 animate-spin text-[#d4b896] mb-4" />
                <p className="text-gray-500 font-light">Chargement du catalogue...</p>
              </div>
            ) : filteredFabrics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredFabrics.map((fabric) => (
                    <MotionDiv
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={fabric.id}
                      className="bg-white border border-[#d4b896]/10 group hover:border-[#d4b896]/50 transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer" onClick={() => setSelectedFabric(fabric)}>
                        <img 
                          src={fabric.image} 
                          alt={fabric.name}
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2d4a3e]">
                          {fabric.brand}
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <div className="mb-2 text-xs text-gray-500 uppercase tracking-wide">{fabric.collection}</div>
                        <h3 className="font-serif text-lg text-[#2d4a3e] mb-2 truncate" title={fabric.name}>{fabric.name}</h3>
                        
                        <div className="flex items-end justify-between mt-4">
                           <div>
                             <p className="text-xs text-gray-400">Prix au mètre</p>
                             <p className="font-medium text-[#2d4a3e]">{fabric.pricePerMeter} MAD</p>
                           </div>
                           <Button 
                             size="sm" 
                             variant="ghost" 
                             className="text-[#d4b896] hover:text-[#2d4a3e] hover:bg-[#d4b896]/10 p-0 h-auto"
                             onClick={() => setSelectedFabric(fabric)}
                           >
                             Détails <ArrowRight className="h-4 w-4 ml-1" />
                           </Button>
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-xl text-gray-400 font-light mb-4">Aucun tissu ne correspond à vos critères.</p>
                <Button onClick={clearFilters} variant="outline" className="border-[#2d4a3e] text-[#2d4a3e]">
                  Effacer les filtres
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Fabric Modal */}
      <AnimatePresence>
        {selectedFabric && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
             <MotionDiv 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedFabric(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />
             <MotionDiv
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative bg-white w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
             >
               <button onClick={() => setSelectedFabric(null)} className="absolute top-4 right-4 z-10 bg-white/50 p-2 rounded-full hover:bg-white transition-colors">
                 <X className="h-5 w-5 text-[#2d4a3e]" />
               </button>

               <div 
                 className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative overflow-hidden cursor-crosshair group"
                 onMouseMove={handleZoomMove}
                 onMouseLeave={handleZoomLeave}
               >
                  <img 
                    src={selectedFabric.image} 
                    alt={selectedFabric.name} 
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
                    style={{
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      transform: zoom.isActive ? 'scale(2.5)' : 'scale(1)'
                    }}
                  />
                  <div className={`absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-[#2d4a3e] rounded-sm pointer-events-none transition-opacity duration-300 flex items-center gap-2 ${zoom.isActive ? 'opacity-0' : 'opacity-100'}`}>
                     <Search className="h-3 w-3" />
                     Survoler pour zoomer
                  </div>
               </div>

               <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                  <span className="text-[#d4b896] text-xs font-bold uppercase tracking-wider mb-2 block">{selectedFabric.brand}</span>
                  <h2 className="text-2xl font-serif text-[#2d4a3e] mb-4">{selectedFabric.name}</h2>
                  <p className="text-xl text-[#2d4a3e] font-light mb-6 border-b border-[#d4b896]/20 pb-4">
                    {selectedFabric.pricePerMeter} MAD <span className="text-sm text-gray-400">/ mètre</span>
                  </p>

                  <div className="space-y-4 text-sm text-gray-600 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Collection</span>
                      <span className="font-medium text-[#2d4a3e]">{selectedFabric.collection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saison</span>
                      <span className="font-medium text-[#2d4a3e]">{selectedFabric.season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Poids</span>
                      <span className="font-medium text-[#2d4a3e]">{selectedFabric.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Motif</span>
                      <span className="font-medium text-[#2d4a3e]">{selectedFabric.pattern}</span>
                    </div>
                  </div>

                  {/* Meter Selector */}
                  <div className="mb-6 pt-6 border-t border-[#d4b896]/20">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-500 text-sm">Métrage (mètres)</span>
                        <span className="font-bold text-[#d4b896] text-lg">{(selectedFabric.pricePerMeter * meters).toLocaleString()} MAD</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setMeters(Math.max(1, parseFloat((meters - 0.1).toFixed(1))))}
                          className="rounded-none border-[#d4b896]/50 text-[#2d4a3e] w-12 h-12"
                        >
                          <Minus className="h-5 w-5" />
                        </Button>
                        <div className="flex-1 text-center font-serif text-2xl text-[#2d4a3e]">
                          {meters.toFixed(1)} m
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setMeters(parseFloat((meters + 0.1).toFixed(1)))}
                          className="rounded-none border-[#d4b896]/50 text-[#2d4a3e] w-12 h-12"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 text-center italic">
                       Quantité recommandée pour un costume : 3.0 mètres
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Button 
                        onClick={handleWhatsAppInquiry}
                        className="w-full bg-[#2d4a3e] hover:bg-[#234235] text-white py-6 rounded-none mb-3"
                    >
                      Demander ce tissu
                    </Button>
                    <div 
                        className="flex items-center justify-center gap-2 text-xs text-gray-400 cursor-pointer hover:text-[#2d4a3e] transition-colors group"
                        onClick={copyReference}
                        title="Cliquer pour copier"
                    >
                      <span>Référence: {selectedFabric.id.toUpperCase()}</span>
                      {copied ? (
                        <Check className="h-3 w-3 text-green-600 animate-in zoom-in" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>
               </div>
             </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
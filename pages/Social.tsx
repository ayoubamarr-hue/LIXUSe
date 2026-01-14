import React from 'react';
import { Facebook, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Social() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pb-24">
      {/* Header */}
      <div className="bg-[#2d4a3e] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#d4b896] text-sm tracking-[0.3em] uppercase">Communauté</span>
          <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">Suivez LIXUS</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
            Retrouvez nos dernières créations, nos inspirations et les coulisses de l'atelier sur nos réseaux sociaux.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Facebook Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#1877F2] rounded-full text-white">
                <Facebook className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-serif text-[#2d4a3e]">Facebook</h2>
            </div>
            
            <div className="bg-white p-4 shadow-lg border border-[#d4b896]/20 w-full max-w-[500px] flex justify-center min-h-[500px]">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Flixusateliersartorial&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="500" 
                height="600" 
                style={{border:'none', overflow:'hidden', maxWidth: '100%'}} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
            
            <a href="https://web.facebook.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer" className="mt-8">
              <Button className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-8 py-4 h-auto text-lg rounded-none">
                Voir la Page Facebook <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Instagram Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full text-white">
                <Instagram className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-serif text-[#2d4a3e]">Instagram</h2>
            </div>

            <div className="bg-white p-6 shadow-lg border border-[#d4b896]/20 w-full max-w-[500px]">
               <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/lixus+logo%20(1).png" alt="Lixus" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2d4a3e]">lixusateliersartorial</h3>
                    <p className="text-sm text-gray-500">Atelier Sartorial • Rabat</p>
                  </div>
                  <a href="https://instagram.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <Button size="sm" className="bg-[#d4b896] text-[#2d4a3e] hover:bg-[#c9a96e]">
                      Suivre
                    </Button>
                  </a>
               </div>
               
               {/* Mock Grid - Using existing images */}
               <div className="grid grid-cols-3 gap-1 mb-2">
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_692f8580989c6da35c8a231f/9ab2aa467_beigesuit_9_2048x2048__47640.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/SMOOKING%20NOIR.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/481237419_689813716944568_5304686865567794825_n19.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/3333333.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/galatie.webp" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/481293649_689102297015710_4167171937918863584_n26.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/cover2.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/5%20CHEMIS.jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src="https://mkqdxjrautahxjawicyt.supabase.co/storage/v1/object/public/LIXUS/FULL%20BLUE%20SUIT.jpg" className="w-full h-full object-cover" />
                  </div>
               </div>
               
               <div className="text-center p-4">
                 <p className="text-sm text-gray-500">
                    Découvrez plus de contenus exclusifs sur notre profil
                 </p>
               </div>
            </div>

             <a href="https://instagram.com/lixusateliersartorial" target="_blank" rel="noopener noreferrer" className="mt-8">
              <Button className="bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white border-none px-8 py-4 h-auto text-lg rounded-none">
                Suivre sur Instagram <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, Minus, Plus, X, ArrowUp } from 'lucide-react';
import Header from './components/Header';
import ArtworkCard from './components/ArtworkCard';
import { INITIAL_ARTWORKS } from './data';

const HERO_CARDS = [
  {
    id: 1,
    tag: 'Ad',
    tagColor: 'bg-black/50 text-white border border-white/20',
    title: 'Mobile Legends: Bang Bang 2026 Global Skin...',
    subtitle: 'Global artists, massive prizes - Join now!',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    tag: 'MARKETPLACE',
    tagColor: 'bg-black/80 text-white font-bold',
    title: 'Ctrl: Sun Sale',
    subtitle: 'Shop up to 70% off | ArtStation Marketplace',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    tag: 'PRINTS',
    tagColor: 'bg-black/80 text-white font-bold',
    title: 'Ctrl: Sun Sale',
    subtitle: 'Shop up to 30% off | ArtStation Prints',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    tag: '',
    title: 'New Feature - Hire Me',
    subtitle: 'Connect Your Freelance Platforms!',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop'
  }
];

const CATEGORIES = [
  { label: 'Character Animation', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop' },
  { label: 'Comic Art', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop' },
  { label: 'Game Art', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=100&auto=format&fit=crop' },
  { label: 'Architectural Visualization', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=100&auto=format&fit=crop' },
  { label: 'Web and App Design', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop' },
  { label: 'Twinmotion', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=100&auto=format&fit=crop' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Community');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full mx-auto pb-32">

        <section className="w-full px-4 pt-6 pb-4 max-w-[1920px] mx-auto">
          <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
            {HERO_CARDS.map(card => (
              <div 
                key={card.id} 
                className="snap-start shrink-0 relative w-[85vw] md:w-[40vw] lg:w-[400px] aspect-[16/9] lg:h-[220px] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {card.tag && (
                  <div className={`absolute top-4 left-4 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase ${card.tagColor}`}>
                    {card.tag}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-white font-black text-lg lg:text-xl leading-tight truncate drop-shadow-md">
                    {card.title}
                  </h3>
                  <p className="text-[#A0A4AB] text-[12px] lg:text-[13px] font-medium mt-1 truncate drop-shadow-md">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full px-4 py-2 flex items-center gap-3 max-w-[1920px] mx-auto">
          <button className="h-9 w-9 bg-[#2A2C32] hover:bg-[#34373F] rounded flex items-center justify-center shrink-0 transition-colors text-white">
            <span className="text-xl leading-none -mt-1">...</span>
          </button>
          <button className="h-9 px-4 bg-[#2A2C32] hover:bg-[#34373F] rounded flex items-center gap-2 shrink-0 transition-colors text-white text-[13px] font-medium">
            <LayoutGrid className="h-4 w-4" /> All Channels
          </button>

          <button className="hidden sm:flex h-7 w-7 rounded-full bg-[#2A2C32] hover:bg-[#34373F] items-center justify-center shrink-0 text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex-1 flex overflow-x-auto no-scrollbar gap-2 scroll-smooth">
            {CATEGORIES.map((cat, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 pr-4 py-1 hover:bg-[#1A1D24] rounded-full cursor-pointer shrink-0 transition-colors"
              >
                <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                  <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
                </div>
                <span className="text-[13px] font-medium text-white">{cat.label}</span>
              </div>
            ))}
          </div>

          <button className="hidden sm:flex h-7 w-7 rounded-full bg-white text-black items-center justify-center shrink-0 transition-colors shadow-md ml-2">
            <ChevronRight className="h-4 w-4" />
          </button>
        </section>

        <section className="w-full px-1 lg:px-4 pt-4 max-w-[1920px] mx-auto">
          <h2 className="text-[24px] lg:text-[28px] font-bold text-white mb-4 px-3 lg:px-0">All Channels</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[2px]">

            {INITIAL_ARTWORKS.slice(0, 18).map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}

            <div className="col-span-full w-full bg-gradient-to-r from-[#03061C] via-[#091544] to-[#14429B] flex flex-col lg:flex-row items-center justify-between gap-6 my-2 lg:my-[2px] p-6 lg:p-8 rounded-none">

              <div className="w-full lg:w-1/3 flex flex-col items-center text-center lg:items-start lg:pr-8 lg:text-left">
                <div className="flex items-center gap-2 bg-[#1A1D24]/40 border border-white/10 px-2 py-0.5 rounded-sm mb-4">
                  <span className="text-[#13AFF0] font-mono font-bold text-[10px] tracking-widest bg-[#13AFF0]/20 px-1 rounded-sm">PRO</span>
                  <span className="text-white text-[13px] font-bold">Spotlight</span>
                </div>
                <p className="text-white/90 text-[14px] lg:text-[15px] font-medium leading-relaxed max-w-sm">
                  Discover some of the recent projects from our Pro community.
                </p>
                <button className="mt-6 border border-white/20 hover:border-white/50 text-white font-medium text-[12px] px-5 py-2.5 rounded transition-colors bg-white/5">
                  Explore the Pro Community
                </button>
              </div>

              <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { title: "Monkey King Staff", artist: "Markus Boursiquot", img: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&auto=format&fit=crop" },
                  { title: "Meridian 1988: 19...", artist: "Dekogon Studios", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&auto=format&fit=crop" },
                  { title: "The estate is neve...", artist: "Hauzkaz Designs", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop" },
                  { title: "- GateKeeper -", artist: "Nazz Abdoel", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop" }
                ].map((item, idx) => (
                  <div key={idx} className={`relative rounded-xl overflow-hidden aspect-square border border-white/10 shadow-xl group cursor-pointer ${idx === 3 ? 'hidden lg:block' : ''}`}>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <h4 className="text-white text-[12px] font-bold truncate">{item.title}</h4>
                      <p className="text-[#A0A4AB] text-[9px] font-medium truncate mt-0.5">{item.artist}</p>
                      <p className="text-[#A0A4AB] text-[8px] truncate mt-0.5"><span className="text-[#13AFF0] font-bold">PRO</span> Member since 2021</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {INITIAL_ARTWORKS.slice(18).map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </section>

      </main>

      <button className="hidden md:flex fixed bottom-6 left-4 lg:left-6 h-12 w-12 rounded-full bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.5)] items-center justify-center hover:scale-105 transition-transform z-50">
        <LayoutGrid className="h-5 w-5" />
      </button>

      <button className="fixed bottom-6 right-4 lg:right-6 h-12 w-12 rounded-full bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center hover:scale-105 transition-transform z-50">
        <SlidersHorizontal className="h-5 w-5" />
      </button>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 left-4 md:left-20 lg:left-[88px] h-12 w-12 rounded-full bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center hover:scale-105 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 items-center h-12">
        {['Community', 'Trending', 'Latest'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 lg:px-6 py-2 rounded-full text-[12px] lg:text-[13px] font-bold transition-all h-full ${
              activeTab === tab 
                ? 'bg-[#0B0D14] text-white' 
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        {isMobileMenuOpen ? (
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.7)] flex flex-col w-[200px] overflow-hidden mb-0 transition-all origin-bottom scale-100 opacity-100">
            <div className="flex items-center justify-between px-6 py-4">
              <button className="text-gray-500 hover:text-black"><Minus className="h-5 w-5" /></button>
              <button className="text-black"><LayoutGrid className="h-5 w-5" /></button>
              <button className="text-gray-500 hover:text-black"><Plus className="h-5 w-5" /></button>
            </div>

            <div className="h-[1px] w-[80%] mx-auto bg-gray-200" />

            <div className="flex flex-col py-2 px-3 gap-1">
              {['Community', 'Trending', 'Latest'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                  className={`py-3 rounded-full text-[14px] font-bold transition-colors w-full ${
                    activeTab === tab 
                      ? 'bg-[#0B0D14] text-white' 
                      : 'text-[#0B0D14] bg-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="h-[1px] w-[80%] mx-auto bg-gray-200" />

            <div className="p-3">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 text-[#0B0D14] text-[14px] font-medium"
              >
                {activeTab} <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-white rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2 text-[#0B0D14] font-bold text-[14px] transition-transform hover:scale-105"
          >
            {activeTab}
          </button>
        )}
      </div>

    </div>
  );
}

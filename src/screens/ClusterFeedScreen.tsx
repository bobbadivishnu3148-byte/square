import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LIVE_SNIPPETS } from '../data/sampleData';
import { Product, VideoSnippet } from '../types';
import {
  Sparkles,
  Radio,
  Play,
  Pause,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Award,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { StatsStrip } from '../components/StatsStrip';

export const ClusterFeedScreen: React.FC = () => {
  const {
    products,
    selectProduct,
    addToCart,
    navigateToScreen,
    openAuthenticityModal,
    setIsCuratorOpen,
    t,
  } = useApp();

  const [activeSnippet, setActiveSnippet] = useState<VideoSnippet>(LIVE_SNIPPETS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const q = searchFilter.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.hub.toLowerCase().includes(q) ||
      p.cluster.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleBuyDirect = (product: Product) => {
    addToCart(product.id);
    selectProduct(product.id);
    navigateToScreen('cartSla');
  };

  const handleViewDetails = (product: Product) => {
    selectProduct(product.id);
    navigateToScreen('productDetails');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#2A2118] to-[#1C150E] text-[#FDFBF7] p-6 sm:p-10 lg:p-14 border border-[#423427] shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#8B4513]/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-[#1B4D3E]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B4513]/30 border border-[#A0522D]/50 text-xs sm:text-sm font-semibold text-[#F3C68F]">
            <Award className="w-4 h-4 text-[#F3C68F]" />
            <span>100% Certified Authentic Andhra Crafts, Toys & Sarees</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            Authentic, cluster-verified handicrafts, Etikoppaka toys, pot art & handloom sarees delivered directly from Andhra's artisan cooperatives.
          </h1>

          <p className="text-base sm:text-lg text-[#E4D9C8] leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Main Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white font-semibold text-base shadow-lg flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t.hero.primaryBtn}</span>
            </button>

            <button
              onClick={() => setIsCuratorOpen(true)}
              className="px-5 py-3.5 rounded-xl bg-[#1B4D3E] hover:bg-[#143B2F] border border-[#2B7760] text-white font-semibold text-base shadow-md flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#F3C68F]" />
              <span>{t.hero.curatorBtn}</span>
            </button>
          </div>

          <div className="pt-2 flex items-center gap-6 text-xs text-[#C5B8A5]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#48BB78]" />
              Physical Cluster Inspection Guard
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#F3C68F]" />
              Hub SLA: Dispatch &lt;36 hrs
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E2E8F0]" />
              Direct from Andhra Artisan Clusters
            </span>
          </div>
        </div>
      </section>

      {/* Why It Matters: 3 Stat Cards from prompt */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B4513]">
              The Harsh Reality of Open Marketplaces
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2A2118]">
              Why Physical Cluster Verification Matters
            </h2>
          </div>
          <span className="text-xs text-[#735A45] hidden sm:block">
            Verified Indian Artisan Statistics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-[#FAF7F0] border-2 border-[#E2D5BE] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#8B4513] transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C53030]/10 text-[#C53030] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#9B1C1C]">
                70% Counterfeits
              </div>
              <p className="text-sm text-[#4A3E31] leading-relaxed">
                70% of products sold as "handloom and authentic crafts" in India (worth ₹28,000–₹35,000 Cr) are fake powerloom or machine plastic/synthetic blends.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E8DEC8] mt-3">
              <a
                href="https://www.savehandloom.org/fake-handloom-in-india-the-state-by-state-map-of-a-national-scam/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8B4513] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Source: Save Handloom State Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF7F2] border-2 border-[#E2D5BE] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#8B4513] transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B4513]/10 text-[#8B4513] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#8B4513]">
                65% Middleman Markup
              </div>
              <p className="text-sm text-[#4A3E31] leading-relaxed">
                Middlemen capture up to 65% of profits, marking up a ₹2,000 weaver saree or ₹250 wooden toy to ₹6,500 in retail stores.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E8DEC8] mt-3">
              <a
                href="https://www.researchgate.net/publication/404772125_FROM_TRADITION_TO_MARKET_ACCESSING_THE_AUTHENTICITY_OF_SHANTIPUR_HANDLOOM_PRODUCTS"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8B4513] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Source: Traditional Products Authenticity Study</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF7F2] border-2 border-[#E2D5BE] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#8B4513] transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#1B4D3E]/10 text-[#1B4D3E] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#1B4D3E]">
                &lt; ₹5,000 / month
              </div>
              <p className="text-sm text-[#4A3E31] leading-relaxed">
                Over 68.5% of rural artisan and weaving households earn under ₹5,000 per month due to non-transparent supply chains and machine copies.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E8DEC8] mt-3">
              <a
                href="https://handlooms.nic.in/assets/img/Statistics/2486.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#1B4D3E] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Source: Ministry of Textiles Handloom & Crafts Census</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 1 Core Feature: Live Cluster Video Snippets */}
      <section className="bg-white border border-[#E2D5BE] rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-red-700">
                Live Workshop & Loom Stream
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2A2118] mt-1">
              {t.clusterFeed.liveTitle}
            </h2>
            <p className="text-sm text-[#6E5D4E] max-w-2xl">
              {t.clusterFeed.liveDesc}
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F4EFE6] text-[#8B4513] border border-[#DFCDB7] flex items-center gap-1.5 self-start sm:self-auto">
            <Radio className="w-4 h-4 text-red-600 animate-spin" />
            <span>{activeSnippet.liveViewersCount} Conscious Buyers Watching</span>
          </div>
        </div>

        {/* Interactive Snippet Player Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-black aspect-video sm:aspect-16/10 shadow-lg border border-[#D5C7B2] group">
            <img
              src={activeSnippet.videoThumb}
              alt={activeSnippet.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
            />
            {/* Dark overlay with live status */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 flex flex-col justify-between p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-600 text-white flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  LIVE HANDMADE STREAM
                </span>
                <span className="text-xs bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md text-white/90">
                  {activeSnippet.cluster}
                </span>
              </div>

              {/* Center Play/Pause button */}
              <div className="self-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/60 transition-transform active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? 'Pause snippet' : 'Play snippet'}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </button>
              </div>

              {/* Bottom text overlay */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#F3C68F] uppercase tracking-wider">
                  {activeSnippet.hub}
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {activeSnippet.title}
                </h3>
                <p className="text-xs text-white/90 line-clamp-2">
                  "{activeSnippet.craftAction}"
                </p>
              </div>
            </div>
          </div>

          {/* Snippet Details & 1-Click Buy Direct */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC8] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-wider">
                    Master Artisan at Work
                  </span>
                  <div className="text-lg font-serif font-bold text-[#2A2118]">
                    {activeSnippet.artisanName}
                  </div>
                  <div className="text-xs text-[#6E5D4E]">
                    {activeSnippet.experienceYears} Years Generational Guild Heritage
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E] font-bold">
                  <ShieldCheck className="w-6 h-6 text-[#1B4D3E]" />
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#DFCDB7] text-xs italic text-[#4A3E31] leading-relaxed">
                "{activeSnippet.artisanQuote}"
              </div>

              {/* Linked Product Quick Card */}
              {(() => {
                const linkedProduct = products.find((p) => p.id === activeSnippet.productId) || products[0];
                return (
                  <div className="pt-2 border-t border-[#E8DEC8] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#6E5D4E]">Current Item in Creation:</span>
                        <div className="text-sm font-bold text-[#2A2118]">
                          {linkedProduct.title}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#6E5D4E]">Cooperative Rate:</span>
                        <div className="text-base font-bold font-serif text-[#8B4513]">
                          ₹{linkedProduct.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAuthenticityModal(linkedProduct)}
                        className="flex-1 py-2 px-3 rounded-lg border border-[#D5C7B2] bg-white text-xs font-semibold text-[#4A3E31] hover:bg-[#F3ECE1] transition-colors cursor-pointer"
                      >
                        {t.clusterFeed.viewOrigin}
                      </button>

                      <button
                        onClick={() => handleBuyDirect(linkedProduct)}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#8B4513] hover:bg-[#72360E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>1-Click Buy Direct</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Snippet Selection Tabs */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6E5D4E]">
                Switch Verified Artisan Hub:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LIVE_SNIPPETS.map((snip) => (
                  <button
                    key={snip.id}
                    onClick={() => {
                      setActiveSnippet(snip);
                      setIsPlaying(true);
                    }}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      activeSnippet.id === snip.id
                        ? 'bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-sm'
                        : 'bg-white text-[#2A2118] border-[#DFCDB7] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${activeSnippet.id === snip.id ? 'bg-[#F3C68F]' : 'bg-green-600'}`} />
                    <div className="truncate">
                      <div className="font-semibold truncate">{snip.hub.split(' ')[0]}</div>
                      <div className="text-[10px] opacity-80 truncate">{snip.craftSpecialty.split(' ')[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Cooperatives Catalog Section */}
      <section id="catalog-section" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B4513] text-white">
                {t.common.sampleBadge}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B4513]">
                {products.length} Verified Andhra Crafts & Handlooms
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A2118] mt-1">
              Direct-to-Consumer Cooperative Crafts & Handlooms
            </h2>
            <p className="text-sm text-[#6E5D4E]">
              Only strictly authentic, non-mass-produced creations direct from verified Andhra hubs.
            </p>
          </div>

          {/* Search Box and Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#8B4513] absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search craft, toy, lace, brass..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#DFCDB7] bg-white text-xs text-[#2A2118] placeholder:text-[#9C8E7F] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-2 text-xs text-[#9C8E7F] hover:text-[#2A2118] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                'All',
                'Etikoppaka Toys',
                'Kondapalli Toys & Dolls',
                'Woodcraft & Cutlery',
                'Leather Art & Paintings',
                'Bell & Brass Metal',
                'Terracotta & Pot Art',
                'Stone Craft & Idols',
                'Palm Leaf & Lace',
                'Handloom & Textiles',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#8B4513] text-white shadow-xs'
                      : 'bg-white text-[#4A3E31] border border-[#DFCDB7] hover:bg-[#F3ECE1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-[#E2D5BE] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#E8DEC8]">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {prod.isSample ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B4513] text-white shadow-xs">
                        {t.common.sampleBadge}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2E7D32] text-white shadow-xs">
                        New Listing
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1B4D3E] text-white shadow-xs">
                      {prod.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/75 backdrop-blur-xs text-[#F3C68F]">
                      {prod.dispatchSLA}
                    </span>
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7A6B5C]">
                    <span className="font-semibold text-[#8B4513]">{prod.sku}</span>
                    <span>{prod.cluster.split(',')[0]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#2A2118] group-hover:text-[#8B4513] transition-colors line-clamp-1">
                    {prod.title}
                  </h3>

                  <p className="text-xs text-[#6E5D4E] line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-2 border-t border-[#F0E8DC] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#7A6B5C]">Cooperative Rate</div>
                      <div className="text-xl font-bold font-serif text-[#2A2118]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#1B4D3E] font-medium flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
                        <span>Verified Cluster</span>
                      </div>
                      <div className="text-xs font-semibold text-[#6E5D4E]">
                        {prod.hub.split(' ')[0]} Hub
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DEC8] flex items-center gap-2">
                <button
                  onClick={() => handleViewDetails(prod)}
                  className="flex-1 py-2 px-3 rounded-lg border border-[#D5C7B2] bg-white text-xs font-semibold text-[#4A3E31] hover:bg-[#F3ECE1] transition-colors cursor-pointer"
                >
                  Origin & Audit
                </button>
                <button
                  onClick={() => handleBuyDirect(prod)}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#8B4513] hover:bg-[#72360E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy Direct</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Stats Strip */}
      <StatsStrip />
    </div>
  );
};

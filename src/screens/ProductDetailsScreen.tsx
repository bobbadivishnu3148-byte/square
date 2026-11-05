import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Award,
  MapPin,
  Clock,
  Flame,
  CheckCircle2,
  DollarSign,
  ShoppingBag,
  QrCode,
  ChevronDown,
  Hammer,
} from 'lucide-react';
import { StatsStrip } from '../components/StatsStrip';

export const ProductDetailsScreen: React.FC = () => {
  const {
    products,
    selectedProduct,
    selectProduct,
    addToCart,
    navigateToScreen,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'audit' | 'pricing' | 'origin'>('audit');

  const {
    title,
    sku,
    hub,
    price,
    dispatchSLA,
    cluster,
    material,
    weightGrams,
    dimensions,
    description,
    priceBreakdown,
    authenticityProof,
    imageUrl,
  } = selectedProduct;

  const handleBuyNow = () => {
    addToCart(selectedProduct.id);
    navigateToScreen('cartSla');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top selector bar for quick switching between the 10 sample products */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B4513] text-white">
            {t.common.sampleBadge}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E5D4E]">
            Inspect Authenticity Audit for Craft / Pot Art:
          </span>
        </div>

        <div className="relative">
          <select
            value={selectedProduct.id}
            onChange={(e) => selectProduct(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white text-xs font-semibold text-[#2A2118] border border-[#DFCDB7] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#8B4513] cursor-pointer"
            aria-label="Select craft to inspect"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.sku} — {p.title} (₹{p.price.toLocaleString('en-IN')})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#7A6B5C] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Imagery & Physical Verification Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#DFCDB7] shadow-md aspect-4/5 sm:aspect-square lg:aspect-4/5">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Top Verification Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1B4D3E] text-white shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F3C68F]" />
                100% Cluster-Verified Craft
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white/90 backdrop-blur-xs text-[#2A2118] shadow-md">
                {sku}
              </span>
            </div>

            {/* Bottom SLA guarantee strip */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1B4D3E]/95 backdrop-blur-xs text-[#FDFBF7] p-3 rounded-xl border border-white/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F3C68F]" />
                <span className="font-semibold">{dispatchSLA}</span>
              </div>
              <span className="text-[#E2D8C7]">Direct Artisan Fulfillment</span>
            </div>
          </div>

          {/* Quick Specifications Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#DFCDB7] shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E5D4E]">
              Craft & Material Specifications
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                <div className="text-[#7A6B5C]">Weight / Specs</div>
                <div className="font-semibold text-[#2A2118] mt-0.5">
                  {weightGrams ? `${weightGrams}g Solid Craft` : 'Authentic Handcrafted'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                <div className="text-[#7A6B5C]">Dimensions</div>
                <div className="font-semibold text-[#2A2118] mt-0.5 line-clamp-1">
                  {dimensions || 'Handcrafted Dimensions'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8] col-span-2">
                <div className="text-[#7A6B5C]">Organic Raw Materials</div>
                <div className="font-semibold text-[#2A2118] mt-0.5">
                  {material}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Craft Details, Transparent Pricing, and Authenticity Audit */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B4513]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{cluster}</span>
              <span>•</span>
              <span>{hub}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2A2118]">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-[#5A4C3E] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Big Pricing & Main Action Block */}
          <div className="bg-[#FAF7F2] border-2 border-[#8B4513]/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-semibold text-[#6E5D4E] tracking-wider">
                  Direct Cooperative Hub Price
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2A2118]">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm line-through text-[#9C8E7F]">
                    ₹{priceBreakdown.retailShowroomEst.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-[#1B4D3E] bg-[#E2ECE7] px-2 py-0.5 rounded">
                    Save ₹{priceBreakdown.buyerSavings.toLocaleString('en-IN')} vs Retail
                  </span>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-[#DFCDB7] sm:pl-4">
                <span className="text-xs text-[#1B4D3E] font-bold block">
                  Cooperative Certified
                </span>
                <span className="text-xl font-bold font-serif text-[#1B4D3E]">
                  100% Authentic
                </span>
                <span className="text-[11px] text-[#6E5D4E] block">
                  Govt. GI Cluster Verified
                </span>
              </div>
            </div>

            {/* ONE BIG ACTION BUTTON */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white font-bold text-base sm:text-lg shadow-lg flex items-center justify-center gap-3 transition-all active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Purchasing a verified authentic handicraft directly from an artisan cooperative hub</span>
            </button>

            <div className="flex items-center justify-between text-xs text-[#6E5D4E] pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
                Zero plastic / resin knockoffs
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8B4513]" />
                48-hr cluster packaging capability
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B4D3E]" />
                Govt. GI Protected
              </span>
            </div>
          </div>

          {/* Tab Navigation for Detailed Proofs */}
          <div className="space-y-4">
            <div className="flex border-b border-[#DFCDB7] text-sm font-semibold">
              <button
                onClick={() => setActiveTab('audit')}
                className={`pb-3 px-4 transition-colors relative flex items-center gap-2 cursor-pointer ${
                  activeTab === 'audit'
                    ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                    : 'text-[#6E5D4E] hover:text-[#2A2118]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>100% Authenticity Audit Proof</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`pb-3 px-4 transition-colors relative flex items-center gap-2 cursor-pointer ${
                  activeTab === 'pricing'
                    ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                    : 'text-[#6E5D4E] hover:text-[#2A2118]'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Transparent Price Breakdown</span>
              </button>

              <button
                onClick={() => setActiveTab('origin')}
                className={`pb-3 px-4 transition-colors relative flex items-center gap-2 cursor-pointer ${
                  activeTab === 'origin'
                    ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                    : 'text-[#6E5D4E] hover:text-[#2A2118]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Workshop SLA & Packaging</span>
              </button>
            </div>

            {/* TAB 1: Authenticity Audit Proof */}
            {activeTab === 'audit' && (
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DFCDB7] space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8B4513]" />
                    <h3 className="font-serif font-bold text-lg text-[#2A2118]">
                      Physical Verification Certificate
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#E2ECE7] text-[#1B4D3E] px-2.5 py-1 rounded">
                    {authenticityProof.giCertificateNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                    <span className="font-semibold text-[#6E5D4E] uppercase tracking-wider block">
                      Certified Master Artisan / Sculptor
                    </span>
                    <span className="font-bold text-[#2A2118] text-sm mt-0.5 block">
                      {authenticityProof.artisanMasterName}
                    </span>
                    <span className="text-[#7A6B5C] mt-0.5 block">
                      Society Reg: {authenticityProof.cooperativeRegNo}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                    <span className="font-semibold text-[#6E5D4E] uppercase tracking-wider block">
                      Physical Workshop Coordinates
                    </span>
                    <span className="font-mono font-bold text-[#8B4513] text-sm mt-0.5 block">
                      {authenticityProof.geoCoordinates}
                    </span>
                    <span className="text-[#7A6B5C] mt-0.5 block">
                      {authenticityProof.clusterLocation}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] sm:col-span-2">
                    <div className="flex items-center gap-1.5 font-semibold text-[#8B4513] uppercase tracking-wider mb-1">
                      <Flame className="w-4 h-4 text-[#C05621]" />
                      <span>Physical Lab Material Assay & Safety Verification</span>
                    </div>
                    <p className="text-[#2A2118] leading-relaxed">
                      {authenticityProof.labTestReport}
                    </p>
                    <div className="mt-2 text-[#6E5D4E]">
                      Craft Method: <span className="font-medium text-[#2A2118]">{authenticityProof.craftMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#6E5D4E]">Quality Inspection Officer: </span>
                    <span className="font-bold text-[#2A2118]">{authenticityProof.inspectorName}</span>
                    <span className="text-[#8B4513] ml-2">({authenticityProof.verificationAuditDate})</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[#1B4D3E] font-bold bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E8DEC8]">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{authenticityProof.qrHash}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Transparent Price Breakdown */}
            {activeTab === 'pricing' && (
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DFCDB7] space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2A2118]">
                    Where Does Your Money Go?
                  </h3>
                  <p className="text-xs text-[#6E5D4E]">
                    Conscious commerce means complete transparency. We eliminate layers of exploitative middleman markups.
                  </p>
                </div>

                {/* Progress bar visual */}
                <div className="space-y-2">
                  <div className="h-4 w-full rounded-full overflow-hidden flex bg-[#E8DEC8]">
                    <div
                      style={{ width: `${priceBreakdown.artisanPercentage}%` }}
                      className="bg-[#1B4D3E] h-full"
                      title="Master Handcrafting & Materials"
                    />
                    <div
                      style={{ width: `${priceBreakdown.hubPercentage}%` }}
                      className="bg-[#8B4513] h-full"
                      title="Cooperative Hub QA & Packing"
                    />
                    <div
                      style={{ width: `${priceBreakdown.platformPercentage}%` }}
                      className="bg-[#D97706] h-full"
                      title="Artisan Haven Platform"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#6E5D4E]">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D3E]" />
                      Craft Guild ({priceBreakdown.artisanPercentage}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B4513]" />
                      Co-op Hub ({priceBreakdown.hubPercentage}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                      Platform (12–14%)
                    </span>
                  </div>
                </div>

                {/* Breakdown cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#E2ECE7] border border-[#C5DDD2]">
                    <div className="font-semibold text-[#1B4D3E] uppercase tracking-wider">
                      Master Crafting & Material
                    </div>
                    <div className="text-xl font-bold font-serif text-[#1B4D3E] mt-1">
                      ₹{priceBreakdown.artisanShare.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[#3F6354] mt-0.5">
                      Natural seasoned Ankudu wood, organic clay, vegetable dyes and artisan labor.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8F1EB] border border-[#E9D6C7]">
                    <div className="font-semibold text-[#8B4513] uppercase tracking-wider">
                      Hub QA & Packing
                    </div>
                    <div className="text-xl font-bold font-serif text-[#8B4513] mt-1">
                      ₹{priceBreakdown.hubShare.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[#7A5A43] mt-0.5">
                      Cooperative workshop inspection, lead assays & eco-cushioned cartons.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF9EE] border border-[#F5E2BE]">
                    <div className="font-semibold text-[#B45309] uppercase tracking-wider">
                      Platform & Logistics
                    </div>
                    <div className="text-xl font-bold font-serif text-[#B45309] mt-1">
                      ₹{priceBreakdown.platformShare.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[#8D5B18] mt-0.5">
                      Fair marketplace fee covering transit insurance & cluster logistics.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#DFCDB7] flex items-center justify-between text-xs">
                  <span className="text-[#6E5D4E]">
                    In city retail gift boutiques, identical handmade crafts carry <strong className="text-[#C53030]">200%–300% markups</strong> without cluster verification.
                  </span>
                  <span className="font-bold text-[#1B4D3E] text-sm shrink-0 ml-2">
                    Verified Direct Pricing
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: 48-Hour Hub SLA & Journey */}
            {activeTab === 'origin' && (
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DFCDB7] space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[#2A2118]">
                    48-Hour Cooperative Fulfillment Capability
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E2ECE7] text-[#1B4D3E]">
                    Active Dispatch SLA: &lt;36 hrs
                  </span>
                </div>

                <div className="relative pl-6 space-y-4 border-l-2 border-[#DFCDB7] text-xs">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1B4D3E] border-2 border-white shadow-xs" />
                    <div className="font-bold text-[#2A2118] text-sm">
                      Stage 1: Workshop Finishing & Society Logging
                    </div>
                    <p className="text-[#6E5D4E] mt-0.5">
                      Master artisan finishes lathe turning or pot firing. Society President logs serial #{sku} into cooperative ledger.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1B4D3E] border-2 border-white shadow-xs" />
                    <div className="font-bold text-[#2A2118] text-sm">
                      Stage 2: Hub Quality & Material Assay (&lt;12 hrs)
                    </div>
                    <p className="text-[#6E5D4E] mt-0.5">
                      Physical inspection confirms lead-free lacquer, authentic timber or alluvial clay. Tamper-evident GI tag attached.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#8B4513] border-2 border-white shadow-xs" />
                    <div className="font-bold text-[#2A2118] text-sm">
                      Stage 3: Visakhapatnam Regional Packaging Hub (&lt;24 hrs)
                    </div>
                    <p className="text-[#6E5D4E] mt-0.5">
                      Craft packaged in drop-tested shockproof eco-cushioning for safe ceramics & wood transport.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#D97706] border-2 border-white shadow-xs" />
                    <div className="font-bold text-[#2A2118] text-sm">
                      Stage 4: Doorstep Delivery to Conscious Buyer (&lt;48 hrs)
                    </div>
                    <p className="text-[#6E5D4E] mt-0.5">
                      Express air transit to Tier 1/2 cities with live tracking and artisan thank-you card.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Stats Strip */}
      <StatsStrip />
    </div>
  );
};

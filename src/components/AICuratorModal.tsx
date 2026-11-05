import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AICurationResult } from '../types';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Clock,
  MapPin,
  Quote,
} from 'lucide-react';

const SUGGESTED_QUERIES = [
  'Eco-friendly non-toxic wooden lacquerware elephant for traditional gifting.',
  'Hand-etched terracotta relief pot art for natural cooling and temple mural decor.',
  'Lightweight breathable Uppada Jamdani silk saree for a coastal morning celebration.',
  'Kondapalli handcrafted wooden figurines for festival Bommala Koluvu display.',
];

export const AICuratorModal: React.FC = () => {
  const { isCuratorOpen, setIsCuratorOpen, addToCart, navigateToScreen, products, selectProduct, openAuthenticityModal } = useApp();

  const [query, setQuery] = useState(
    'Eco-friendly non-toxic wooden lacquerware elephant for traditional gifting.'
  );
  const [occasion, setOccasion] = useState('Traditional gifting / heritage celebration');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AICurationResult | null>(null);

  if (!isCuratorOpen) return null;

  const handleCurate = async (textToCurate?: string) => {
    const activeQuery = textToCurate || query;
    if (!activeQuery.trim()) {
      setError('Please describe your desired authentic craft, toy, pot art, or handloom preference.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/curate-craft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: activeQuery.trim(),
          occasion: occasion.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error('Could not retrieve craft curation. Please try again.');
      }
    } catch (err: any) {
      console.error('Curator fetch error:', err);
      setError(err.message || 'Failed to connect to the cooperative curation engine. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplySuggestion = (text: string) => {
    setQuery(text);
    handleCurate(text);
  };

  const handleBuyCurated = () => {
    if (!result) return;
    let prodId = result.matchedCatalogId;
    if (!prodId || !products.find((p) => p.id === prodId)) {
      const matched = products.find(
        (p) =>
          p.title.toLowerCase().includes(result.craftType.toLowerCase()) ||
          p.hub.toLowerCase().includes(result.hubName.toLowerCase())
      );
      prodId = matched ? matched.id : 'etikoppaka-204';
    }

    addToCart(prodId);
    selectProduct(prodId);
    setIsCuratorOpen(false);
    navigateToScreen('cartSla');
  };

  const handleViewDetails = () => {
    if (!result) return;
    let prodId = result.matchedCatalogId;
    const found = products.find((p) => p.id === prodId);
    if (found) {
      selectProduct(found.id);
      openAuthenticityModal(found);
      setIsCuratorOpen(false);
    } else {
      selectProduct('etikoppaka-204');
      navigateToScreen('productDetails');
      setIsCuratorOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-[#FDFBF7] border border-[#D5C7B2] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#1B4D3E] text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2A6E59] flex items-center justify-center shrink-0 border border-white/20">
              <Sparkles className="w-6 h-6 text-[#F3C68F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#F3C68F]">
                  Gemini-Powered Artisan Specialist
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-medium">
                  Verified Andhra Cooperatives
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                AI Craft & Handloom Curator
              </h2>
              <p className="text-xs sm:text-sm text-[#E2D8C7] line-clamp-1">
                Translating natural buyer intent into verified, place-special wooden toys, pot art & pure handloom sarees.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCuratorOpen(false)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close AI Curator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Query input card */}
          <div className="bg-white border border-[#E8DEC8] rounded-xl p-4 shadow-xs space-y-3">
            <label htmlFor="curator-query" className="block text-xs font-semibold uppercase tracking-wider text-[#6E5D4E]">
              Describe your desired handmade craft, toy, pot art, or handloom preference:
            </label>
            <div className="relative">
              <textarea
                id="curator-query"
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Eco-friendly non-toxic wooden lacquerware elephant for traditional gifting."
                className="w-full text-base p-3.5 rounded-lg border border-[#D5C7B2] bg-[#FAF8F5] text-[#2A2118] placeholder-[#9C8E7F] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* Quick suggested chips */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#7A6B5C] mb-2 font-medium">
                <HelpCircle className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Try an authentic query:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySuggestion(item)}
                    disabled={loading}
                    className="text-xs text-left px-2.5 py-1.5 rounded-md bg-[#F4EFE6] hover:bg-[#EAE1D2] text-[#4A3E31] border border-[#DFCDB7] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    "{item}"
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#7A6B5C]">
                Matched against certified Andhra artisan clusters (Etikoppaka, Lepakshi, Uppada, Kondapalli...)
              </span>
              <button
                type="button"
                onClick={() => handleCurate()}
                disabled={loading || !query.trim()}
                className="px-5 py-2.5 rounded-lg bg-[#8B4513] hover:bg-[#72360E] disabled:bg-[#BCA997] text-white text-sm font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Matching Creation...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Curate Verified Match</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8 text-center bg-[#FAF8F5] border border-[#E8DEC8] rounded-xl space-y-3">
              <Loader2 className="w-8 h-8 text-[#8B4513] animate-spin mx-auto" />
              <div className="text-base font-serif font-bold text-[#2A2118]">
                Consulting Andhra Artisan & Weavers Cooperatives...
              </div>
              <p className="text-xs text-[#6E5D4E] max-w-md mx-auto">
                Auditing non-toxic botanical lacquers, porous alluvial terracotta clay, pit-loom zari density, and physical GI registers.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-5 bg-[#FDF2F2] border border-[#F8B4B4] rounded-xl flex items-start gap-3 text-[#9B1C1C]">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <div className="text-sm font-semibold">Curation Notice</div>
                <p className="text-xs leading-relaxed">{error}</p>
                <button
                  onClick={() => handleCurate()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#9B1C1C] text-white text-xs font-semibold hover:bg-[#771D1D] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try again</span>
                </button>
              </div>
            </div>
          )}

          {/* Structured JSON Result Layout */}
          {result && !loading && (
            <div className="bg-[#FAF8F5] border-2 border-[#1B4D3E]/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Formatted Shape Headline */}
              <div className="bg-[#1B4D3E]/10 border border-[#1B4D3E]/30 rounded-xl p-4">
                <div className="text-xs font-semibold text-[#1B4D3E] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Curation Result
                </div>
                <div className="text-base sm:text-lg font-serif font-bold text-[#1B4D3E] leading-snug">
                  "{result.formattedSummary}"
                </div>
              </div>

              {/* Product specifications & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider">
                    Recommended Item & Hub
                  </div>
                  <div className="text-lg font-serif font-bold text-[#2A2118]">
                    {result.recommendationTitle}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8B4513] font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{result.hubName}</span>
                  </div>
                  <div className="text-xs text-[#6E5D4E]">
                    Origin: {result.clusterOrigin}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8DEC8] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider">
                      Cooperative Direct Fair Price
                    </div>
                    <div className="text-2xl font-bold font-serif text-[#2A2118] mt-0.5">
                      ₹{result.estimatedPrice?.toLocaleString('en-IN') || '850'}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-[#1B4D3E] flex items-center gap-1.5 mt-2 bg-[#E7F3EE] px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Hub SLA: {result.dispatchSLA} guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Match Reason Breakdown */}
              <div className="p-4 bg-white rounded-xl border border-[#E8DEC8] space-y-2">
                <div className="text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider">
                  Why This Matches Your Requirement
                </div>
                <p className="text-sm text-[#2A2118] leading-relaxed">
                  {result.matchReason}
                </p>
              </div>

              {/* Physical Audit Proof Highlight */}
              <div className="p-4 bg-[#F2EDE2] rounded-xl border border-[#DFCDB7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8B4513] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                  <span>Physical Cluster Verification Audit</span>
                </div>
                <p className="text-xs text-[#3E3227] leading-relaxed">
                  {result.authenticityAuditHighlight}
                </p>
                <div className="text-[11px] font-mono text-[#1B4D3E] font-semibold">
                  Official GI Registry Status: {result.giTagProof}
                </div>
              </div>

              {/* Key Attributes Tags */}
              {result.keyHighlights && result.keyHighlights.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider mb-2">
                    Verified Craft Attributes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.keyHighlights.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white text-[#2A2118] border border-[#D5C7B2] px-3 py-1 rounded-full font-medium"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Artisan quote if available */}
              {result.artisanQuote && (
                <div className="p-3 bg-white/70 rounded-lg border-l-4 border-[#8B4513] text-xs italic text-[#5C4D3E] flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>"{result.artisanQuote}"</span>
                </div>
              )}

              {/* Primary Call to Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={handleViewDetails}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#D5C7B2] bg-white text-[#4A3E31] text-sm font-semibold hover:bg-[#F3ECE1] transition-colors cursor-pointer"
                >
                  View Workshop & Lab Proof
                </button>
                <button
                  type="button"
                  onClick={handleBuyCurated}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#8B4513] hover:bg-[#72360E] text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Direct from Cooperative Hub</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

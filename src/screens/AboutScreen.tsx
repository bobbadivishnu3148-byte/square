import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  MapPin,
  Target,
  DollarSign,
  ShieldCheck,
  Award,
  ExternalLink,
  ShoppingBag,
  AlertTriangle,
} from 'lucide-react';
import { StatsStrip } from '../components/StatsStrip';

export const AboutScreen: React.FC = () => {
  const { navigateToScreen, t } = useApp();

  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Hero Intro */}
      <section className="bg-white border border-[#DFCDB7] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/10 border border-[#1B4D3E]/20 text-xs font-bold text-[#1B4D3E]">
          <ShieldCheck className="w-4 h-4" />
          <span>The Square • Visakhapatnam, Andhra Pradesh</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A2118]">
          Artisan Haven
        </h1>

        <div className="p-5 bg-[#FAF7F2] rounded-2xl border-l-4 border-[#8B4513] space-y-2">
          <div className="text-xs uppercase font-bold tracking-wider text-[#8B4513]">
            {t.about.pitchTitle}
          </div>
          <p className="text-base sm:text-lg text-[#2A2118] font-medium leading-relaxed">
            "{t.about.pitchText}"
          </p>
        </div>

        {/* ONE BIG ACTION BUTTON ON ABOUT SCREEN */}
        <div className="pt-2">
          <button
            onClick={() => navigateToScreen('clusterFeed')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white font-bold text-base shadow-lg flex items-center justify-center gap-3 transition-all active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Purchasing a verified authentic handicraft directly from an artisan cooperative hub</span>
          </button>
        </div>
      </section>

      {/* The Problem & Our Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem */}
        <div className="bg-[#FAF7F2] border-2 border-[#E2D5BE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#C53030]/10 text-[#C53030] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#2A2118]">
            {t.about.problemTitle}
          </h2>
          <p className="text-sm text-[#4A3E31] leading-relaxed">
            {t.about.problemText}
          </p>
          <div className="text-xs text-[#7A6B5C] bg-white p-3.5 rounded-xl border border-[#DFCDB7]">
            <strong>The Exploitation Cycle:</strong> A rural woodturner or potter spends days curing Ankudu wood or terracotta clay, earning only ₹150–₹250 from middlemen, while city decor stores resell it for ₹850 to ₹1,800.
          </div>
        </div>

        {/* Solution */}
        <div className="bg-[#FAF7F2] border-2 border-[#C5DDD2] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#1B4D3E]/10 text-[#1B4D3E] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#2A2118]">
            {t.about.solutionTitle}
          </h2>
          <p className="text-sm text-[#4A3E31] leading-relaxed">
            {t.about.solutionText}
          </p>
          <div className="text-xs text-[#1B4D3E] bg-[#E2ECE7] p-3.5 rounded-xl border border-[#C5DDD2]">
            <strong>Cluster-Verified Direct Payout:</strong> By performing physical workshop verification and directly crediting cooperative accounts, we raise artisan earnings by 60% while guaranteeing 100% genuine lead-free heritage art.
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white border border-[#DFCDB7] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B4513]/10 text-[#8B4513] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B4513]">
              Competitive Advantage
            </span>
            <h2 className="text-xl font-serif font-bold text-[#2A2118]">
              {t.about.differentiatorTitle}
            </h2>
          </div>
        </div>

        <p className="text-base text-[#2A2118] font-medium leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8]">
          "{t.about.differentiatorText}"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1.5">
            <div className="font-bold text-[#2A2118] text-sm">Physical Workshop Audit</div>
            <p className="text-[#6E5D4E]">
              Every batch undergoes material assay (lead-free certification, Ankudu wood verification, organic clay purity).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1.5">
            <div className="font-bold text-[#2A2118] text-sm">48-Hr Hub Fulfillment</div>
            <p className="text-[#6E5D4E]">
              Direct cooperative dispatch window (&lt;36 hrs) routed through the Visakhapatnam regional handicrafts terminal.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1.5">
            <div className="font-bold text-[#2A2118] text-sm">AI Craft & Pot Curator</div>
            <p className="text-[#6E5D4E]">
              Gemini translates buyer intent (e.g. non-toxic infant toys, natural cooling pot art) into authentic place-special matches.
            </p>
          </div>
        </div>
      </section>

      {/* Facts That Matter: 3 Stat Cards with Citations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-[#2A2118]">
            Key Facts & Research Sources
          </h2>
          <span className="text-xs text-[#735A45]">Publicly Audited Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-[#DFCDB7] rounded-2xl p-5 space-y-3">
            <span className="text-2xl font-serif font-bold text-[#9B1C1C]">70% Counterfeits</span>
            <p className="text-xs text-[#4A3E31] leading-relaxed">
              70% of products sold as "authentic traditional crafts" in India (worth ₹28,000–₹35,000 Cr) are machine resin molds or industrial plastic replicas.
            </p>
            <a
              href="https://www.savehandloom.org/fake-handloom-in-india-the-state-by-state-map-of-a-national-scam/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[#8B4513] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>SaveHandloom & Crafts Report</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white border border-[#DFCDB7] rounded-2xl p-5 space-y-3">
            <span className="text-2xl font-serif font-bold text-[#8B4513]">65% Profits Captured</span>
            <p className="text-xs text-[#4A3E31] leading-relaxed">
              Middlemen capture up to 65% of profits, marking up a ₹250 artisan craft or pot to ₹850–₹1,200 in retail boutiques.
            </p>
            <a
              href="https://www.researchgate.net/publication/404772125_FROM_TRADITION_TO_MARKET_ACCESSING_THE_AUTHENTICITY_OF_SHANTIPUR_HANDLOOM_PRODUCTS"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[#8B4513] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>ResearchGate Craft Authenticity Study</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white border border-[#DFCDB7] rounded-2xl p-5 space-y-3">
            <span className="text-2xl font-serif font-bold text-[#1B4D3E]">&lt; ₹5,000 / mo</span>
            <p className="text-xs text-[#4A3E31] leading-relaxed">
              Over 68.5% of rural handicraft and pottery households earn under ₹5,000 per month due to market exploitation.
            </p>
            <a
              href="https://handlooms.nic.in/assets/img/Statistics/2486.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[#1B4D3E] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Ministry of Textiles Artisan Census</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Team, Place, Users & Business Model */}
      <section className="bg-white border border-[#DFCDB7] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-xl font-serif font-bold text-[#2A2118]">
          Project Identity & Business Model
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1">
            <div className="flex items-center gap-1.5 text-[#8B4513] font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Team</span>
            </div>
            <div className="text-sm font-bold text-[#2A2118]">{t.about.teamName}</div>
            <p className="text-[#6E5D4E]">Product Engineers & Heritage Preservationists</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1B4D3E] font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location</span>
            </div>
            <div className="text-sm font-bold text-[#2A2118]">{t.about.location}</div>
            <p className="text-[#6E5D4E]">Cooperative Hub & Logistics Center</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1">
            <div className="flex items-center gap-1.5 text-[#8B4513] font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>Target Users</span>
            </div>
            <div className="text-sm font-bold text-[#2A2118]">Conscious Buyers (25–45)</div>
            <p className="text-[#6E5D4E]">{t.about.targetAudience}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFCDB7] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1B4D3E] font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Who Pays Later</span>
            </div>
            <div className="text-sm font-bold text-[#2A2118]">15% Marketplace Fee</div>
            <p className="text-[#6E5D4E]">{t.about.businessModel}</p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <StatsStrip />
    </div>
  );
};

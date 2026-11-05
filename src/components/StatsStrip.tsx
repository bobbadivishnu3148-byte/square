import React from 'react';
import { useApp } from '../context/AppContext';
import { APP_STATS } from '../data/sampleData';
import { TrendingUp, Clock, HeartHandshake, CheckCircle2, Trash2 } from 'lucide-react';

interface StatsStripProps {
  showClearDataButton?: boolean;
  className?: string;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ showClearDataButton = true, className = '' }) => {
  const { t, clearMyData } = useApp();

  const handleClear = () => {
    if (window.confirm(t.common.clearDataConfirm || 'Are you sure you want to clear your saved cart and demo order data?')) {
      clearMyData();
    }
  };

  return (
    <div className={`bg-[#F4EFE6] border border-[#E2D6C0] rounded-xl p-4 sm:p-5 shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Metric 1: Weekly GMV */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#8B4513]/10 text-[#8B4513] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#6E5D4E]">
              {t.stats.gmvTitle}
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#2A2118]">
              ₹{APP_STATS.weeklyGMV.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#1B4D3E] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Direct Cooperative Volume
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#D8CBBA]" />

        {/* Metric 2: Fulfilled SLA */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#1B4D3E]/10 text-[#1B4D3E] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#6E5D4E]">
              {t.stats.slaTitle}
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#2A2118]">
              {APP_STATS.fulfilledSLA}%
            </div>
            <div className="text-[11px] text-[#6E5D4E]">
              Avg. Dispatch &lt;28 hours from cluster
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#D8CBBA]" />

        {/* Metric 3: Artisan Payout Boost */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#A0522D]/10 text-[#8B4513] flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#6E5D4E]">
              {t.stats.payoutTitle}
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#1B4D3E]">
              +{APP_STATS.artisanPayoutBoost}%
            </div>
            <div className="text-[11px] text-[#6E5D4E]">
              78–80% vs 25% in wholesale retail
            </div>
          </div>
        </div>

        {/* Optional Clear My Data Button */}
        {showClearDataButton && (
          <div className="pt-2 md:pt-0 md:border-l md:border-[#D8CBBA] md:pl-4 flex items-center justify-end">
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#735A45] hover:text-[#8B4513] hover:bg-[#EAE1D2] rounded-md transition-colors border border-transparent hover:border-[#D8CBBA]"
              title="Reset sample cart and checkout entries"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.common.clearData}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

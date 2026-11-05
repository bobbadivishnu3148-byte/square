import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Award, FileText, Flame, X, CheckCircle2, QrCode, ShoppingBag, Hammer } from 'lucide-react';

export const AuthenticityModal: React.FC = () => {
  const {
    authenticityModalProduct,
    closeAuthenticityModal,
    addToCart,
    navigateToScreen,
  } = useApp();

  if (!authenticityModalProduct) return null;

  const { title, sku, hub, price, dispatchSLA, authenticityProof } = authenticityModalProduct;

  const handleBuy = () => {
    addToCart(authenticityModalProduct.id);
    closeAuthenticityModal();
    navigateToScreen('cartSla');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FDFBF7] border border-[#D5C7B2] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#1B4D3E] text-[#FDFBF7] p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#2A6E59] flex items-center justify-center shrink-0 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-[#F3C68F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#F3C68F]">
                  Physical Cluster Verification Proof
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 font-mono">
                  100% AUDITED
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-white mt-0.5">
                {title}
              </h2>
              <p className="text-xs text-[#E1D7C6]">
                {hub} • {sku}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthenticityModal}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Certificate Badge Banner */}
          <div className="bg-[#F4EFE6] border border-[#DFCDB7] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#8B4513] shrink-0" />
              <div>
                <div className="text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider">
                  Official Geographical Indication (GI) Certificate
                </div>
                <div className="font-mono font-bold text-base text-[#2A2118]">
                  {authenticityProof.giCertificateNumber}
                </div>
              </div>
            </div>
            <div className="text-xs font-medium text-[#1B4D3E] bg-[#E2ECE7] px-2.5 py-1 rounded-md border border-[#C5DDD2] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
              Verified by AP Handicrafts Board
            </div>
          </div>

          {/* Grid Audit Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-white rounded-lg border border-[#E8DEC8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
                Cluster Location & GPS Coordinates
              </div>
              <div className="text-sm font-medium text-[#2A2118]">
                {authenticityProof.clusterLocation}
              </div>
              <div className="text-xs font-mono text-[#8B4513] mt-0.5">
                {authenticityProof.geoCoordinates}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-[#E8DEC8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider mb-1">
                <FileText className="w-3.5 h-3.5 text-[#1B4D3E]" />
                Master Artisan & Society Registry
              </div>
              <div className="text-sm font-medium text-[#2A2118]">
                {authenticityProof.artisanMasterName}
              </div>
              <div className="text-xs text-[#6E5D4E] mt-0.5">
                Registry: <span className="font-mono">{authenticityProof.cooperativeRegNo}</span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-[#E8DEC8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider mb-1">
                <Hammer className="w-3.5 h-3.5 text-[#8B4513]" />
                Handcraft Method & Materials
              </div>
              <div className="text-sm font-medium text-[#2A2118]">
                {authenticityProof.craftMethod}
              </div>
              <div className="text-xs text-[#6E5D4E] mt-0.5">
                {authenticityProof.materialPurity}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-[#E8DEC8]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5D4E] uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 text-[#C05621]" />
                Physical Lab Safety & Purity Assay
              </div>
              <div className="text-xs text-[#2A2118] leading-relaxed">
                {authenticityProof.labTestReport}
              </div>
            </div>
          </div>

          {/* Hub Verification Sign-Off */}
          <div className="p-4 bg-[#F8F5EE] border border-[#E8DEC8] rounded-xl flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs text-[#6E5D4E]">Physical Quality Inspection Officer:</div>
              <div className="text-sm font-bold text-[#2A2118]">{authenticityProof.inspectorName}</div>
              <div className="text-xs text-[#8B4513]">Audited on: {authenticityProof.verificationAuditDate}</div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#D5C7B2]">
              <QrCode className="w-5 h-5 text-[#2A2118]" />
              <div className="text-right">
                <div className="text-[10px] text-[#6E5D4E] uppercase">Audit QR Hash</div>
                <div className="font-mono text-xs font-bold text-[#1B4D3E]">{authenticityProof.qrHash}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with One Big Action Button */}
        <div className="p-4 sm:p-5 bg-[#F4EFE6] border-t border-[#D5C7B2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs text-[#6E5D4E]">Cooperative Direct Price:</span>
            <div className="text-2xl font-bold font-serif text-[#2A2118]">
              ₹{price.toLocaleString('en-IN')}
              <span className="text-xs font-sans font-normal text-[#1B4D3E] ml-2">
                ({dispatchSLA})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={closeAuthenticityModal}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium text-[#4A3E31] hover:bg-[#E8DEC8] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleBuy}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#8B4513] hover:bg-[#72360E] text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Purchasing a verified authentic handicraft directly from an artisan cooperative hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

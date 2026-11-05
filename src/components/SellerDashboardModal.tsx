import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Building,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Award,
  Upload,
} from 'lucide-react';
import { Product } from '../types';

export const SellerDashboardModal: React.FC = () => {
  const {
    isSellerDashboardOpen,
    setIsSellerDashboardOpen,
    currentUser,
    addNewSellerProduct,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'addCraft'>('profile');

  // New Craft Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Product['category']>('Etikoppaka Toys');
  const [price, setPrice] = useState(1150);
  const [cluster, setCluster] = useState(currentUser?.clusterLocation || 'Etikoppaka, Visakhapatnam District');
  const [material, setMaterial] = useState('Seasoned Ankudu Softwood with Natural Tree Lacquer');
  const [craftMethod, setCraftMethod] = useState('Manual Wood Lathe Turning & Friction Polish');
  const [dispatchSLA, setDispatchSLA] = useState('Dispatch < 24 hrs');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80');
  const [description, setDescription] = useState('');

  if (!isSellerDashboardOpen) return null;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newProd: Product = {
      id: `craft-${Date.now().toString().slice(-4)}`,
      hub: currentUser?.societyName || 'Registered Andhra Artisan Cooperative',
      sku: `Artisan Craft #${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim() || 'Handmade Heritage Artifact',
      category,
      price: Number(price) || 950,
      status: 'Verified',
      dispatchSLA,
      dispatchHoursMax: 24,
      imageUrl,
      cluster,
      material: material.trim() || 'Natural Andhra Regional Raw Materials',
      description: description.trim() || 'Authentic handmade place-special craft produced directly by registered master artisans.',
      priceBreakdown: {
        artisanShare: Math.round(Number(price) * 0.78),
        artisanPercentage: 78,
        hubShare: Math.round(Number(price) * 0.08),
        hubPercentage: 8,
        platformShare: Math.round(Number(price) * 0.14),
        platformPercentage: 14,
        retailShowroomEst: Math.round(Number(price) * 2.2),
        buyerSavings: Math.round(Number(price) * 1.2),
      },
      authenticityProof: {
        giCertificateNumber: `GI/AP/HA/REG-${Math.floor(1000 + Math.random() * 9000)}`,
        clusterLocation: cluster,
        geoCoordinates: '17.5147° N, 82.7562° E',
        artisanMasterName: currentUser?.fullName || 'Master Artisan Guild Member',
        cooperativeRegNo: currentUser?.cooperativeRegNo || 'AP-COOP-VERIFIED-2026',
        craftMethod,
        materialPurity: material,
        dyeOrFinishType: 'Certified Organic Dyes & Natural Non-Toxic Wash',
        labTestReport: 'Certified Pure Handmade: 0% machine resin, 100% natural earth/wood.',
        verificationAuditDate: 'Just Now (Society Certified)',
        inspectorName: 'Quality Inspection Cell (Visakhapatnam Hub)',
        qrHash: `AH-SELLER-${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
      },
      isSample: false,
    };

    addNewSellerProduct(newProd);
    setIsSellerDashboardOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-[#FDFBF7] border border-[#D5C7B2] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#8B4513] text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#A0522D] flex items-center justify-center shrink-0 border border-white/20">
              <Building className="w-6 h-6 text-[#F3C68F]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#F3C68F]">
                Artisan Cooperative Hub Portal
              </div>
              <h2 className="text-xl font-serif font-bold text-white mt-0.5">
                {currentUser?.societyName || 'Artisan Seller Hub'}
              </h2>
              <p className="text-xs text-[#E8DCCF]">
                Registry: <span className="font-mono">{currentUser?.cooperativeRegNo || 'AP-COOP-ACTIVE'}</span> • {currentUser?.clusterLocation || 'Andhra Pradesh'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSellerDashboardOpen(false)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#DFCDB7] bg-[#FAF7F2] px-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#7A6B5C] hover:text-[#2A2118]'
            }`}
          >
            Cooperative Status & SLA
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('addCraft')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'addCraft'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#7A6B5C] hover:text-[#2A2118]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Handmade Craft / Saree</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {activeTab === 'profile' ? (
            <div className="space-y-5 text-xs">
              {/* Society Badge Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#DFCDB7] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8B4513]" />
                    <span className="font-bold text-sm text-[#2A2118]">
                      Cooperative Verification Credentials
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#E2ECE7] text-[#1B4D3E]">
                    ✓ AUDIT CLEARED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                    <div className="text-[#6E5D4E]">Representative</div>
                    <div className="font-bold text-[#2A2118] text-sm mt-0.5">
                      {currentUser?.fullName || 'Master Artisan'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                    <div className="text-[#6E5D4E]">Co-op Society Reg</div>
                    <div className="font-mono font-bold text-[#8B4513] text-sm mt-0.5">
                      {currentUser?.cooperativeRegNo || 'AP-VZG-CRAFT-108'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8] col-span-2">
                    <div className="text-[#6E5D4E]">Cluster Workshop & Regional Hub</div>
                    <div className="font-semibold text-[#2A2118] mt-0.5">
                      {currentUser?.clusterLocation || 'Varaha River Basin, Visakhapatnam'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooperative Hub SLA capability */}
              <div className="p-4 rounded-2xl bg-[#E2ECE7] border border-[#C5DDD2] space-y-2">
                <div className="flex items-center gap-2 text-[#1B4D3E] font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>48-Hour Direct Hub Fulfillment Active</span>
                </div>
                <p className="text-[#3F6354] leading-relaxed">
                  Your registered cooperative is connected to the Visakhapatnam regional handloom and craft terminal. When buyers place an order, your workshop receives instant SMS & society ledger notifications for &lt;36 hr packaging.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('addCraft')}
                  className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Verified Craft to Feed</span>
                </button>
              </div>
            </div>
          ) : (
            /* Add Craft Form */
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#6E5D4E] font-semibold mb-1">
                  Craft / Handloom Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Traditional Hand-Turned Ankudu Lacquer Bird"
                  className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none cursor-pointer"
                  >
                    <option value="Etikoppaka Toys">Etikoppaka Toys</option>
                    <option value="Kondapalli Toys & Dolls">Kondapalli Toys & Dolls</option>
                    <option value="Woodcraft & Cutlery">Woodcraft & Cutlery</option>
                    <option value="Leather Art & Paintings">Leather Art & Paintings (Tholu Bommalu)</option>
                    <option value="Bell & Brass Metal">Bell & Brass Metal (Budithi / Pembarthi)</option>
                    <option value="Terracotta & Pot Art">Terracotta & Pot Art (Lepakshi / Palamaner)</option>
                    <option value="Stone Craft & Idols">Stone Craft & Idols (Durgi / Kalahasthi)</option>
                    <option value="Palm Leaf & Lace">Palm Leaf & Lace (Madanapalle / Narsapur)</option>
                    <option value="Handloom & Textiles">Handloom & Textiles (Ponduru Khadi / Uppada)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">
                    Cooperative Direct Rate (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] font-bold focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6E5D4E] font-semibold mb-1">
                  Raw Material & Pure Handmade Method
                </label>
                <input
                  type="text"
                  required
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. 100% Solid Ankudu Wood turned with Kevda leaf friction"
                  className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">
                    Cluster Origin / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    placeholder="e.g. Varaha River Basin, Etikoppaka"
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">
                    Dispatch SLA
                  </label>
                  <select
                    value={dispatchSLA}
                    onChange={(e) => setDispatchSLA(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none cursor-pointer"
                  >
                    <option value="Dispatch < 12 hrs">Dispatch &lt; 12 hrs</option>
                    <option value="Dispatch < 24 hrs">Dispatch &lt; 24 hrs</option>
                    <option value="Dispatch < 36 hrs">Dispatch &lt; 36 hrs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#6E5D4E] font-semibold mb-1">
                  Description & Craft Story
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the generational technique, natural dyes, and handmade care..."
                  className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#6E5D4E] font-semibold mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] text-xs focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Craft for Physical Cluster Verification & Publish</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  X,
  User,
  Building,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    login,
    register,
    logout,
  } = useApp();

  const [role, setRole] = useState<UserRole>('buyer');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  // Seller specific
  const [societyName, setSocietyName] = useState('');
  const [cooperativeRegNo, setCooperativeRegNo] = useState('');
  const [clusterLocation, setClusterLocation] = useState('');
  const [craftSpecialization, setCraftSpecialization] = useState('Etikoppaka Lacquerware & Wooden Toys');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signin') {
      login(email || (role === 'buyer' ? 'buyer@artisanhaven.in' : 'seller@etikoppakacoop.org'), role);
    } else {
      register({
        role,
        fullName: fullName || (role === 'buyer' ? 'Conscious Buyer' : 'Master Artisan Society'),
        email: email || (role === 'buyer' ? 'ananya@artisanhaven.in' : 'society@coop.org'),
        phone: phone || '+91 98480 22334',
        city: city || 'Visakhapatnam',
        societyName: role === 'seller' ? (societyName || 'Etikoppaka Heritage Society') : undefined,
        cooperativeRegNo: role === 'seller' ? (cooperativeRegNo || 'AP-VZG-CRAFT-108') : undefined,
        clusterLocation: role === 'seller' ? (clusterLocation || 'Varaha River Basin, Vizag') : undefined,
        craftSpecialization: role === 'seller' ? craftSpecialization : undefined,
      });
    }

    setIsAuthModalOpen(false);
  };

  const handleQuickDemoBuyer = () => {
    setRole('buyer');
    setEmail('ananya.buyer@artisanhaven.in');
    setPassword('••••••••');
    setFullName('Ananya Sundaram');
    setCity('Visakhapatnam');
    setPhone('+91 98480 22334');
    login('ananya.buyer@artisanhaven.in', 'buyer');
    setIsAuthModalOpen(false);
  };

  const handleQuickDemoSeller = () => {
    setRole('seller');
    setEmail('etikoppaka.society@aphandicrafts.gov');
    setPassword('••••••••');
    setFullName('C.V. Raju (GI Custodian Master)');
    setSocietyName('Etikoppaka Artisans Society Hub');
    setCooperativeRegNo('AP-VZG-CRAFT-108');
    setClusterLocation('Varaha River Basin, Visakhapatnam');
    setCraftSpecialization('Etikoppaka Lacquerware & Ankudu Woodcraft');
    login('etikoppaka.society@aphandicrafts.gov', 'seller');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-[#FDFBF7] border border-[#D5C7B2] rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#1B4D3E] text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#2A6E59] flex items-center justify-center shrink-0 border border-white/20">
              {role === 'buyer' ? <User className="w-6 h-6 text-[#F3C68F]" /> : <Building className="w-6 h-6 text-[#F3C68F]" />}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#F3C68F]">
                {role === 'buyer' ? 'Conscious Buyer Portal' : 'Artisan Cooperative Seller Portal'}
              </div>
              <h2 className="text-xl font-serif font-bold text-white mt-0.5">
                {mode === 'signin' ? 'Sign In to Artisan Haven' : 'Register New Account'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Role Switcher: Buyer vs Seller */}
          <div className="bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#DFCDB7] grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === 'buyer'
                  ? 'bg-[#1B4D3E] text-white shadow-sm'
                  : 'text-[#4A3E31] hover:bg-[#EFE7D8]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Conscious Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('seller')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === 'seller'
                  ? 'bg-[#8B4513] text-white shadow-sm'
                  : 'text-[#4A3E31] hover:bg-[#EFE7D8]'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Artisan / Cooperative</span>
            </button>
          </div>

          {/* Mode Switcher: Sign In vs Sign Up */}
          <div className="flex items-center justify-between border-b border-[#DFCDB7] pb-2 text-xs font-semibold">
            <div className="space-x-4">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  mode === 'signin'
                    ? 'border-[#8B4513] text-[#8B4513]'
                    : 'border-transparent text-[#7A6B5C] hover:text-[#2A2118]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'border-[#8B4513] text-[#8B4513]'
                    : 'border-transparent text-[#7A6B5C] hover:text-[#2A2118]'
                }`}
              >
                Register as {role === 'buyer' ? 'Buyer' : 'Artisan Society'}
              </button>
            </div>

            <span className="text-[11px] text-[#6E5D4E]">
              {role === 'seller' ? 'Official AP Society Hub' : 'Conscious Shopper'}
            </span>
          </div>

          {/* Quick Demo Pre-fill Pill Bar */}
          <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#DFCDB7] flex items-center justify-between text-xs">
            <span className="text-[#6E5D4E] font-medium">Quick 1-Click Demo Login:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleQuickDemoBuyer}
                className="px-2.5 py-1 rounded bg-white text-[#1B4D3E] font-semibold border border-[#D5C7B2] hover:bg-[#EAE1D2] text-[11px] cursor-pointer"
              >
                Demo Buyer
              </button>
              <button
                type="button"
                onClick={handleQuickDemoSeller}
                className="px-2.5 py-1 rounded bg-white text-[#8B4513] font-semibold border border-[#D5C7B2] hover:bg-[#EAE1D2] text-[11px] cursor-pointer"
              >
                Demo Seller
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'signup' && (
              <div>
                <label className="block text-[#6E5D4E] font-semibold mb-1">
                  {role === 'buyer' ? 'Full Name' : 'Artisan Master / Society Representative'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={role === 'buyer' ? 'e.g. Ananya Sundaram' : 'e.g. C.V. Raju'}
                    className="w-full p-2.5 pl-8 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                  />
                  <User className="w-4 h-4 text-[#8B4513] absolute left-2.5 top-2.5" />
                </div>
              </div>
            )}

            {/* Seller Specific Fields on Registration */}
            {role === 'seller' && mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">
                    Cooperative Society / Guild Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={societyName}
                      onChange={(e) => setSocietyName(e.target.value)}
                      placeholder="e.g. Etikoppaka Artisans Society Hub"
                      className="w-full p-2.5 pl-8 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                    />
                    <Building className="w-4 h-4 text-[#8B4513] absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#6E5D4E] font-semibold mb-1">
                      Co-op Registration #
                    </label>
                    <input
                      type="text"
                      required
                      value={cooperativeRegNo}
                      onChange={(e) => setCooperativeRegNo(e.target.value)}
                      placeholder="e.g. AP-VZG-CRAFT-108"
                      className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] font-mono focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6E5D4E] font-semibold mb-1">
                      Cluster / Village
                    </label>
                    <input
                      type="text"
                      required
                      value={clusterLocation}
                      onChange={(e) => setClusterLocation(e.target.value)}
                      placeholder="e.g. Etikoppaka / Lepakshi"
                      className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">
                    Craft Specialization
                  </label>
                  <select
                    value={craftSpecialization}
                    onChange={(e) => setCraftSpecialization(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none cursor-pointer"
                  >
                    <option value="Etikoppaka Lacquerware & Wooden Toys">Etikoppaka Lacquerware & Wooden Toys</option>
                    <option value="Lepakshi & Rayalaseema Terracotta Pot Art">Lepakshi & Rayalaseema Terracotta Pot Art</option>
                    <option value="Kondapalli Traditional Bommalu & Woodcraft">Kondapalli Traditional Bommalu & Woodcraft</option>
                    <option value="Uppada / Mangalagiri Pure Handloom Weaving">Uppada / Mangalagiri Pure Handloom Weaving</option>
                    <option value="Srikalahasti Natural Dye Temple Kalamkari">Srikalahasti Natural Dye Temple Kalamkari</option>
                    <option value="Budithi Bell-Metal & Brass Castings">Budithi Bell-Metal & Brass Castings</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-[#6E5D4E] font-semibold mb-1">
                {role === 'buyer' ? 'Email Address' : 'Official Society Email / ID'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'buyer' ? 'buyer@example.com' : 'society.hub@aphandicrafts.org'}
                  className="w-full p-2.5 pl-8 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#8B4513] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-[#6E5D4E] font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 pl-8 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-[#8B4513] absolute left-2.5 top-2.5" />
              </div>
            </div>

            {mode === 'signup' && role === 'buyer' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Visakhapatnam"
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#6E5D4E] font-semibold mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480..."
                    className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-white text-[#2A2118] focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-2"
            >
              <span>
                {mode === 'signin'
                  ? `Sign In as ${role === 'buyer' ? 'Buyer' : 'Artisan Society'}`
                  : `Complete ${role === 'buyer' ? 'Buyer' : 'Cooperative'} Registration`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Security Info */}
          <div className="pt-2 border-t border-[#DFCDB7] flex items-center justify-between text-[11px] text-[#6E5D4E]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B4D3E]" />
              Physical Cluster Verification Guard
            </span>
            <span>Direct Cooperative Network</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ShoppingBag,
  Radio,
  ShieldCheck,
  Globe,
  Menu,
  X,
  Info,
  User,
  Building,
  LogOut,
  PlusCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeScreen,
    navigateToScreen,
    cart,
    language,
    toggleLanguage,
    t,
    setIsCuratorOpen,
    clearMyData,
    currentUser,
    setIsAuthModalOpen,
    setIsSellerDashboardOpen,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNav = (screen: 'clusterFeed' | 'productDetails' | 'cartSla' | 'about') => {
    navigateToScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-[#1B4D3E] text-[#FDFBF7] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#2E7D32] text-white">
              VERIFIED
            </span>
            <span className="truncate">
              Direct from Andhra Cooperatives in Etikoppaka, Lepakshi, Kondapalli, Uppada, Srikalahasti & Budithi
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-90 hidden sm:flex">
            <span>Govt. GI Tag Protected</span>
            <span>•</span>
            <span>Lead-Free & Organic Crafts</span>
            <span>•</span>
            <span>Direct Cooperative Dispatch</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNav('clusterFeed')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            aria-label="Artisan Haven Home"
          >
            <div className="w-11 h-11 rounded-lg bg-[#8B4513] text-[#FDFBF7] flex items-center justify-center font-bold text-xl shadow-md border border-[#A0522D] group-hover:bg-[#72360E] transition-colors">
              <span className="font-serif">AH</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#2A2118] group-hover:text-[#8B4513] transition-colors">
                  Artisan Haven
                </span>
                <span className="text-[10px] bg-[#1B4D3E]/10 text-[#1B4D3E] font-semibold px-1.5 py-0.5 rounded border border-[#1B4D3E]/20">
                  GI CRAFTS & WEAVES
                </span>
              </div>
              <p className="text-xs text-[#6B5E51] hidden sm:block line-clamp-1">
                Authentic Toys, Pot Art & Handloom Sarees • Visakhapatnam
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('clusterFeed')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeScreen === 'clusterFeed'
                  ? 'bg-[#8B4513] text-white shadow-sm'
                  : 'text-[#4A3E31] hover:text-[#8B4513] hover:bg-[#F3ECE1]'
              }`}
            >
              <Radio className={`w-4 h-4 ${activeScreen === 'clusterFeed' ? 'text-white' : 'text-[#8B4513]'}`} />
              {t.nav.clusterFeed}
            </button>

            <button
              onClick={() => handleNav('productDetails')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeScreen === 'productDetails'
                  ? 'bg-[#8B4513] text-white shadow-sm'
                  : 'text-[#4A3E31] hover:text-[#8B4513] hover:bg-[#F3ECE1]'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${activeScreen === 'productDetails' ? 'text-white' : 'text-[#1B4D3E]'}`} />
              {t.nav.productDetails}
            </button>

            <button
              onClick={() => handleNav('cartSla')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative flex items-center gap-1.5 cursor-pointer ${
                activeScreen === 'cartSla'
                  ? 'bg-[#8B4513] text-white shadow-sm'
                  : 'text-[#4A3E31] hover:text-[#8B4513] hover:bg-[#F3ECE1]'
              }`}
            >
              <ShoppingBag className={`w-4 h-4 ${activeScreen === 'cartSla' ? 'text-white' : 'text-[#8B4513]'}`} />
              <span>{t.nav.cartSla}</span>
              {totalCartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-xs font-bold rounded-full bg-[#D97706] text-white">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeScreen === 'about'
                  ? 'bg-[#8B4513] text-white shadow-sm'
                  : 'text-[#4A3E31] hover:text-[#8B4513] hover:bg-[#F3ECE1]'
              }`}
            >
              <Info className={`w-4 h-4 ${activeScreen === 'about' ? 'text-white' : 'text-[#6B5E51]'}`} />
              {t.nav.about}
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* AI Curator Button */}
            <button
              onClick={() => setIsCuratorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1B4D3E] hover:bg-[#153B30] text-[#FDFBF7] text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow active:scale-95 cursor-pointer"
              title="Find verified crafts & sarees with AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F3C68F]" />
              <span className="hidden lg:inline">AI Curator</span>
            </button>

            {/* Auth Button or User Badge */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                {currentUser.role === 'seller' && (
                  <button
                    onClick={() => setIsSellerDashboardOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#8B4513] text-white text-xs font-semibold hover:bg-[#72360E] shadow-xs cursor-pointer"
                    title="Open Cooperative Seller Hub"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Seller Hub</span>
                  </button>
                )}

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#DFCDB7] text-xs">
                  {currentUser.role === 'seller' ? (
                    <Building className="w-3.5 h-3.5 text-[#8B4513]" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#1B4D3E]" />
                  )}
                  <span className="font-semibold text-[#2A2118] max-w-[85px] sm:max-w-[120px] truncate">
                    {currentUser.fullName.split(' ')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="text-[#9C8E7F] hover:text-[#C53030] ml-1 p-0.5 cursor-pointer"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[#D5C7B2] bg-[#F7F2E7] hover:bg-[#ECE3D0] text-[#2A2118] transition-colors cursor-pointer"
              title="Toggle English / Telugu"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>{language === 'en' ? 'తెలుగు' : 'EN'}</span>
            </button>

            {/* Cart shortcut (mobile) */}
            <button
              onClick={() => handleNav('cartSla')}
              className="p-2 rounded-lg text-[#2A2118] hover:bg-[#F3ECE1] md:hidden relative cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#8B4513]" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B4513] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2A2118] hover:bg-[#F3ECE1] md:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DEC8] bg-[#FDFBF7] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in duration-200">
          <button
            onClick={() => handleNav('clusterFeed')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-3 cursor-pointer ${
              activeScreen === 'clusterFeed'
                ? 'bg-[#8B4513] text-white'
                : 'text-[#2A2118] hover:bg-[#F3ECE1]'
            }`}
          >
            <Radio className="w-5 h-5" />
            <span>{t.nav.clusterFeed}</span>
          </button>

          <button
            onClick={() => handleNav('productDetails')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-3 cursor-pointer ${
              activeScreen === 'productDetails'
                ? 'bg-[#8B4513] text-white'
                : 'text-[#2A2118] hover:bg-[#F3ECE1]'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t.nav.productDetails}</span>
          </button>

          <button
            onClick={() => handleNav('cartSla')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between cursor-pointer ${
              activeScreen === 'cartSla'
                ? 'bg-[#8B4513] text-white'
                : 'text-[#2A2118] hover:bg-[#F3ECE1]'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span>{t.nav.cartSla}</span>
            </div>
            {totalCartCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#D97706] text-white">
                {totalCartCount} items
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-3 cursor-pointer ${
              activeScreen === 'about'
                ? 'bg-[#8B4513] text-white'
                : 'text-[#2A2118] hover:bg-[#F3ECE1]'
            }`}
          >
            <Info className="w-5 h-5" />
            <span>{t.nav.about}</span>
          </button>

          <div className="pt-2 border-t border-[#E8DEC8] space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded-lg border border-[#DFCDB7]">
                <div className="flex items-center gap-2">
                  {currentUser.role === 'seller' ? <Building className="w-4 h-4 text-[#8B4513]" /> : <User className="w-4 h-4 text-[#1B4D3E]" />}
                  <span className="text-xs font-bold text-[#2A2118]">
                    {currentUser.fullName} ({currentUser.role === 'seller' ? 'Seller' : 'Buyer'})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {currentUser.role === 'seller' && (
                    <button
                      onClick={() => {
                        setIsSellerDashboardOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="px-2 py-1 rounded bg-[#8B4513] text-white text-[11px] font-semibold"
                    >
                      Seller Hub
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="p-1 text-[#C53030] text-xs font-semibold hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-[#8B4513] text-[#8B4513] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register (Buyer & Seller)</span>
              </button>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setIsCuratorOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-[#1B4D3E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 mr-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F3C68F]" />
                <span>AI Craft Curator</span>
              </button>

              <button
                onClick={clearMyData}
                className="py-2 px-3 rounded-lg text-xs font-medium text-[#8B4513] border border-[#D5C7B2] bg-[#F7F2E7]"
              >
                {t.common.clearData}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

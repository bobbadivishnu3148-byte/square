import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ClusterFeedScreen } from './screens/ClusterFeedScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { CartSlaScreen } from './screens/CartSlaScreen';
import { AboutScreen } from './screens/AboutScreen';
import { AICuratorModal } from './components/AICuratorModal';
import { AuthenticityModal } from './components/AuthenticityModal';
import { AuthModal } from './components/AuthModal';
import { SellerDashboardModal } from './components/SellerDashboardModal';
import { ShieldCheck, Sparkles, MapPin, Trash2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeScreen,
    navigateToScreen,
    notification,
    clearMyData,
    setIsCuratorOpen,
    t,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A2118] selection:bg-[#8B4513] selection:text-white">
      {/* Toast Notification Bar */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1B4D3E] text-[#FDFBF7] px-4 py-3 rounded-xl shadow-xl border border-[#2B7760] text-sm flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
          <ShieldCheck className="w-4 h-4 text-[#F3C68F] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeScreen === 'clusterFeed' && <ClusterFeedScreen />}
        {activeScreen === 'productDetails' && <ProductDetailsScreen />}
        {activeScreen === 'cartSla' && <CartSlaScreen />}
        {activeScreen === 'about' && <AboutScreen />}
      </main>

      {/* Modals */}
      <AICuratorModal />
      <AuthenticityModal />
      <AuthModal />
      <SellerDashboardModal />

      {/* Footer */}
      <footer className="border-t border-[#E8DEC8] bg-[#F7F2E7] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Promise */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#8B4513] text-white flex items-center justify-center font-bold text-sm">
                  AH
                </div>
                <span className="font-serif text-xl font-bold text-[#2A2118]">
                  Artisan Haven
                </span>
                <span className="text-[10px] font-bold bg-[#1B4D3E]/10 text-[#1B4D3E] px-2 py-0.5 rounded border border-[#1B4D3E]/20">
                  VISAKHAPATNAM
                </span>
              </div>
              <p className="text-sm text-[#6E5D4E] max-w-md leading-relaxed">
                Authentic, cluster-verified small-scale handicrafts, Etikoppaka toys, pot art and pure handloom sarees delivered directly from Andhra's artisan cooperatives. Powered by physical supply-chain verification and direct cooperative fulfillment.
              </p>
              <div className="text-xs text-[#7A6B5C] flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Headquarters: Visakhapatnam, Andhra Pradesh, India</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2118]">
                Cooperative Platform
              </h4>
              <ul className="space-y-2 text-sm text-[#6E5D4E]">
                <li>
                  <button
                    onClick={() => navigateToScreen('clusterFeed')}
                    className="hover:text-[#8B4513] transition-colors cursor-pointer"
                  >
                    Live Craft & Loom Feed
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToScreen('productDetails')}
                    className="hover:text-[#8B4513] transition-colors cursor-pointer"
                  >
                    Origin & Audit Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToScreen('cartSla')}
                    className="hover:text-[#8B4513] transition-colors cursor-pointer"
                  >
                    Cart & Hub SLA Tracker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToScreen('about')}
                    className="hover:text-[#8B4513] transition-colors cursor-pointer"
                  >
                    About The Team (The Square)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsCuratorOpen(true)}
                    className="hover:text-[#1B4D3E] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
                    AI Craft Curator
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Cooperative Registry & Clear Data */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2118]">
                Cluster Networks
              </h4>
              <p className="text-xs text-[#6E5D4E] leading-relaxed">
                Etikoppaka Society • Lepakshi Potters Guild • Kondapalli Craftsmen Union • Uppada Handloom Society • Mangalagiri Weavers Hub • Venkatagiri Royal Guild.
              </p>
              <div className="pt-2">
                <button
                  onClick={clearMyData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8B4513] bg-[#EFE7D8] hover:bg-[#E5DBC7] rounded-lg border border-[#DFCDB7] transition-colors cursor-pointer"
                  title="Clear simulated cart and order data"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.common.clearData}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DFCDB7] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6B5C] gap-3">
            <div>
              © 2026 Artisan Haven • Built by <strong className="text-[#2A2118]">The Square</strong>, Visakhapatnam.
            </div>
            <div className="flex items-center gap-4">
              <span>Direct Cooperative Pricing</span>
              <span>•</span>
              <span>100% Certified Lead-Free & Organic Clay</span>
              <span>•</span>
              <span>Dispatch &lt;36 hrs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

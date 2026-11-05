import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  ShoppingBag,
  Trash2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  QrCode,
  CreditCard,
  HeartHandshake,
} from 'lucide-react';
import { StatsStrip } from '../components/StatsStrip';

export const CartSlaScreen: React.FC = () => {
  const {
    cart,
    orders,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    navigateToScreen,
    t,
  } = useApp();

  const [fullName, setFullName] = useState('Ananya Sundaram');
  const [city, setCity] = useState('Visakhapatnam');
  const [phone, setPhone] = useState('+91 98480 22334');
  const [addressLine, setAddressLine] = useState('Plot 42, Lawson’s Bay Colony, Beach Road');
  const [upiApp, setUpiApp] = useState<'Google Pay' | 'PhonePe' | 'Paytm' | 'BHIM'>('Google Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(orders.length > 0 ? orders[0] : null);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const artisanPayoutTotal = cart.reduce(
    (acc, item) => acc + item.product.priceBreakdown.artisanShare * item.quantity,
    0
  );
  const hubPayoutTotal = cart.reduce(
    (acc, item) => acc + item.product.priceBreakdown.hubShare * item.quantity,
    0
  );
  const platformFeeTotal = cart.reduce(
    (acc, item) => acc + item.product.priceBreakdown.platformShare * item.quantity,
    0
  );
  const retailSavingsTotal = cart.reduce(
    (acc, item) => acc + item.product.priceBreakdown.buyerSavings * item.quantity,
    0
  );

  const maxDispatchSLA = cart.length > 0 ? Math.max(...cart.map((i) => i.product.dispatchHoursMax || 24), 12) : 24;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder(
        {
          fullName: fullName.trim() || 'Conscious Buyer',
          city: city.trim() || 'Visakhapatnam',
          phone: phone.trim() || '+91 98480 22334',
          addressLine: addressLine.trim() || 'Visakhapatnam, Andhra Pradesh',
        },
        upiApp
      );
      setLatestOrder(order);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Title Banner */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#1B4D3E] text-white">
            HUB SLA GUARANTEED
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B4513]">
            Cooperative Craft Supply Chain
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A2118] mt-1">
          {t.cart.title}
        </h1>
        <p className="text-sm text-[#6E5D4E]">
          Simple UPI checkout with exact cluster dispatch window (&lt;36 hrs) and cooperative hub order fulfillment.
        </p>
      </div>

      {/* When Cart has Items */}
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items & SLA Guarantee */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Hub SLA Window Banner */}
            <div className="bg-[#FAF7F2] border-2 border-[#1B4D3E]/30 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#1B4D3E] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-6 h-6 text-[#F3C68F]" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-[#1B4D3E] tracking-wider">
                    {t.cart.dispatchWindow}
                  </div>
                  <div className="text-xl font-serif font-bold text-[#2A2118]">
                    Cluster Dispatch: &lt;{maxDispatchSLA} Hours Guaranteed
                  </div>
                  <div className="text-xs text-[#6E5D4E]">
                    Originating Hub: Visakhapatnam Regional Artisan Logistics Terminal
                  </div>
                </div>
              </div>
              <div className="text-right sm:border-l sm:border-[#DFCDB7] sm:pl-4">
                <span className="text-[11px] text-[#7A6B5C] uppercase block">Cooperative Savings</span>
                <span className="text-lg font-bold text-[#1B4D3E]">
                  Save ₹{retailSavingsTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl border border-[#DFCDB7] divide-y divide-[#E8DEC8] shadow-xs overflow-hidden">
              <div className="p-4 bg-[#FAF7F2] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6E5D4E]">
                  Authentic Crafts in Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#8B4513] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cart</span>
                </button>
              </div>

              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#DFCDB7] shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8B4513] font-semibold">
                        <span>{item.product.sku}</span>
                        <span>•</span>
                        <span>{item.product.dispatchSLA}</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#2A2118] line-clamp-1">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-[#6E5D4E] line-clamp-1">
                        {item.product.hub}
                      </p>
                      <div className="text-xs text-[#1B4D3E] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
                        <span>100% Cluster-Verified Handcrafted</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#F0E8DC]">
                    <div className="text-lg font-bold font-serif text-[#2A2118]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#DFCDB7] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-[#4A3E31] hover:bg-[#EAE1D2] rounded-l-lg cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#2A2118]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-[#4A3E31] hover:bg-[#EAE1D2] rounded-r-lg cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 rounded-lg text-[#9C8E7F] hover:text-[#C53030] hover:bg-[#FDF2F2] transition-colors cursor-pointer"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cooperative Hub Dispatch Guarantee Notice */}
            <div className="p-4 bg-[#E2ECE7] border border-[#C5DDD2] rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1B4D3E] shrink-0 mt-0.5" />
              <div className="text-xs text-[#1B4D3E] leading-relaxed">
                <strong>Cooperative Hub Dispatch Guarantee:</strong> Your order is authenticated and packed directly at the regional artisan workshop terminal in Andhra Pradesh with tamper-evident GI verification seals within &lt;36 hours.
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Summary & UPI Checkout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#DFCDB7] p-5 sm:p-6 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-[#2A2118]">
                Transparent Price & Payout Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#6E5D4E]">
                  <span>Cooperative Crafts Total</span>
                  <span className="font-semibold text-[#2A2118]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#1B4D3E] bg-[#E2ECE7] p-2 rounded-lg">
                  <span className="font-semibold">✓ Direct Cooperative Society Price</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6E5D4E]">
                  <span>Cluster Hub QA, Purity Assay & Shockproof Packing</span>
                  <span className="font-semibold text-[#2A2118]">₹{hubPayoutTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6E5D4E]">
                  <span>Artisan Haven Platform (14%)</span>
                  <span className="font-semibold text-[#2A2118]">₹{platformFeeTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#1B4D3E] text-[11px] pt-1">
                  <span>Buyer Savings vs City Retail Boutiques</span>
                  <span className="font-bold">Save ₹{retailSavingsTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-[#E8DEC8] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#2A2118]">Total Payable Amount</span>
                  <span className="font-serif text-2xl font-bold text-[#8B4513]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Simple UPI Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-3 border-t border-[#E8DEC8]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6E5D4E]">
                  Delivery Address & Buyer Details
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label htmlFor="fullname" className="block text-[#6E5D4E] font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-[#FAF7F2] text-[#2A2118] text-xs focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="city" className="block text-[#6E5D4E] font-medium mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-[#FAF7F2] text-[#2A2118] text-xs focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[#6E5D4E] font-medium mb-1">
                        Contact Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-[#FAF7F2] text-[#2A2118] text-xs focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-[#6E5D4E] font-medium mb-1">
                      Street / Colony Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#DFCDB7] bg-[#FAF7F2] text-[#2A2118] text-xs focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                    />
                  </div>
                </div>

                {/* UPI App Selection */}
                <div className="space-y-2 pt-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#6E5D4E]">
                    Select UPI Payment App
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Google Pay', 'PhonePe', 'Paytm', 'BHIM'] as const).map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiApp(app)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          upiApp === app
                            ? 'bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-xs'
                            : 'bg-[#FAF7F2] text-[#4A3E31] border-[#DFCDB7] hover:bg-[#EFE7D8]'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{app}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Action Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-4 rounded-xl bg-[#8B4513] hover:bg-[#72360E] disabled:bg-[#BCA997] text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {isProcessing
                      ? 'Confirming with Cooperative Hub...'
                      : 'Purchasing a verified authentic handicraft directly from an artisan cooperative hub'}
                  </span>
                </button>

                <div className="text-[11px] text-center text-[#7A6B5C]">
                  🔒 Simulated 1-Click UPI Payment • Cooperative Cluster Fulfillment
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-[#DFCDB7] p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#8B4513] flex items-center justify-center mx-auto border border-[#E8DEC8]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#2A2118]">
            {t.cart.empty}
          </h2>
          <p className="text-sm text-[#6E5D4E]">
            Browse live workshop snippets from Etikoppaka, Lepakshi, and Kondapalli cooperatives to verify authenticity before you buy.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateToScreen('clusterFeed')}
              className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-[#72360E] text-white text-sm font-semibold shadow-md flex items-center gap-2 mx-auto transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore Verified Cluster Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Verified Order Confirmation Slip (if an order was placed) */}
      {latestOrder && (
        <div className="bg-white rounded-3xl border-2 border-[#1B4D3E] p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E2ECE7] text-[#1B4D3E] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7 text-[#1B4D3E]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#1B4D3E] tracking-wider">
                  Order Successfully Dispatched to Cooperative
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2A2118]">
                  Order #{latestOrder.id}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#DFCDB7]">
              <QrCode className="w-4 h-4 text-[#8B4513]" />
              <div className="text-right">
                <div className="text-[10px] text-[#7A6B5C] uppercase">Co-op Receipt Hash</div>
                <div className="font-mono text-xs font-bold text-[#1B4D3E]">
                  {latestOrder.cooperativeReceiptHash}
                </div>
              </div>
            </div>
          </div>

          {/* Fulfillment SLA Tracker Bar */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#DFCDB7] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2A2118] uppercase">
                48-Hour Cooperative Fulfillment Capability Active
              </span>
              <span className="font-semibold text-[#1B4D3E] bg-[#E2ECE7] px-2 py-0.5 rounded">
                SLA: Dispatch &lt;36 hrs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#E2ECE7] border border-[#C5DDD2]">
                <div className="font-bold text-[#1B4D3E]">1. Payment Cleared</div>
                <div className="text-[11px] text-[#3F6354]">Instant UPI Confirmation</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#E2ECE7] border border-[#C5DDD2]">
                <div className="font-bold text-[#1B4D3E]">2. Hub Allocation</div>
                <div className="text-[11px] text-[#3F6354]">Cooperative Ledger Updated</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FFF9EE] border border-[#F5E2BE]">
                <div className="font-bold text-[#B45309]">3. Cluster QA & Shockproof Pack</div>
                <div className="text-[11px] text-[#8D5B18]">In Progress at Hub</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#DFCDB7]">
                <div className="font-bold text-[#6E5D4E]">4. Doorstep Express</div>
                <div className="text-[11px] text-[#7A6B5C]">Estimated: 48 hours</div>
              </div>
            </div>
          </div>

          {/* Ordered Items summary */}
          <div className="text-xs space-y-2">
            <div className="font-bold text-[#6E5D4E] uppercase tracking-wider">
              Items in this Cooperative Batch:
            </div>
            {latestOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between p-2.5 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <span>
                  <strong>{item.quantity}x</strong> {item.product.title} ({item.product.hub})
                </span>
                <span className="font-mono font-bold">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Stats Strip */}
      <StatsStrip />
    </div>
  );
};

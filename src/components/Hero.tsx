import React from 'react';
import { ArrowDown, MessageCircle, Clock, Sparkles, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/menu';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F6] via-[#FDFBF7] to-[#FDFBF7] pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-[#EADBCE]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFE9E2]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE9E2] border border-[#EADBCE] text-[#9D3E1A] text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D96B43]" />
              <span>Small-Batch Hearth Bakery & Patisserie</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C1810] leading-[1.12]">
              Slow-fermented bread &amp; velvety celebration cakes,{' '}
              <span className="italic font-normal text-[#9D3E1A]">baked fresh every dawn.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5D4037] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              At <strong className="font-semibold text-[#2C1810]">Crumb &amp; Co.</strong>, we practice patient baking.
              From 36-hour wild yeast sourdoughs with blistered crusts to handcrafted Belgian dark chocolate
              celebration cakes. Order seamlessly on WhatsApp for same-day dispatch and pre-order dates.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => scrollTo('#menu')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D96B43] hover:bg-[#C85A32] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Explore Daily Menu</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#custom-order')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F7F3EB] text-[#2C1810] border border-[#EADBCE] text-sm sm:text-base font-semibold shadow-xs hover:border-[#D96B43]/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D96B43]" />
                <span>Custom Cake Inquiry</span>
              </button>
            </div>

            {/* Key Quality Pillars */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EADBCE]/80">
                <span className="text-lg">🌾</span>
                <div>
                  <p className="text-xs font-bold text-[#2C1810]">36-hr Ferment</p>
                  <p className="text-[11px] text-[#5D4037]">Wild rustic yeast</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EADBCE]/80">
                <span className="text-lg">🧈</span>
                <div>
                  <p className="text-xs font-bold text-[#2C1810]">100% Pure Butter</p>
                  <p className="text-[11px] text-[#5D4037]">Zero preservatives</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EADBCE]/80">
                <span className="text-lg">💬</span>
                <div>
                  <p className="text-xs font-bold text-[#2C1810]">WhatsApp Quick</p>
                  <p className="text-[11px] text-[#5D4037]">Instant confirmation</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Composition (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Card / Image */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#EADBCE] shadow-xl bg-[#FFFFFF] p-2">
                <div className="relative aspect-[4/4.2] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
                    alt="Artisanal freshly baked sourdough and pastries at Crumb & Co."
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-transparent" />
                  
                  {/* Floating caption on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#D96B43] text-[11px] font-bold uppercase tracking-wider mb-1">
                      Today's Oven Batch
                    </span>
                    <h3 className="font-serif text-lg font-semibold leading-tight drop-shadow-sm">
                      Country Sourdough &amp; Brioche Bakes
                    </h3>
                    <p className="text-xs text-stone-200 mt-0.5">
                      Baked hot on baking stones at 240°C
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Floating Pill: WhatsApp order badge */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-[#FFFFFF] border border-[#EADBCE] rounded-2xl p-3 shadow-lg flex items-center gap-3 backdrop-blur-xs max-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-[#588157]/15 flex items-center justify-center text-[#588157] shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2C1810]">Order on WhatsApp</p>
                  <p className="text-[11px] text-[#5D4037]">Pre-orders &amp; custom cakes</p>
                </div>
              </div>

              {/* Floating Freshness Stamp */}
              <div className="absolute -top-3 -right-3 sm:-right-4 bg-[#FFE9E2] border border-[#D96B43]/30 rounded-2xl p-2.5 shadow-md flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D96B43]" />
                <span className="text-xs font-bold text-[#9D3E1A]">Freshly pulled at 8:30 AM</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

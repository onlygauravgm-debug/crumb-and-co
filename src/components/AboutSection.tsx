import React from 'react';
import { Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Stacked Images */}
              <div className="relative rounded-3xl overflow-hidden border border-[#EADBCE] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"
                  alt="Baker scoring sourdough dough at dawn"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif italic text-lg text-[#FFE9E2]">
                    &ldquo;Good bread cannot be hurried. Time is our most valuable ingredient.&rdquo;
                  </p>
                  <p className="text-xs uppercase tracking-wider text-stone-300 mt-1">
                    The Crumb &amp; Co. Kitchen Creed
                  </p>
                </div>
              </div>

              {/* Little Floating Pill */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white border border-[#EADBCE] p-4 rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-xs font-bold text-[#2C1810]">Living Starter</p>
                <p className="text-[11px] text-[#5D4037] mt-0.5">
                  Fed daily with organic whole wheat &amp; spring water.
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Story Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9E2] text-[#9D3E1A] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C1810] leading-tight">
              Honouring the ancient art of slow-rise baking.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5D4037] leading-relaxed">
              <p>
                Crumb &amp; Co. was born from an obsession with the chemistry of sourdough fermentation and the quiet comfort of warm morning bakeries. We believe bread shouldn’t rely on commercial dough enhancers, artificial shelf-life extenders, or hurried industrial yeast.
              </p>
              <p>
                Every rustic loaf undergoes a patient 36-hour cold-retardation process. This allows wild yeasts and lactic bacteria to break down complex starches, resulting in deep caramelized crusts, custardy aerated crumbs, and easy digestibility.
              </p>
              <p>
                For our cakes and viennoiseries, we refuse shortcuts. We churn pure cultured butter, hand-scrape whole Madagascar bourbon vanilla pods, and melt single-origin Belgian chocolate.
              </p>
            </div>

            {/* Quality Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EADBCE]">
              <div>
                <div className="text-2xl font-serif font-bold text-[#D96B43]">36 hrs</div>
                <div className="text-xs font-bold text-[#2C1810] mt-1">Cold Fermentation</div>
                <p className="text-[11px] text-[#5D4037] mt-0.5">Naturally develops rich flavor and soft texture.</p>
              </div>

              <div>
                <div className="text-2xl font-serif font-bold text-[#D96B43]">100%</div>
                <div className="text-xs font-bold text-[#2C1810] mt-1">Real Cultured Butter</div>
                <p className="text-[11px] text-[#5D4037] mt-0.5">Zero palm oil, zero margarine or imitation fats.</p>
              </div>

              <div>
                <div className="text-2xl font-serif font-bold text-[#D96B43]">Dawn</div>
                <div className="text-xs font-bold text-[#2C1810] mt-1">Baked Daily at 5 AM</div>
                <p className="text-[11px] text-[#5D4037] mt-0.5">Fresh batches out of the oven every single morning.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

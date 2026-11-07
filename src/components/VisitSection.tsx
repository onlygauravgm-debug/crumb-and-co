import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, ChevronDown, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/menu';

export const VisitSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does ordering on WhatsApp work?',
      a: 'Add your bakes to the bag and tap "Order on WhatsApp", or fill out our custom cake form. This automatically opens a pre-composed message with all items, sizes, and preferences sent straight to our bakery kitchen (+91 99999 99999). We reply promptly to confirm delivery timing and provide payment options (UPI, Netbanking, Cards).',
    },
    {
      q: 'How far in advance should I order custom celebration cakes?',
      a: 'We recommend placing custom celebration cake orders at least 24 to 48 hours in advance so our head baker can prepare your freshly baked sponges and handcraft fillings. Same-day emergency cakes depend on kitchen availability.',
    },
    {
      q: 'Are your breads and cakes eggless?',
      a: 'Yes! All our sourdough loaves and focaccias are naturally 100% vegan and eggless. For our celebration cakes and cookies, we offer dedicated eggless formulations that are remarkably moist and tender.',
    },
    {
      q: 'How long does wild sourdough bread stay fresh?',
      a: 'Because our bread is fermented for 36 hours with wild yeast and natural lactic acid, it stays fresh naturally for 4 to 5 days stored at room temperature in a paper bag or bread box. You can also slice and freeze it for up to 1 month!',
    },
  ];

  return (
    <section id="visit" className="py-16 sm:py-24 bg-[#FFF8F6] border-t border-[#EADBCE] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9E2] text-[#9D3E1A] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bakery Kitchen &amp; Counter</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C1810]">
            Visit Us &amp; Batch Timings
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037]">
            Pick up fresh loaves directly from the oven counter, or have them dispatched warm to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Location & Hours Cards (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bakery Counter & Address */}
              <div className="bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFE9E2] flex items-center justify-center text-[#D96B43]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2C1810]">Bakery Counter</h3>
                <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                  14 Baker&rsquo;s Lane, Corner of 12th Main,<br />
                  Artisanal Quarter, Indiranagar,<br />
                  Bengaluru, Karnataka 560038
                </p>
                <div className="pt-2 text-xs font-semibold text-[#D96B43]">
                  Pickup &amp; Takeaway Available
                </div>
              </div>

              {/* Hearth Hours */}
              <div className="bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFE9E2] flex items-center justify-center text-[#D96B43]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2C1810]">Kitchen Hours</h3>
                <div className="text-xs sm:text-sm text-[#5D4037] space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#2C1810]">Tuesday – Sunday:</span>
                    <span>8:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#2C1810]">Monday:</span>
                    <span>Oven Maintenance</span>
                  </div>
                </div>
                <div className="pt-2 text-xs font-semibold text-[#588157]">
                  WhatsApp lines active daily
                </div>
              </div>

            </div>

            {/* Oven Batch Timetable */}
            <div className="bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#2C1810] flex items-center gap-2">
                <span>🔥</span> Daily Fresh Batch Schedule
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#EADBCE]">
                  <span className="font-bold text-[#D96B43] block">Morning Hearth (8:00 AM)</span>
                  <p className="text-[#5D4037] mt-0.5">Butter croissants, pain au chocolat, sourdough country loaves, morning buns.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#EADBCE]">
                  <span className="font-bold text-[#D96B43] block">Afternoon Oven (3:30 PM)</span>
                  <p className="text-[#5D4037] mt-0.5">Hot rosemary focaccia slabs, dark chocolate sea salt cookies, afternoon tea cakes.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-[#5D4037]">Have a question about today's fresh batch?</span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Crumb & Co.! Is today’s fresh batch of sourdough / croissants available right now?')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#588157] text-white text-xs font-semibold hover:bg-[#476846] flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Check Live Availability on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* FAQs Accordion (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[#2C1810]">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="border border-[#EADBCE] rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#2C1810] hover:bg-[#FDFBF7] transition-colors"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8A726A] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#D96B43]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#5D4037] leading-relaxed border-t border-[#EADBCE]/50 bg-[#FDFBF7]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

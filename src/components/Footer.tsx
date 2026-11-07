import React from 'react';
import { MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/menu';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2C1810] text-[#FDFBF7] pt-14 pb-12 border-t border-[#3D251B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#4A2D22]">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="font-serif text-3xl font-semibold tracking-tight text-white block">
                Crumb &amp; Co.
              </span>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#E9C46A] font-semibold block mt-1">
                Artisanal Bakery &amp; Patisserie
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#DDC0B7] max-w-sm leading-relaxed">
              Slow-fermented wild yeast loaves, cultured butter viennoiseries, and bespoke celebration cakes crafted with culinary devotion.
            </p>

            <div className="pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Crumb & Co.!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#588157] text-white text-xs font-semibold hover:bg-[#476846] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Order Line: +91 99999 99999</span>
              </a>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#FFE9E2]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DDC0B7]">
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleSmoothScroll(e, '#menu')}
                  className="hover:text-white transition-colors"
                >
                  Daily Hearth &amp; Patisserie Menu
                </a>
              </li>
              <li>
                <a
                  href="#custom-order"
                  onClick={(e) => handleSmoothScroll(e, '#custom-order')}
                  className="hover:text-white transition-colors"
                >
                  Custom Celebration Cakes
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, '#about')}
                  className="hover:text-white transition-colors"
                >
                  Our Philosophy &amp; 36-hr Fermentation
                </a>
              </li>
              <li>
                <a
                  href="#visit"
                  onClick={(e) => handleSmoothScroll(e, '#visit')}
                  className="hover:text-white transition-colors"
                >
                  Bakery Location &amp; Fresh Batch Timetable
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Kitchen Dispatch (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#FFE9E2]">
              Kitchen Dispatch
            </h4>
            <p className="text-xs text-[#DDC0B7] leading-relaxed">
              Tuesday to Sunday: 8:00 AM – 9:00 PM<br />
              Monday: Closed for deep hearth cleaning<br />
              WhatsApp pre-orders accepted 24/7
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-[#E9C46A] hover:underline"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with mandatory attribution line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Requirement 6: Keep the footer line */}
          <p className="text-xs sm:text-sm text-[#DDC0B7] font-medium">
            Concept project by Gaurav Dhami. Crumb &amp; Co. is a made-up business.
          </p>

          <p className="text-xs text-[#8A726A]">
            &copy; {new Date().getFullYear()} Crumb &amp; Co. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

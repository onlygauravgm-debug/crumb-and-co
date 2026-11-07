import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MessageCircle, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/whatsapp';
import { WHATSAPP_NUMBER } from '../data/menu';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const navLinks = [
    { name: 'Fresh Menu', href: '#menu' },
    { name: 'Custom Cakes', href: '#custom-order' },
    { name: 'Our Craft', href: '#about' },
    { name: 'Visit & Hours', href: '#visit' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#2C1810] text-[#FDFBF7] text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#3D251B]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#588157] animate-pulse"></span>
        <span>Morning bake out of the hearth • WhatsApp Pre-orders open for today & tomorrow</span>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Crumb & Co., I would like to check today’s fresh bake availability.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-[#E9C46A] hover:underline font-semibold ml-2"
        >
          Quick Chat <MessageCircle className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EADBCE] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex flex-col group focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2C1810] group-hover:text-[#D96B43] transition-colors">
                Crumb & Co.
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#5D4037] font-semibold">
                Artisanal Bakery & Patisserie
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm font-medium text-[#5D4037] hover:text-[#D96B43] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D96B43] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions: Cart Trigger & WhatsApp Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp direct link */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Crumb & Co.! I have a question about your bakery menu.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#588157] bg-[#588157]/10 hover:bg-[#588157]/20 border border-[#588157]/30 rounded-full transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#D96B43] text-white hover:bg-[#C85A32] shadow-sm hover:shadow transition-all active:scale-95"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">
                  Bag {totalCartCount > 0 && `(${totalCartCount})`}
                </span>
                {totalCartPrice > 0 && (
                  <span className="hidden sm:inline-block border-l border-white/30 pl-2 text-xs font-bold">
                    {formatINR(totalCartPrice)}
                  </span>
                )}
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:hidden flex h-5 w-5 items-center justify-center rounded-full bg-[#2C1810] text-[11px] font-bold text-white border-2 border-[#FDFBF7]">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#2C1810] hover:bg-[#F7F3EB] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-[#EADBCE] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-3 py-2.5 text-base font-medium text-[#2C1810] rounded-xl hover:bg-[#F7F3EB] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-[#D96B43] text-xs font-serif italic">Explore →</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EADBCE] flex flex-col gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Crumb & Co.! I would like to order on WhatsApp.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#588157] text-white text-sm font-semibold shadow hover:bg-[#476846] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#F7F3EB] border border-[#EADBCE] text-[#2C1810] text-sm font-semibold hover:bg-[#EADBCE] transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#D96B43]" />
                <span>Open Cart ({totalCartCount} items {totalCartPrice > 0 ? `• ${formatINR(totalCartPrice)}` : ''})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

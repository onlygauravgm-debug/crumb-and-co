import React from 'react';
import { ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR, generateCartWhatsAppUrl } from '../utils/whatsapp';

interface FloatingCartBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({ cart, onOpenCart }) => {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  if (totalItemsCount === 0) return null;

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateCartWhatsAppUrl(cart);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-30 sm:hidden">
      <div
        onClick={onOpenCart}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onOpenCart();
        }}
        className="bg-[#2C1810] text-white p-3.5 rounded-2xl shadow-2xl border border-[#4A2D22] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-[#D96B43] flex items-center justify-center text-white shrink-0">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-white text-[#2C1810] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#2C1810]">
              {totalItemsCount}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#EADBCE] font-medium block">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in Bag
            </span>
            <span className="text-sm font-bold text-white">
              {formatINR(totalPrice)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickWhatsApp}
            className="p-2 rounded-xl bg-[#588157] text-white hover:bg-[#486b47] transition-colors"
            title="Send directly to WhatsApp"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          
          <span className="flex items-center gap-1 text-xs font-bold text-[#E9C46A] pl-1">
            View Bag <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR, generateCartWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerNote, setCustomerNote] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleOrderWhatsApp = () => {
    if (cart.length === 0) return;
    const whatsappUrl = generateCartWhatsAppUrl(cart, customerNote, deliveryMethod);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C1810]/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#EADBCE]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#EADBCE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFE9E2] flex items-center justify-center text-[#D96B43]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#2C1810]">Your Bakery Bag</h2>
                <p className="text-xs text-[#5D4037]">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8A726A] hover:text-[#2C1810] hover:bg-[#F7F3EB] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F7F3EB] border border-[#EADBCE] flex items-center justify-center text-[#8A726A] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#2C1810]">Your bag is empty</h3>
                <p className="text-xs sm:text-sm text-[#5D4037] max-w-xs mt-2">
                  Warm sourdoughs, croissants, and celebration cakes are waiting fresh in our hearth menu.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#D96B43] text-white text-xs sm:text-sm font-semibold hover:bg-[#C85A32] shadow-sm transition-all"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              <>
                {/* Delivery Preference Switcher */}
                <div className="bg-[#F7F3EB] p-1.5 rounded-full border border-[#EADBCE] flex items-center">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'bg-white text-[#2C1810] shadow-xs'
                        : 'text-[#5D4037] hover:text-[#2C1810]'
                    }`}
                  >
                    🛵 Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'bg-white text-[#2C1810] shadow-xs'
                        : 'text-[#5D4037] hover:text-[#2C1810]'
                    }`}
                  >
                    🛍️ Bakery Pickup
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((cartItem) => {
                    const itemTotal = cartItem.item.price * cartItem.quantity;
                    return (
                      <div
                        key={cartItem.item.id}
                        className="bg-white p-3.5 rounded-2xl border border-[#EADBCE] shadow-xs flex gap-3.5 items-center"
                      >
                        {/* Thumbnail */}
                        {failedImages[cartItem.item.id] ? (
                          <div className="w-16 h-16 rounded-xl bg-[#F7F3EB] border border-[#EADBCE] flex flex-col items-center justify-center p-1.5 text-center shrink-0">
                            <span className="font-serif text-[10px] font-bold text-[#2C1810] leading-tight line-clamp-2">
                              {cartItem.item.name}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            onError={() => setFailedImages((prev) => ({ ...prev, [cartItem.item.id]: true }))}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EADBCE]"
                          />
                        )}

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-semibold text-[#2C1810] truncate">
                            {cartItem.item.name}
                          </h4>
                          <p className="text-xs text-[#5D4037] mt-0.5">
                            {formatINR(cartItem.item.price)} each
                          </p>

                          {/* Stepper + Item Total */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center bg-[#F7F3EB] border border-[#EADBCE] rounded-full p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                                className="w-6 h-6 rounded-full bg-white text-[#2C1810] flex items-center justify-center hover:bg-[#EADBCE] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-[#2C1810]">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                                className="w-6 h-6 rounded-full bg-[#D96B43] text-white flex items-center justify-center hover:bg-[#C85A32] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-[#2C1810]">
                              {formatINR(itemTotal)}
                            </span>
                          </div>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="p-1.5 text-[#8A726A] hover:text-[#BC4749] transition-colors self-start"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#8A726A] hover:text-[#BC4749] underline"
                  >
                    Clear all items
                  </button>
                </div>

                {/* Customer Note */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                    Order Note / Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Please pre-slice sourdough, deliver around 3 PM, eggless preferred..."
                    className="w-full text-xs p-3 bg-white border border-[#EADBCE] rounded-xl text-[#2C1810] placeholder-[#8A726A] focus:outline-none focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer with Total and WhatsApp Order Button */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EADBCE] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#5D4037]">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span className="font-semibold text-[#2C1810]">{formatINR(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#5D4037]">
                  <span>Packaging &amp; Delivery</span>
                  <span className="text-[#588157] font-medium">Coordinated on WhatsApp</span>
                </div>
                <div className="pt-2 border-t border-[#EADBCE] flex items-center justify-between text-base font-bold text-[#2C1810]">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#9D3E1A]">{formatINR(totalPrice)}</span>
                </div>
              </div>

              {/* Requirement 2: Order on WhatsApp button */}
              <button
                onClick={handleOrderWhatsApp}
                className="w-full py-3.5 px-4 rounded-full bg-[#588157] hover:bg-[#486b47] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp • {formatINR(totalPrice)}</span>
              </button>

              <p className="text-[11px] text-center text-[#8A726A]">
                Tapping opens WhatsApp with your pre-filled cart ready to send to our bakery kitchen (+91 99999 99999).
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

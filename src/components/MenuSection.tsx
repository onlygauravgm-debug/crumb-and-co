import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, Check, Search, Sparkles } from 'lucide-react';
import { MenuItem, MenuCategory, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menu';
import { formatINR, generateSingleItemWhatsAppUrl } from '../utils/whatsapp';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All Bakes');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEggless, setOnlyEggless] = useState(false);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories: MenuCategory[] = ['All Bakes', 'Signature Cakes', 'Cookies & Breads'];

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    if (selectedCategory !== 'All Bakes' && item.category !== selectedCategory) {
      return false;
    }
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) return false;
    }
    // Eggless filter
    if (onlyEggless) {
      const isEggless =
        item.tags.some((t) => t.toLowerCase().includes('eggless')) ||
        item.tags.some((t) => t.toLowerCase().includes('vegan'));
      if (!isEggless) return false;
    }
    return true;
  });

  const getItemQuantity = (itemId: string): number => {
    const found = cart.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemToast(item.name);
    setTimeout(() => {
      setAddedItemToast((prev) => (prev === item.name ? null : prev));
    }, 2000);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9E2] text-[#9D3E1A] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Baked Fresh Every Dawn</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C1810] tracking-tight">
            Our Hearth &amp; Patisserie Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037] max-w-xl mx-auto">
            Choose your daily favourites to add to your order bag, or tap &ldquo;Order on WhatsApp&rdquo; for instant booking directly with our head baker.
          </p>

          {/* Toast Notification when item added */}
          {addedItemToast && (
            <div className="mt-4 inline-flex items-center gap-2 bg-[#588157] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-md animate-bounce">
              <Check className="w-4 h-4" />
              <span>Added &ldquo;{addedItemToast}&rdquo; to your bag!</span>
              <button
                onClick={onOpenCart}
                className="ml-2 underline font-bold hover:text-[#FFE9E2]"
              >
                View Bag →
              </button>
            </div>
          )}
        </div>

        {/* Menu Tabs & Filters Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-[#EADBCE]">
          
          {/* Menu Tabs: All Bakes, Signature Cakes, Cookies & Breads */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#F7F3EB] rounded-full border border-[#EADBCE]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-[#D96B43] text-white shadow-sm'
                    : 'text-[#5D4037] hover:text-[#2C1810] hover:bg-white/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar & Eggless toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#8A726A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#EADBCE] rounded-full text-[#2C1810] placeholder-[#8A726A] focus:outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/20 transition-all"
              />
            </div>

            <button
              onClick={() => setOnlyEggless(!onlyEggless)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all whitespace-nowrap ${
                onlyEggless
                  ? 'bg-[#588157] text-white border-[#588157]'
                  : 'bg-white text-[#5D4037] border-[#EADBCE] hover:border-[#588157]/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyEggless ? 'bg-white' : 'bg-[#588157]'}`} />
              <span>Eggless</span>
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F7F3EB] rounded-3xl border border-[#EADBCE] p-8">
            <p className="text-lg font-serif text-[#2C1810]">No baked items found matching your filters.</p>
            <p className="text-sm text-[#5D4037] mt-1">Try resetting your search or viewing All Bakes.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Bakes');
                setSearchQuery('');
                setOnlyEggless(false);
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#D96B43] text-white text-xs font-semibold hover:bg-[#C85A32]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);
              const singleItemWhatsApp = generateSingleItemWhatsAppUrl(item);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Item Image with tags */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#F7F3EB] flex items-center justify-center">
                    {failedImages[item.id] ? (
                      <div className="w-full h-full bg-[#F7F3EB] border-b border-[#EADBCE] flex flex-col items-center justify-center p-6 text-center select-none">
                        <div className="w-12 h-12 rounded-full bg-[#FFE9E2] border border-[#EADBCE] flex items-center justify-center text-[#D96B43] mb-2 shadow-xs">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="font-serif text-base sm:text-lg font-medium text-[#2C1810] px-3 leading-snug line-clamp-2">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-semibold text-[#9D3E1A] tracking-wider uppercase mt-1">
                          Crumb &amp; Co. Fresh Bake
                        </span>
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          onError={() => setFailedImages((prev) => ({ ...prev, [item.id]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      </>
                    )}

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-[#FFE9E2] text-[#9D3E1A] text-[11px] font-bold shadow-xs">
                          {item.badge}
                        </span>
                      )}
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#2C1810] text-[10px] font-semibold shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.weightOrQuantity && (
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                        {item.weightOrQuantity}
                      </span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-semibold text-[#2C1810] leading-snug group-hover:text-[#D96B43] transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5D4037] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-5 mt-4 border-t border-[#F7F3EB] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#8A726A] font-medium block">Price</span>
                          <span className="text-xl font-bold text-[#2C1810]">
                            {formatINR(item.price)}
                          </span>
                        </div>

                        {/* Add to Order / Quantity Stepper Button */}
                        {qty === 0 ? (
                          <button
                            onClick={() => handleAdd(item)}
                            className="px-4 py-2 rounded-full bg-[#D96B43] hover:bg-[#C85A32] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#F7F3EB] border border-[#EADBCE] rounded-full p-1 shadow-inner">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded-full bg-white text-[#2C1810] flex items-center justify-center hover:bg-[#EADBCE] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-[#2C1810]">
                              {qty}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-full bg-[#D96B43] text-white flex items-center justify-center hover:bg-[#C85A32] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Direct WhatsApp Order Link for this item */}
                      <a
                        href={singleItemWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-semibold text-[#588157] hover:text-[#416040] bg-[#588157]/10 hover:bg-[#588157]/15 border border-[#588157]/20 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Order on WhatsApp directly</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

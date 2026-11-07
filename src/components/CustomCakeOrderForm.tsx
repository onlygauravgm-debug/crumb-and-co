import React, { useState } from 'react';
import { Calendar, Phone, User, Sparkles, MessageCircle, Heart, CheckCircle2, RefreshCw } from 'lucide-react';
import { CAKE_FLAVOURS, CAKE_SIZES } from '../data/menu';
import { CustomCakeOrder } from '../types';
import { generateCustomCakeWhatsAppUrl } from '../utils/whatsapp';

export const CustomCakeOrderForm: React.FC = () => {
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [flavour, setFlavour] = useState(CAKE_FLAVOURS[0]);
  const [size, setSize] = useState(CAKE_SIZES[1].value); // default 1.0 kg
  const [dietary, setDietary] = useState<'Eggless' | 'Contains Egg'>('Eggless');
  const [messageOnCake, setMessageOnCake] = useState('');
  
  // Set default date to tomorrow
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const [date, setDate] = useState(getTomorrowDate());
  const [specialNotes, setSpecialNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  
  // Submission success state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomCakeOrder | null>(null);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Please provide your name so our bakers know who to address.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please provide your phone number for order coordination.';
    } else if (phone.trim().replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8-10 digits).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const orderData: CustomCakeOrder = {
      name: name.trim(),
      phone: phone.trim(),
      flavour,
      size,
      dietary,
      messageOnCake: messageOnCake.trim(),
      deliveryDate: date,
      specialNotes: specialNotes.trim(),
    };

    // Open WhatsApp with all the form details
    const whatsappUrl = generateCustomCakeWhatsAppUrl(orderData);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show Thank you message
    setSubmittedOrder(orderData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setMessageOnCake('');
    setSpecialNotes('');
    setIsSubmitted(false);
    setSubmittedOrder(null);
    setErrors({});
  };

  return (
    <section id="custom-order" className="py-16 sm:py-24 bg-[#FFF8F6] border-t border-b border-[#EADBCE] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE9E2] text-[#9D3E1A] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D96B43]" />
            <span>Bespoke Celebration Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C1810] tracking-tight">
            Order a Custom Celebration Cake
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037]">
            Birthdays, anniversaries, or intimate gatherings. Fill out the details below and we&rsquo;ll assemble your WhatsApp message directly to our pastry team.
          </p>
        </div>

        {/* Thank You State or Form */}
        {isSubmitted && submittedOrder ? (
          <div className="bg-white rounded-3xl border-2 border-[#588157]/40 p-6 sm:p-10 shadow-lg text-center animate-fadeIn space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#588157]/15 text-[#588157] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#588157]">
                Order In Progress
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C1810]">
                Thank You, {submittedOrder.name}!
              </h3>
              <p className="text-sm text-[#5D4037] max-w-lg mx-auto">
                Your custom cake request has been opened in WhatsApp. If it didn&rsquo;t open automatically, you can tap the button below.
              </p>
            </div>

            {/* Order Summary Card */}
            <div className="bg-[#FDFBF7] rounded-2xl border border-[#EADBCE] p-5 text-left max-w-md mx-auto space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-[#EADBCE] pb-2">
                <span className="text-[#5D4037]">Flavour:</span>
                <span className="font-semibold text-[#2C1810]">{submittedOrder.flavour}</span>
              </div>
              <div className="flex justify-between border-b border-[#EADBCE] pb-2">
                <span className="text-[#5D4037]">Size:</span>
                <span className="font-semibold text-[#2C1810]">{submittedOrder.size}</span>
              </div>
              <div className="flex justify-between border-b border-[#EADBCE] pb-2">
                <span className="text-[#5D4037]">Dietary:</span>
                <span className="font-semibold text-[#2C1810]">{submittedOrder.dietary}</span>
              </div>
              <div className="flex justify-between border-b border-[#EADBCE] pb-2">
                <span className="text-[#5D4037]">Date Needed:</span>
                <span className="font-semibold text-[#2C1810]">{submittedOrder.deliveryDate}</span>
              </div>
              <div className="flex justify-between border-b border-[#EADBCE] pb-2">
                <span className="text-[#5D4037]">Contact Phone:</span>
                <span className="font-semibold text-[#2C1810]">{submittedOrder.phone}</span>
              </div>
              {submittedOrder.messageOnCake && (
                <div className="pt-1">
                  <span className="text-[#5D4037] block">Message on Cake:</span>
                  <span className="font-serif italic font-semibold text-[#9D3E1A] mt-0.5 block">
                    &ldquo;{submittedOrder.messageOnCake}&rdquo;
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={generateCustomCakeWhatsAppUrl(submittedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#588157] text-white font-semibold text-sm hover:bg-[#486b47] flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reopen WhatsApp Chat</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F7F3EB] text-[#2C1810] border border-[#EADBCE] font-semibold text-sm hover:bg-[#EADBCE] flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Customize Another Cake</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl border border-[#EADBCE] p-6 sm:p-10 shadow-sm space-y-6"
          >
            {/* Name & Phone (Required validation) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                  Your Full Name <span className="text-[#BC4749]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A726A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Radhika Sharma"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm bg-[#FDFBF7] border rounded-xl text-[#2C1810] placeholder-[#8A726A] focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-[#BC4749] focus:ring-[#BC4749]/20'
                        : 'border-[#EADBCE] focus:border-[#D96B43] focus:ring-[#D96B43]/20'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-[#BC4749] font-medium">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                  Phone Number (WhatsApp) <span className="text-[#BC4749]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8A726A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="e.g. 9876543210"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm bg-[#FDFBF7] border rounded-xl text-[#2C1810] placeholder-[#8A726A] focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-[#BC4749] focus:ring-[#BC4749]/20'
                        : 'border-[#EADBCE] focus:border-[#D96B43] focus:ring-[#D96B43]/20'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#BC4749] font-medium">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Cake Flavour & Cake Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                  Select Cake Flavour
                </label>
                <select
                  value={flavour}
                  onChange={(e) => setFlavour(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FDFBF7] border border-[#EADBCE] rounded-xl text-[#2C1810] focus:outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/20 transition-all font-medium"
                >
                  {CAKE_FLAVOURS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                  Cake Size &amp; Weight
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FDFBF7] border border-[#EADBCE] rounded-xl text-[#2C1810] focus:outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/20 transition-all font-medium"
                >
                  {CAKE_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dietary Preference & Delivery Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                  Dietary Preference
                </label>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDietary('Eggless')}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      dietary === 'Eggless'
                        ? 'bg-[#588157] text-white border-[#588157] shadow-xs'
                        : 'bg-[#FDFBF7] text-[#5D4037] border-[#EADBCE] hover:border-[#588157]'
                    }`}
                  >
                    🌱 100% Eggless
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietary('Contains Egg')}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      dietary === 'Contains Egg'
                        ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-xs'
                        : 'bg-[#FDFBF7] text-[#5D4037] border-[#EADBCE] hover:border-[#2C1810]'
                    }`}
                  >
                    🥚 Traditional (With Egg)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                  Date Needed
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8A726A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FDFBF7] border border-[#EADBCE] rounded-xl text-[#2C1810] focus:outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/20 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Message on Cake */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                Message Written on Cake (Piped in chocolate/buttercream)
              </label>
              <input
                type="text"
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
                placeholder="e.g. Happy 30th Birthday Rahul! ✨"
                className="w-full px-4 py-2.5 text-sm bg-[#FDFBF7] border border-[#EADBCE] rounded-xl text-[#2C1810] placeholder-[#8A726A] focus:outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/20 transition-all"
              />
              <span className="text-[11px] text-[#8A726A] mt-1 block">
                Leave blank if you prefer a minimalist, botanical, or fruit-topped finish.
              </span>
            </div>

            {/* Special Requests / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C1810] mb-1.5">
                Special Requests or Theme Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Nut allergies, pastel colour palette, deliver before 6 PM, topper inquiry..."
                className="w-full px-4 py-2.5 text-sm bg-[#FDFBF7] border border-[#EADBCE] rounded-xl text-[#2C1810] placeholder-[#8A726A] focus:outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#D96B43] hover:bg-[#C85A32] text-white text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Submit &amp; Order on WhatsApp</span>
              </button>
              <p className="text-center text-xs text-[#8A726A] mt-2.5">
                Takes you straight to WhatsApp with your customized order draft. No payment collected until confirmed.
              </p>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};

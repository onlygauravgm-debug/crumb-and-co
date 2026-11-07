import { CartItem, CustomCakeOrder, MenuItem } from '../types';
import { WHATSAPP_NUMBER } from '../data/menu';

/**
 * Formats a currency string in Indian Rupees (₹)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats WhatsApp message for a full cart order
 */
export function generateCartWhatsAppUrl(
  cart: CartItem[],
  customerNote?: string,
  deliveryMethod: 'pickup' | 'delivery' = 'delivery'
): string {
  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  let message = `*✨ New Order from Crumb & Co. Website*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `*Order Items:*\n`;

  cart.forEach((cartItem, index) => {
    const itemTotal = cartItem.item.price * cartItem.quantity;
    message += `${index + 1}. *${cartItem.item.name}*\n`;
    message += `   • Qty: ${cartItem.quantity} × ${formatINR(cartItem.item.price)} = *${formatINR(itemTotal)}*\n`;
    if (cartItem.item.weightOrQuantity) {
      message += `   • Size: ${cartItem.item.weightOrQuantity}\n`;
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Total Order Value:* ${formatINR(total)}\n`;
  message += `*Preference:* ${deliveryMethod === 'delivery' ? '🛵 Home Delivery' : '🛍️ Bakery Pickup'}\n`;

  if (customerNote && customerNote.trim()) {
    message += `*Customer Note:* ${customerNote.trim()}\n`;
  }

  message += `\nHello! I would like to confirm this order. Please let me know the availability, earliest delivery slot, and payment details. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats WhatsApp message for a single item direct order
 */
export function generateSingleItemWhatsAppUrl(item: MenuItem): string {
  let message = `*✨ Inquiry / Quick Order from Crumb & Co.*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `I would like to order:\n`;
  message += `*${item.name}*\n`;
  message += `• Price: ${formatINR(item.price)}\n`;
  if (item.weightOrQuantity) {
    message += `• Size/Portion: ${item.weightOrQuantity}\n`;
  }
  message += `\nPlease let me know if this is available for today / pre-order. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats WhatsApp message for a custom cake order form
 */
export function generateCustomCakeWhatsAppUrl(order: CustomCakeOrder): string {
  let message = `*🎂 Custom Celebration Cake Request - Crumb & Co.*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Customer Name:* ${order.name}\n`;
  message += `*Contact Phone:* ${order.phone}\n`;
  message += `*Cake Flavour:* ${order.flavour}\n`;
  message += `*Size / Weight:* ${order.size}\n`;
  message += `*Dietary Preference:* ${order.dietary}\n`;

  if (order.messageOnCake && order.messageOnCake.trim()) {
    message += `*Message on Cake:* "${order.messageOnCake.trim()}"\n`;
  } else {
    message += `*Message on Cake:* None (Blank / Minimalist)\n`;
  }

  message += `*Required Date:* ${order.deliveryDate}\n`;

  if (order.specialNotes && order.specialNotes.trim()) {
    message += `*Special Design / Dietary Notes:* ${order.specialNotes.trim()}\n`;
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Hi Crumb & Co. team, I just submitted this custom cake inquiry through your website. Looking forward to discussing the design and finalizing the booking!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

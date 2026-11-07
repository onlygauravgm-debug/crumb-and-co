export type MenuCategory = 'All Bakes' | 'Signature Cakes' | 'Cookies & Breads';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Signature Cakes' | 'Cookies & Breads';
  description: string;
  price: number; // in INR (₹)
  tags: string[];
  image: string;
  badge?: string;
  weightOrQuantity?: string;
  isBestseller?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface CustomCakeOrder {
  name: string;
  phone: string;
  flavour: string;
  size: string;
  messageOnCake: string;
  deliveryDate: string;
  dietary: 'Eggless' | 'Contains Egg';
  specialNotes?: string;
}

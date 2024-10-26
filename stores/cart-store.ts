import { create } from 'zustand';
import { PRODUCTS } from '../assets/products';

export type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  getTotalPrice: () => string;
  getItemsCount: () => number;
  getItemQuantity: (id: number) => number;
};

const initialItems: CartItemType[] = [];

export const useCartStore = create<CartState>((set, get) => ({
  items: initialItems,
  addItem: (item: CartItemType) => {
    // TODO: Implement max quantity check with real product data
    const product = PRODUCTS.find((p) => p.id === item.id);
    const existingItem = get().items.find((i) => i.id === item.id);

    if (
      product &&
      existingItem &&
      existingItem.quantity >= product.maxQuantity
    ) {
      return;
    }

    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) => {
          if (i.id === item.id) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        }),
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...item }],
      }));
    }
  },
  removeItem: (id: number) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },
  incrementItem: (id: number) => {
    // TODO: Implement max quantity check with real product data
    const product = PRODUCTS.find((p) => p.id === id);
    const item = get().items.find((i) => i.id === id);
    if (item && product) {
      const maxQuantity = product.maxQuantity;
      const itemQuantity = item.quantity;
      if (itemQuantity >= maxQuantity) {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === id) {
              return { ...i, quantity: maxQuantity };
            }
            return i;
          }),
        }));
      }
    } else {
      set((state) => ({
        items: state.items.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        }),
      }));
    }
  },
  decrementItem: (id: number) => {
    set((state) => ({
      items: state.items.map((i) => {
        if (i.id === id) {
          if (i.quantity === 1) {
            return i;
          }
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      }),
    }));
  },
  getTotalPrice: () => {
    return get()
      .items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  },
  getItemsCount: () =>
    get().items.reduce((acc, item) => acc + item.quantity, 0),
  getItemQuantity: (id: number) => {
    const item = get().items.find((i) => i.id === id);
    return item ? item.quantity : 1;
  },
}));

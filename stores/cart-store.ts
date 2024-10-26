import { create } from 'zustand';

type CartItemType = {
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
};

const initialItems: CartItemType[] = [];

export const useCartStore = create<CartState>((set, get) => ({
  items: initialItems,
  addItem: (item: CartItemType) => {
    const existingItem = get().items.find((i) => i.id === item.id);
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
        items: [...state.items, { ...item, quantity: 1 }],
      }));
    }
  },
  removeItem: (id: number) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },
  incrementItem: (id: number) => {
    set((state) => ({
      items: state.items.map((i) => {
        if (i.id === id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      }),
    }));
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
}));

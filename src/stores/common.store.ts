import { create } from "zustand";

type State = {
  count: number;
  tokenAccess: string;
  reFreshToken: string;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

export const useCountStore = create<State & Actions>((set) => ({
  count: 100,
  tokenAccess: "",
  reFreshToken: "",
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
        }
      }
      return { items: [...state.items, item] }
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ items: [] }),
}))
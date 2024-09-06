import { List } from 'postcss/lib/list';
import {create } from 'zustand';

interface ListRestaurantModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useListRestaurantModal = create<ListRestaurantModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}), 
}))

export default useListRestaurantModal;
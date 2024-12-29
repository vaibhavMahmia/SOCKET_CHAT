import { create } from 'zustand';

const useSideBarUser = create((set) => ({
    conversations: [],
    setConversations: (conversations) => set({ conversations })
}));

export default useSideBarUser;
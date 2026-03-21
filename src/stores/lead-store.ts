import { create } from "zustand";

interface LeadStoreState {
    isOpen: boolean;
    service: string;
    openLead: (service?: string) => void;
    closeLead: () => void;
}

export const useLeadStore = create<LeadStoreState>((set) => ({
    isOpen: false,
    service: "",
    openLead: (service = "General Consultation") => set({ isOpen: true, service }),
    closeLead: () => set({ isOpen: false, service: "" }),
}));

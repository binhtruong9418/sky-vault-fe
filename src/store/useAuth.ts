import {create} from "zustand/react";
import type {User} from "@/types";

interface AuthState {
    user: User | null;
    isLoading: boolean;

    // actions
    fetchUser: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

const useAuth = create<AuthState>((set) => ({
    user: null,
    isLoading: false,

    fetchUser: async () => {
        set({isLoading: true});
        try {
            // Fetch user data from the API
            const user = {id: 1, email: "abc@gmail.com", name: "John Doe"};
            set({user});
        } catch {
            // Handle error
            set({user: null});
        } finally {
            set({isLoading: false});
        }
    },

    setUser: (user) => set({user}),

    clearUser: () => set({user: null, isLoading: false}),
}))

export default useAuth;
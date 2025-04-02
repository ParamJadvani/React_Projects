import { User } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    users: User[]; // Renamed from `user` to `users` to avoid confusion
    currentUser: User | null; // Renamed `loginUser` to `currentUser` to better reflect its purpose
    addToUser: (newData: User) => void;
    updateUserData: (id: string, updateData: User) => void;
    removeFromUser: (id: string) => void;
    initializeUser: (data: User[]) => void;
    loginUser: (user: User | null) => void;
    logoutUser: () => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            users: [], // Renamed `user` to `users` to reflect that this holds multiple users
            currentUser: null, // Start with `null` to represent no logged-in user
            addToUser: (newData: User) => {
                set((state) => ({
                    users: [...state.users, newData],
                }));
            },
            updateUserData: (id: string, updateData: User) => {
                set((state) => ({
                    users: state.users.map((item) =>
                        item.id?.toString() === id ? updateData : item
                    ),
                }));
            },
            removeFromUser: (id: string) => {
                set((state) => ({
                    users: state.users.filter((item) => item.id?.toString() !== id),
                }));
            },
            initializeUser: (data: User[]) => {
                set(() => ({
                    users: data,
                }));
            },
            loginUser: async (user) => {
                if (user) {
                    set({ currentUser: user });
                    return true;
                }
                return false;
            },
            logoutUser: () => set({ currentUser: null }),
        }),
        {
            name: "userStore", // Name for persisted storage
        }
    )
);

export default useUserStore;

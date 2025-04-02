import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Review {
    rating: number;
    message: string;
}

interface WatchLaterMovie {
    id: number;
    status: "pending" | "watched";
    review?: Review;
}

interface WatchLaterStore {
    watchLater: WatchLaterMovie[];
    addMovie: (id: number) => void;
    updateStatus: (id: number, status: "pending" | "watched", review?: Review) => void;
    removeMovie: (id: number) => void;
}

export const useWatchLaterStore = create<WatchLaterStore>()(
    devtools(
        persist(
            (set) => ({
                watchLater: [],
                addMovie: (id: number) =>
                    set((state) => {
                        const movieExists = state.watchLater.some((movie) => movie.id === id);
                        if (movieExists) return state;
                        return {
                            watchLater: [...state.watchLater, { id, status: "pending" }],
                        };
                    }),
                updateStatus: (id, status, review) =>
                    set((state) => ({
                        watchLater: state.watchLater.map((movie) =>
                            movie.id === id ? { ...movie, status, review } : movie
                        ),
                    })),
                removeMovie: (id: number) =>
                    set((state) => ({
                        watchLater: state.watchLater.filter((movie) => movie.id !== id),
                    })),
            }),
            { name: "watchLaterStore" }
        )
    )
);

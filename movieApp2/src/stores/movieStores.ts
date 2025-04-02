import { create } from "zustand";
import { Movie } from "../types";
import { devtools, persist } from "zustand/middleware";

interface MovieStore {
    movies: Movie[];
    filter: "recent" | "upcoming" | "search";
    searchTerm: string;
    currentPageInStore: number;
    setMovies: (movies: Movie[]) => void;
    setFilter: (filter: "recent" | "upcoming" | "search") => void;
    setSearchValue: (term: string) => void;
    setCurrentPageInStore: (page: number) => void;
}

export const useMovieStore = create<MovieStore>()(
    devtools(
        persist(
            (set) => ({
                movies: [],
                currentPageInStore: 1,
                filter: "recent",
                searchTerm: "",
                setMovies: (movies) => set({ movies }),
                setFilter: (filter) => set({ filter }),
                setSearchValue: (term) => set({ searchTerm: term }),
                setCurrentPageInStore: (page) => set({ currentPageInStore: page }),
            }),
            { name: "movieStore" }
        )
    )
);

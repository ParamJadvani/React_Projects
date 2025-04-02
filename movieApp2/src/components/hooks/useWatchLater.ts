import { useState } from "react";
import { useWatchLaterStore } from "@/stores/watchLaterStore";
import { Movie } from "@/types";

export const useWatchLater = (movie: Movie) => {
    const { addMovie, removeMovie, watchLater } = useWatchLaterStore();
    const [isUpdated, setIsUpdated] = useState(false);

    const isAdded = watchLater?.find((m) => m.id === movie?.id);

    const addToWatchLater = () => {
        addMovie(movie.id);
        setIsUpdated(true);
    };

    const removeFromWatchLater = () => {
        removeMovie(movie.id);
        setIsUpdated(false);
    };

    return {
        isAdded,
        isUpdated,
        addToWatchLater,
        removeFromWatchLater,
    };
};

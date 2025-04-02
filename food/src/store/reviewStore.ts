import { Review } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReviewStore {
    reviews: Review[];
    addReview: (review: Review) => void;
    deleteReview: (id: string) => void;
    initializeReviews: (reviews: Review[]) => void;
}

const useReviewStore = create<ReviewStore>()(
    persist(
        (set) => ({
            reviews: [],
            addReview: (review: Review) =>
                set((state) => ({ reviews: [...state.reviews, review] })),
            deleteReview: (id: string) =>
                set((state) => ({ reviews: state.reviews.filter((review) => review.id !== id) })),
            initializeReviews: (reviews: Review[]) => set({ reviews }),
        }),
        {
            name: "reviews",
        }
    )
);

export default useReviewStore;

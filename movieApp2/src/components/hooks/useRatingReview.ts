import { useState } from "react";

export const useRatingReview = () => {
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");

    const handleStarClick = (value: number) => {
        if (value === rating) {
            setRating(0);
        } else {
            setRating(value);
        }
    };

    const resetRatingAndReview = () => {
        setRating(0);
        setReview("");
    };

    return {
        rating,
        review,
        setReview,
        handleStarClick,
        resetRatingAndReview,
    };
};

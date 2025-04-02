import React from "react";
import { IoMdStar } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

interface RatingReviewProps {
    rating: number;
    review: string;
    handleStarClick: (value: number) => void;
    setReview: (value: string) => void;
}

const RatingReview: React.FC<RatingReviewProps> = ({
    rating,
    review,
    handleStarClick,
    setReview,
}) => {
    return (
        <div className="mt-4">
            <label className="block text-sm">Rating (1-5):</label>
            <div className="flex items-center justify-evenly flex-row gap-2 py-2">
                {Array(5)
                    .fill(false)
                    .map((_, index) => {
                        const starIndex = index + 1;
                        return starIndex <= rating ? (
                            <IoMdStar
                                className="cursor-pointer text-yellow-400"
                                key={starIndex}
                                size={20}
                                onClick={() => handleStarClick(starIndex)}
                            />
                        ) : (
                            <FaRegStar
                                className="cursor-pointer text-gray-400"
                                key={starIndex}
                                size={20}
                                onClick={() => handleStarClick(starIndex)}
                            />
                        );
                    })}
            </div>

            <label className="block text-sm mt-2">Review:</label>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border p-2 rounded w-full"
            />
        </div>
    );
};

export default RatingReview;

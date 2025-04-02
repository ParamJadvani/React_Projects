import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MdPlaylistAdd, MdPlaylistAddCheck, MdStarBorder } from "react-icons/md";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import RatingReview from "@/components/RatingReview";
import { Movie } from "@/types";
import { useWatchLater } from "@/components/hooks/useWatchLater";
import { useRatingReview } from "@/components/hooks/useRatingReview";
import { useWatchLaterStore } from "@/stores/watchLaterStore";
import { IoMdStar } from "react-icons/io";
import dummyImage from "/src/assets/images (1).png";

interface MovieCardProps {
    movie: Movie;
    isWatchLater?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isWatchLater = false }) => {
    const { isAdded, addToWatchLater, removeFromWatchLater } = useWatchLater(movie);
    const { rating, review, handleStarClick, setReview } = useRatingReview();
    const { updateStatus } = useWatchLaterStore();

    const handleComplete = () => {
        if (rating && review.trim()) {
            updateStatus(movie.id, "watched", { rating, message: review });
        } else {
            alert("Please provide a rating and review.");
        }
    };

    return (
        <div className="bg-white border-2 rounded-xl p-4 shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col gap-3 justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <Link to={`/movie/${movie.id}`} className="group">
                <img
                    src={
                        movie.poster_path || movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${
                                  movie.poster_path || movie.backdrop_path
                              }`
                            : dummyImage
                    }
                    alt={movie.title}
                    className="w-full h-60 object-cover rounded-lg sm:h-80 lg:h-96 xl:h-90 transition-transform duration-300 group-hover:scale-105"
                    width={100}
                />

                <h3 className="mt-2 font-bold text-lg sm:text-xl md:text-2xl text-center text-gray-800 group-hover:text-blue-500 transition-colors duration-200">
                    {movie.title}
                </h3>
            </Link>
            <p className="text-sm text-gray-500 text-center sm:text-base">
                Release Date: {movie.release_date}
            </p>

            {movie.status !== "watched" && !isWatchLater && (
                <Button
                    variant="outline"
                    className="cursor-pointer mt-3 w-full sm:w-auto mx-auto transition-colors duration-200 hover:bg-red-500 hover:text-white"
                    disabled={!!isAdded}
                    onClick={addToWatchLater}
                >
                    {isAdded ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />}
                    {isAdded ? `Added` : `Add to Watch Later`}
                </Button>
            )}

            {movie.status === "watched" ? (
                <div>
                    <div className="flex items-center space-x-2 mb-3">
                        {/* Rating */}
                        <p className="text-xl text-yellow-500 font-semibold">
                            {movie.review?.rating ?? 0}
                        </p>
                        <div className="flex">
                            {Array(5)
                                .fill(false)
                                .map((_, index) => {
                                    const starIndex = index + 1;
                                    return starIndex <= (movie.review?.rating || 0) ? (
                                        <IoMdStar
                                            className="cursor-pointer text-yellow-400 hover:text-yellow-500 transition-colors"
                                            key={starIndex}
                                            size={24}
                                        />
                                    ) : (
                                        <MdStarBorder
                                            className="cursor-pointer text-gray-400 hover:text-yellow-400 transition-colors"
                                            key={starIndex}
                                            size={24}
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    {/* Review Message */}
                    <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-md">
                        <p className="text-lg italic text-gray-800">
                            {movie.review?.message || "No review provided."}
                        </p>
                    </div>
                </div>
            ) : (
                isWatchLater && (
                    <div className="mt-3 space-y-3">
                        <Button
                            variant="outline"
                            className="w-full transition-colors duration-200 hover:bg-red-500 hover:text-white"
                            onClick={removeFromWatchLater}
                        >
                            Remove from Watch Later
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full transition-colors duration-200 hover:bg-blue-500 hover:text-white"
                                >
                                    Complete Movie
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Complete Movie</DialogTitle>
                                    <DialogDescription>
                                        Provide a rating and review to mark the movie as watched.
                                    </DialogDescription>
                                </DialogHeader>

                                <RatingReview
                                    rating={rating}
                                    review={review}
                                    handleStarClick={handleStarClick}
                                    setReview={setReview}
                                />

                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        className="w-1/2 mt-3 transition-colors duration-200 hover:bg-green-500 hover:text-white"
                                        onClick={handleComplete}
                                    >
                                        Submit Review
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="w-1/2 mt-3">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            )}
        </div>
    );
};

export default MovieCard;

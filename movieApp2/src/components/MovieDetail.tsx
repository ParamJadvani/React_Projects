import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieById } from "../api/movieApi";
import { Movie } from "../types";
import { useWatchLater } from "@/components/hooks/useWatchLater";
import { useRatingReview } from "@/components/hooks/useRatingReview";
import RatingReview from "@/components/RatingReview";
import { Button } from "@/components/ui/button";
import { MdPlaylistAdd, MdStarBorder } from "react-icons/md";
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
import { IoArrowBack } from "react-icons/io5";
import { useWatchLaterStore } from "@/stores/watchLaterStore";
import { IoMdStar } from "react-icons/io";

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const navigate = useNavigate();
    const { isAdded, addToWatchLater, removeFromWatchLater } = useWatchLater(movie!);
    const { rating, review, handleStarClick, setReview } = useRatingReview();
    const { updateStatus } = useWatchLaterStore();

    useEffect(() => {
        const getMovie = async () => {
            if (id) {
                const data = await fetchMovieById(id);
                setMovie(data);
            }
        };
        getMovie();
    }, [id]);

    const handleComplete = () => {
        if (rating && review.trim()) {
            updateStatus(movie!.id, "watched", { rating, message: review });
        } else {
            alert("Please provide a rating and review.");
        }
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container mx-auto my-4 p-4">
            <div className="flex items-center space-x-2 my-4 p-4 bg-gray-100/50 rounded-md">
                <IoArrowBack size={25} className="cursor-pointer" onClick={() => navigate(-1)} />
                <h3 className="text-3xl font-bold ml-4">Movie Detail</h3>
            </div>
            <div className="flex flex-col md:flex-row">
                <img
                    src={`https://image.tmdb.org/t/p/w500${
                        movie.poster_path || movie.backdrop_path
                    }`}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded h-64 md:h-80 object-contain transition-all duration-300 ease-in-out hover:scale-110"
                />
                <div className="md:ml-4 flex-1">
                    <h2 className="text-3xl font-bold">{movie.title}</h2>
                    <p className="my-4">{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>

                    {isAdded?.status !== "watched" && !isAdded && (
                        <Button
                            variant="outline"
                            className="cursor-pointer mt-3 w-full sm:w-auto mx-auto"
                            onClick={addToWatchLater}
                        >
                            <MdPlaylistAdd />
                            Add to Watch Later
                        </Button>
                    )}

                    {isAdded?.status === "watched" ? (
                        <div>
                            <div className="flex items-center space-x-2">
                                {/* Rating */}
                                <p className="text-xl text-yellow-500 font-semibold">
                                    {isAdded.review?.rating ?? 0}{" "}
                                    {/* Default to 0 if rating is not available */}
                                </p>
                                <div className="flex">
                                    {Array(5)
                                        .fill(false)
                                        .map((_, index) => {
                                            const starIndex = index + 1;
                                            return starIndex <= (isAdded.review?.rating || 0) ? (
                                                <IoMdStar
                                                    className="cursor-pointer text-yellow-400"
                                                    key={starIndex}
                                                    size={20}
                                                />
                                            ) : (
                                                <MdStarBorder
                                                    className="cursor-pointer text-gray-400"
                                                    key={starIndex}
                                                    size={20}
                                                />
                                            );
                                        })}
                                </div>
                            </div>

                            {/* Review Message */}
                            <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-md">
                                <p className="text-lg italic text-gray-800">
                                    {isAdded.review?.message || "No review provided."}{" "}
                                    {/* Default message if no review */}
                                </p>
                            </div>
                        </div>
                    ) : (
                        isAdded && (
                            <div className="mt-3 space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={removeFromWatchLater}
                                >
                                    Remove from Watch Later
                                </Button>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            Complete Movie
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Complete Movie</DialogTitle>
                                            <DialogDescription>
                                                Provide a rating and review to mark the movie as
                                                watched.
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
                                                className="w-1/2 mt-3"
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
            </div>
        </div>
    );
};

export default MovieDetail;

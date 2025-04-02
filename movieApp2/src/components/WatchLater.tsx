import { fetchMovieById } from "@/api/movieApi";
import MovieCard from "@/components/MovieCard";
import { useWatchLaterStore } from "@/stores/watchLaterStore";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const WatchLater = () => {
    const { watchLater } = useWatchLaterStore();
    const [movieData, setMovieData] = React.useState<any[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const getDataById = async () => {
            const moviesWithDetails = await Promise.all(
                watchLater.map(async (movie) => {
                    const data = await fetchMovieById(movie.id.toString());
                    return { ...data, ...movie };
                })
            );
            setMovieData(moviesWithDetails);
        };

        if (watchLater.length > 0) {
            getDataById();
        } else {
            setMovieData([]);
        }
    }, [watchLater]);

    // Empty state when no movies are in the Watch Later list
    if (watchLater.length === 0) {
        return (
            <div className="flex justify-center items-center w-full min-h-screen">
                <div className="flex justify-center items-center w-full flex-col text-center">
                    <div>
                        <IoArrowBack
                            size={25}
                            className="cursor-pointer mb-4"
                            style={{ display: "inline" }}
                            onClick={() => navigate(-1)}
                        />
                        <h3 className="text-3xl ml-2 font-bold text-gray-600 inline">
                            Your Watch Later list is empty
                        </h3>
                    </div>
                    <p className="mt-4 text-xl text-gray-400">
                        You don't have any movies saved to watch later.
                    </p>
                    <p
                        className="mt-2 text-lg text-blue-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Start exploring movies and add them to your list!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center space-x-2 my-4 p-4 bg-gray-100/50 rounded-md">
                <IoArrowBack size={25} className="cursor-pointer" onClick={() => navigate(-1)} />
                <h3 className="text-3xl font-bold ml-4">Watch Later</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movieData.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} isWatchLater={true} />
                ))}
            </div>
        </div>
    );
};

export default WatchLater;

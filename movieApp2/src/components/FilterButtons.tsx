import React from "react";
import { useMovieStore } from "../stores/movieStores";
import { Button } from "@/components/ui/button";
import { AiOutlineRight } from "react-icons/ai";
import { PiPlaylistBold } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { useWatchLaterStore } from "@/stores/watchLaterStore";
import { Link } from "react-router-dom";

type FilterButtonsProps = {
    text: "recent" | "upcoming";
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ text }) => {
    const { setFilter } = useMovieStore();
    const { watchLater } = useWatchLaterStore();

    return (
        <div className="bg-white flex justify-between items-center p-5 my-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div
                className="cursor-pointer w-1/2 flex flex-row items-center hover:bg-gray-100 transition-all rounded-md p-4"
                onClick={() => setFilter(text)}
            >
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-xl font-semibold text-gray-700">
                        {text === "recent" ? "Now Showing" : "Upcoming"}
                    </h3>
                    <Button
                        variant="link"
                        className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                    >
                        {text === "recent"
                            ? "Explore Recently Added Movies"
                            : "Explore Upcoming Movies"}{" "}
                        <AiOutlineRight className="inline" />
                    </Button>
                </div>
            </div>

            <Link
                className="relative flex items-center justify-center w-12 h-12 bg-white-100 rounded-full hover:bg-gray-200 transition-all ease-in-out duration-75 mr-4"
                to="/watchLater"
            >
                <PiPlaylistBold size={24} className="text-gray-700" />
                <Badge
                    className="absolute top-0 right-0 w-6 h-6 text-xs flex items-center justify-center rounded-full bg-red-500 text-white"
                    style={{ display: watchLater.length > 0 ? "block" : "none" }}
                >
                    {watchLater.length > 0 ? watchLater.length : ""}
                </Badge>
            </Link>
        </div>
    );
};

export default React.memo(FilterButtons);

import React, { useEffect, useState } from "react";
import { fetchLatestMovies, fetchUpcomingMovies, searchMovies } from "../api/movieApi";
import { useMovieStore } from "../stores/movieStores";
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";
import MovieCard from "./MovieCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import useQueryParams from "@/components/hooks/useQueryParams";

const MovieList: React.FC = () => {
    const {
        movies,
        setMovies,
        filter,
        searchTerm,
        setCurrentPageInStore,
        currentPageInStore,
        setFilter,
    } = useMovieStore();
    const [currentPage, setCurrentPage] = useState<number>(currentPageInStore || 1);
    const { queryParams, setQueryParam } = useQueryParams();

    // Effect to sync filter, page, and search term with URL query params
    useEffect(() => {
        const page = parseInt(queryParams.page || `${currentPageInStore}`, 10);
        setCurrentPage(page);
        setCurrentPageInStore(page);
    }, [queryParams, currentPageInStore, setCurrentPageInStore, setFilter]);

    // Fetch movie data based on the filter and search term
    useEffect(() => {
        const fetchData = async () => {
            let moviesData;
            if (filter === "recent") {
                moviesData = await fetchLatestMovies({ page: currentPage });
            } else if (filter === "upcoming") {
                moviesData = await fetchUpcomingMovies({ page: currentPage });
            } else if (filter === "search" && searchTerm.trim() !== "") {
                moviesData = await searchMovies(searchTerm, currentPage);
            }

            setMovies(moviesData || []);
        };

        fetchData();
    }, [filter, searchTerm, currentPage, setMovies]);

    const oppositeFilter = filter === "recent" ? "upcoming" : "recent";

    const handlePageChange = (newPage: number) => {
        if (newPage > 0) {
            setCurrentPage(newPage);
            setCurrentPageInStore(newPage);
            setQueryParam("page", newPage.toString());
        }
    };

    if (movies.length === 0) {
        return (
            <div className="container mx-auto p-4 bg-gradient-to-t from-gray-50 via-gray-100 to-white rounded-lg shadow-xl">
                <SearchBar /> {/* Show SearchBar */}
                <h2>No Movies Found.</h2> {/* Show No Movies Found message */}
                <Pagination className="mt-6 flex justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={
                                    currentPage > 1
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed opacity-50"
                                }
                            >
                                Previous
                            </PaginationPrevious>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink
                                isActive={true}
                                onClick={() => handlePageChange(currentPage)}
                            >
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext className="cursor-not-allowed opacity-50" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        );
    }

    // If movies are found, display the list of movie cards
    return (
        <div className="container mx-auto p-4 bg-gradient-to-t from-gray-50 via-gray-100 to-white rounded-lg shadow-xl">
            <SearchBar />
            <FilterButtons text={oppositeFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.length > 0 &&
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>

            <Pagination className="mt-6 flex justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={
                                currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                            }
                        >
                            Previous
                        </PaginationPrevious>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            isActive={true}
                            onClick={() => handlePageChange(currentPage)}
                        >
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default MovieList;

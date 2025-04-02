import React, { useState, useEffect, useCallback } from "react";
import { useMovieStore } from "../stores/movieStores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import useQueryParams from "@/components/hooks/useQueryParams";

const SearchBar: React.FC = () => {
    const { setSearchValue, setFilter } = useMovieStore();
    const [input, setInput] = useState<string>("");
    const { queryParams, setQueryParam, removeQueryParam } = useQueryParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Sync input with the 'search' query param in the URL
    useEffect(() => {
        const searchValue = queryParams.search || "";
        setInput(searchValue);
    }, [queryParams]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const updateQueryParams = useCallback(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", "1");

        if (input.trim()) {
            queryParams.set("search", input); // Add the search query param if input is not empty
        }

        // Programmatically update the URL with the correct query parameters
        navigate({
            pathname: location.pathname,
            search: queryParams.toString(),
        });
    }, [input, location.pathname, navigate]);

    useEffect(() => {
        // Debounce the input to avoid too many re-renders
        const handler = setTimeout(() => {
            if (input.trim() === "") {
                setFilter("recent");
                removeQueryParam("search"); // Clear the search query param if input is empty
            } else {
                setFilter("search");
                setSearchValue(input);
                setQueryParam("search", input); // Update the search query param
                updateQueryParams();
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [input, removeQueryParam, setQueryParam, setFilter, setSearchValue, updateQueryParams]);

    const handleSearch = () => {
        if (input.trim() === "") {
            setFilter("recent");
            removeQueryParam("search");
        } else {
            setSearchValue(input);
            setFilter("search");
            setQueryParam("search", input); // Update the search param
        }

        // Update the query parameters with page=1 and search (if available)
        updateQueryParams();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center space-x-4 my-6 p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Input
                type="text"
                value={input}
                onChange={onChange}
                onKeyDown={handleKeyDown} // Add the event listener for Enter key
                placeholder="Search movies..."
                className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <Button
                onClick={handleSearch}
                variant="default"
                className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-all rounded-md p-3"
            >
                Search
            </Button>
        </div>
    );
};

export default React.memo(SearchBar);

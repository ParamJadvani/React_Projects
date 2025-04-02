import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type QueryParams = Record<string, string>;

const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState<QueryParams>({});

    // Update query params from the URL on mount and whenever location changes
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const params: QueryParams = {};
        urlParams.forEach((value, key) => {
            params[key] = value;
        });
        setQueryParams(params);
    }, [location.search]);

    // Utility function to merge new params into the existing ones
    const setQueryParam = (key: string, value: string) => {
        const updatedParams = { ...queryParams, [key]: value };
        const searchParams = new URLSearchParams(updatedParams);

        navigate(
            {
                pathname: location.pathname,
                search: searchParams.toString(),
            },
            { replace: true } // Use 'replace' to not add a new entry in the history
        );
    };

    // Utility function to remove a specific query param
    const removeQueryParam = (key: string) => {
        const updatedParams = { ...queryParams };
        delete updatedParams[key];
        const searchParams = new URLSearchParams(updatedParams);

        navigate(
            {
                pathname: location.pathname,
                search: searchParams.toString(),
            },
            { replace: true }
        );
    };

    return {
        queryParams,
        setQueryParam,
        removeQueryParam,
    };
};

export default useQueryParams;

import { Movie } from "../types";
import axios from "axios";

const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDBiMmFlZDlmZGEyYzRkYzFkN2Q3ZDAzNWU0N2ViZCIsIm5iZiI6MTc0MzE1ODY0NS41ODIsInN1YiI6IjY3ZTY3ZDc1YjhmYzM5ODk5NjEwY2RkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DWJOuTtV3RgSlvebjKvQrgsvg24_7r8ClBwSk3Ep0C0";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
});

export const fetchLatestMovies = async ({ page }: { page?: number }): Promise<Movie[]> => {
    const response = await api.get(`${BASE_URL}/movie/now_playing?language=en-US&page=${page}`);
    const data = response.data;
    return data.results;
};

export const fetchUpcomingMovies = async ({ page }: { page?: number }): Promise<Movie[]> => {
    const response = await api.get(`${BASE_URL}/movie/upcoming?language=en-US&page=${page}`);
    const data = response.data;
    return data.results;
};

export const searchMovies = async (query: string, page?: number): Promise<Movie[]> => {
    const response = await api.get(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(
            query
        )}&include_adult=false&language=en-US&page=${page}`
    );
    const data = response.data;
    return data.results;
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
    const response = await api.get(`${BASE_URL}/movie/${id}`);
    const data = response.data;
    return data;
};

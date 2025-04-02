import { Review } from "@/Types";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/reviews",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchReviewsAPI = async (): Promise<Review[]> => {
    const response = await api.get("/");
    const data = response.data;
    return data;
};

export const fetchReviewByQueryAPI = async (query: string): Promise<Review[]> => {
    const response = await api.get(`/?${query}`);
    const data = response.data;
    return data;
};

export const addReviewAPI = async (review: Review): Promise<Review> => {
    const response = await api.post("/", review);
    const data = response.data;
    return data;
};

export const deleteReviewAPI = async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
};

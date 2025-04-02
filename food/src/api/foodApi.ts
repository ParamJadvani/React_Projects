import axios from "axios";
import { Food } from "../Types";

const api = axios.create({
    baseURL: "http://localhost:3000/food",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchFoodsAPI = async (): Promise<Food[]> => {
    const response = await api.get("/");
    const data = response.data;
    return data;
};

export const addFoodAPI = async (food: Food): Promise<Food> => {
    const response = await api.post("/", food);
    const data = response.data;
    return data;
};

export const updateFoodAPI = async (id: number, food: Food): Promise<Food> => {
    const response = await api.patch(`/${id}`, food);
    const data = response.data;
    return data;
};

export const deleteFoodAPI = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

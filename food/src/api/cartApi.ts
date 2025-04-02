import axios from "axios";
import { Cart } from "../Types";

const api = axios.create({
    baseURL: "http://localhost:3000/cart",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchCartListAPI = async (): Promise<Cart[] | undefined> => {
    try {
        const response = await api.get(`/`);
        const data = response.data;
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred while removing the item from the cart.");
        }
    }
};

export const fetchCartListByUserIdAPI = async (id: string): Promise<Cart[] | undefined> => {
    try {
        const response = await api.get(`?userId=${id}`);
        const data = response.data;
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Failed to remove item with id ${id} from cart: ${error.message}`);
        } else {
            console.error("An unknown error occurred while removing the item from the cart.");
        }
    }
};

export const addToCartAPI = async (newData: Cart): Promise<Cart> => {
    const response = await api.post("/", newData);
    const data = response.data;
    return data;
};

export const updateCartDataAPI = async (id: string, updateData: Cart): Promise<Cart> => {
    const response = await api.patch(`/${id}`, updateData);
    const data = response.data;
    return data;
};

export const removeFromCartAPI = async (id: string): Promise<void> => {
    try {
        await api.delete(`/${id}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Failed to remove item with id ${id} from cart: ${error.message}`);
        } else {
            console.error("An unknown error occurred while removing the item from the cart.");
        }
    }
};

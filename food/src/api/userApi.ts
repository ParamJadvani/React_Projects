import axios from "axios";
import { User } from "../Types";

const api = axios.create({
    baseURL: "http://localhost:3000/user",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchUserApi = async (): Promise<User[]> => {
    const response = await api.get("/");
    const data = response.data;
    return data;
};

export const fetchUserByIdApi = async (id: string): Promise<User | null> => {
    try {
        const response = await api.get(`/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        return null;
    }
};

export const addUserApi = async (user: User): Promise<User> => {
    const response = await api.post("/", user);
    const data = response.data;
    return data;
};

export const deleteUserApi = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

export const updateUserApi = async (id: number, user: User): Promise<User> => {
    const response = await api.patch(`/${id}`, user);
    const data = response.data;
    return data;
};

export const loginUserApi = async (email: string, password: string): Promise<User | null> => {
    try {
        const res = await api.get<User>(`/?email=${email}&password=${password}`);
        const user = res.data;
        return user;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

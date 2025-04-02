import { Food } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FoodStore {
    foods: Food[];
    addFood: (newData: Food) => void;
    updateFoodData: (id: string, updateData: Food) => void;
    removeFromFood: (id: string) => void;
    initializeFood: (data: Food[]) => void;
}

const useFoodStore = create<FoodStore>()(
    persist(
        (set) => ({
            foods: [],
            addFood: (newData: Food) => {
                set((state) => ({
                    foods: [...state.foods, newData],
                }));
            },
            updateFoodData: (id: string, updateData: Food) => {
                set((state) => ({
                    foods: state.foods.map((item) =>
                        item.id.toString() === id ? updateData : item
                    ),
                }));
            },
            removeFromFood: (id: string) => {
                set((state) => ({
                    foods: state.foods.filter((item) => item.id.toString() !== id),
                }));
            },
            initializeFood: (data) => {
                set(() => ({
                    foods: data,
                }));
            },
        }),
        {
            name: "foodStore",
        }
    )
);

export default useFoodStore;

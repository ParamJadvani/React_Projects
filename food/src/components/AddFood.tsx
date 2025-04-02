import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useFoodStore from "@/store/foodStore";
import { addFoodAPI } from "@/api/foodApi";

const AddFood = () => {
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        image: "",
    });

    const { addFood } = useFoodStore();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, price, image } = foodData;

        if (!name || !price || !image) {
            alert("All fields are required.");
            return;
        }

        // Call store action to add food (handles API interaction)
        const newFood = { ...foodData, price: Number(price), id: Date.now() };

        const addedFood = await addFoodAPI(newFood);
        if (addedFood) {
            addFood(addedFood);
        }
        setFoodData({ name: "", price: "", image: "" }); // Clear form after submit
    };

    return (
        <div className="p-4 border rounded-md max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-4">Add Food</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Enter Food Name"
                    name="name"
                    value={foodData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Enter Food Price"
                    name="price"
                    value={foodData.price}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="url"
                    placeholder="Enter Food Image URL"
                    name="image"
                    value={foodData.image}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Food
                </Button>
            </form>
        </div>
    );
};

// export default AddFood;

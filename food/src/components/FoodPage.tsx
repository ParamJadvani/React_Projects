import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LuClock4 } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import { Skaleton } from "./HomePageComponents/Skeleton";
import { Input } from "./ui/input";
import { Food } from "@/Types";
import { Button } from "./ui/button";
import { FaSortAmountDownAlt, FaSortAmountUp, FaCrown } from "react-icons/fa";
import useFoodStore from "@/store/foodStore";
import { fetchFoodsAPI } from "@/api/foodApi";

const FoodPage = () => {
    const { foods, addFood } = useFoodStore();

    const [search, setSearch] = React.useState<string>("");
    const [foodData, setFoodData] = React.useState<Food[]>([]);
    const [isLoad, setIsLoad] = React.useState<boolean>(true);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoad(false);
        }, 1000);
    }, []);

    React.useEffect(() => {
        const addFoodInStore = async () => {
            if (foods.length > 0) {
                setFoodData(foods);
            } else {
                const newFoods = await fetchFoodsAPI();
                newFoods.forEach((food) => addFood(food));
                setFoodData(newFoods);
            }
        };
        addFoodInStore();
    }, [foods, addFood]);

    // Search Function
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        if (query === "") {
            setFoodData(foods);
        } else {
            const filtered = foods.filter((food) => food.name.toLowerCase().includes(query));
            setFoodData(filtered);
        }
    };

    // Sorting Functions
    const sortLowToHigh = () => {
        const sorted = [...foodData].sort((a, b) => a.price - b.price);
        setFoodData(sorted);
    };

    const sortHighToLow = () => {
        const sorted = [...foodData].sort((a, b) => b.price - a.price);
        setFoodData(sorted);
    };

    const sortHighestRated = () => {
        const sorted = [...foodData].sort((a, b) => b.rating - a.rating);
        setFoodData(sorted);
    };

    return (
        <div className="p-4">
            {/* Search and Sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                {/* Search Bar */}
                <Input
                    type="text"
                    placeholder="Search Food..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full sm:w-1/3 border-gray-300"
                />

                {/* Sorting Buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                        onClick={sortLowToHigh}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <FaSortAmountDownAlt /> Low to High
                    </Button>
                    <Button
                        onClick={sortHighToLow}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <FaSortAmountUp /> High to Low
                    </Button>
                    <Button
                        onClick={sortHighestRated}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <FaCrown className="text-yellow-500" /> Highest Rated
                    </Button>
                </div>
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-5/6 mx-auto">
                {foodData.length > 0 ? (
                    foodData.map((food, index) => (
                        <Link to={`/food/${food.id}`} key={food.id ?? index}>
                            <Card className="cursor-pointer p-0">
                                <CardHeader className="text-center rounded-t-lg p-0 overflow-hidden relative">
                                    {isLoad ? (
                                        <Skaleton />
                                    ) : (
                                        <img
                                            src={food.image}
                                            alt={`Delicious ${food.name}`}
                                            className="w-full h-40 object-cover transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                                        />
                                    )}
                                    <div className="absolute w-full flex justify-between">
                                        <Badge variant="destructive" className="px-3 m-3">
                                            {food.cuisine}
                                        </Badge>
                                        <Badge variant="secondary" className="px-3 m-3">
                                            {food.difficulty}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3 px-3 pb-2">
                                    <CardTitle className="text-lg font-semibold">
                                        {food.name}
                                    </CardTitle>
                                    <div className="flex justify-between">
                                        <CardDescription className="text-gray-800 flex items-center gap-1 text-sm">
                                            <LuClock4 />{" "}
                                            {food.prepTimeMinutes + food.cookTimeMinutes} min
                                        </CardDescription>
                                        <CardDescription className="text-yellow-500 flex items-center gap-1 text-sm">
                                            <FaStar /> {food.rating}
                                        </CardDescription>
                                    </div>
                                    <CardDescription className="text-sm text-gray-800">
                                        Price: ₹{food.price}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-full">No foods found.</p>
                )}
            </div>
        </div>
    );
};

export default FoodPage;

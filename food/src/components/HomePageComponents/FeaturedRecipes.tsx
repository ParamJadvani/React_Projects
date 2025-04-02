import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Food } from "@/Types";
import { Badge } from "../ui/badge";
import { LuClock4 } from "react-icons/lu";
import { FaStar, FaCartPlus } from "react-icons/fa6";
import useFoodStore from "@/store/foodStore";
import useCartStore from "@/store/cartStore";
import { fetchFoodsAPI } from "@/api/foodApi";
import useUserStore from "@/store/userStore";

const FeaturedRecipes = () => {
    const { foods, initializeFood } = useFoodStore();
    const { addToCart } = useCartStore();

    // Fetch foods when the component mounts
    useEffect(() => {
        const fetchFoods = async () => {
            const res = await fetchFoodsAPI();
            initializeFood(res); // Populating the Zustand store with fetched foods
        };
        fetchFoods();
    }, [initializeFood]); // Correct dependency: initializeFood

    const { currentUser } = useUserStore();
    if (!currentUser) {
        console.warn("User ID is not available");
    }

    const addToCartData = (id: string, value: Food) => {
        if (!currentUser?.id) {
            alert("Please log in to add items to the cart");
            return;
        }

        const obj = { id, food: value, qty: 1, userId: currentUser.id.toString() };
        addToCart(obj);
    };

    return (
        <div className="m-2 box-border">
            <h1 className="text-2xl font-bold text-center my-5">Welcome to the Food App!</h1>

            {/* Food Cards */}
            <div className="flex flex-row overflow-x-auto gap-6 m-6 rounded-lg">
                {foods.slice(0, 6).map((food) => (
                    <Link to={`/food/${food.id}`} key={food.id}>
                        <Card className="w-[300px] max-w-[350px] cursor-pointer p-0 m-3">
                            <CardHeader className="text-center rounded-t-lg p-0 overflow-hidden relative">
                                <img
                                    src={food.image}
                                    alt={`Delicious ${food.name}`}
                                    className="w-full object-contain transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                                />
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
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold">
                                        {food.name}
                                    </CardTitle>
                                    <div className="hover:bg-green-200 p-1 rounded-sm border">
                                        <FaCartPlus
                                            onClick={() => addToCartData(food.id.toString(), food)}
                                            className="w-6 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <CardDescription className="text-gray-800 flex items-center gap-1 text-sm">
                                        <LuClock4 /> {food.prepTimeMinutes + food.cookTimeMinutes}{" "}
                                        min
                                    </CardDescription>
                                    <CardDescription className="text-yellow-500 flex items-center gap-1 text-sm">
                                        <FaStar /> {food.rating}
                                    </CardDescription>
                                    <CardDescription className="text-sm text-gray-800">
                                        Price: ₹{food.price}
                                    </CardDescription>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRecipes;

import useFoodStore from '@/store/foodStore';
import { Link } from "react-router-dom";

const Categories = () => {
    const { foods } = useFoodStore();

    // Flattening the food categories and ensuring uniqueness
    const data = new Set(foods.flatMap((food) => food.mealType ?? [])); // Make sure `mealType` is properly defined

    return (
        <div className="p-4 box-border">
            {/* Title */}
            <div className="flex flex-col justify-around text-center my-4">
                <h1 className="text-3xl font-bold text-center my-2 text-gray-800">
                    Explore Recipe Categories
                </h1>
                <p className="my-2 text-gray-600">
                    Discover recipes by category to find exactly what you're craving, from quick
                    breakfasts to elegant dinners.
                </p>
            </div>

            {/* Category Cards */}
            <div className="flex flex-wrap gap-6 justify-center">
                {Array.from(data).map((item, index) => (
                    <Link to={`/categories/${item}`} key={index}>
                        <div className="w-60 bg-gray-200 cursor-pointer p-6 rounded-xl transition-all duration-200 hover:scale-105 hover:bg-gray-100">
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                {item}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;

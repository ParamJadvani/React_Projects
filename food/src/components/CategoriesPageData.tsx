import useFoodStore from "@/store/foodStore";
import { Food } from "@/Types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoriesPageData = () => {
    const { foods } = useFoodStore();
    const { id } = useParams<{ id: string }>();

    // Ensure id is defined before filtering
    const filteredFoods = id
        ? foods.filter((food: Food) => food.mealType && food.mealType.includes(id))
        : [];

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            {/* Title */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Explore {id} Recipes</h1>
                <p className="text-lg text-gray-600">
                    Discover {id} recipes to satisfy your cravings with delicious and unique
                    flavors.
                </p>
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food: Food) => (
                        <div
                            key={food.id}
                            className="w-full bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
                        >
                            <img
                                src={food.image}
                                alt={food.name}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                                    {food.name}
                                </h2>
                                <p className="text-sm text-gray-600 mb-3 text-center">
                                    {food.ingredients.join(", ")}
                                </p>
                                <p className="text-lg font-bold text-center text-gray-900">
                                    {food.price} INR
                                </p>
                            </div>
                            <div className="text-center pb-4">
                                <Link
                                    to={`/food/${food.id}`}
                                    className="inline-block text-blue-500 font-medium hover:text-blue-600 transition-all"
                                >
                                    View Recipe
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-xl">
                        No recipes found for this category.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoriesPageData;

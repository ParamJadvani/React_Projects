import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Food } from "@/Types";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import useFoodStore from "@/store/foodStore";
import useCartStore from "@/store/cartStore";
import { fetchFoodsAPI } from "@/api/foodApi";
import useUserStore from "@/store/userStore";
import { addToCartAPI, fetchCartListAPI, updateCartDataAPI } from "@/api/cartApi";
import useReviewStore from "@/store/reviewStore";
import { addReviewAPI, fetchReviewByQueryAPI } from "@/api/reviewApi";
import { fetchUserByIdApi } from "@/api/userApi";

const FoodDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { addToCart, updateCartData, cart, initializeCart } = useCartStore();
    const { addFood } = useFoodStore();
    const { currentUser } = useUserStore();

    const [food, setFood] = useState<Food | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    // States for the review dialog
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [reviewRating, setReviewRating] = useState<number>(1);
    const [reviewMessage, setReviewMessage] = useState<string>("");

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [userReviews, setUserReviews] = useState<any[]>([]); // Change the type as needed

    const { addReview, initializeReviews } = useReviewStore();

    // Get the existing cart item if it exists
    const existingCartItem = cart.find((item) => item.food.id.toString() === id);

    useEffect(() => {
        const getDataFromCart = async () => {
            const data = await fetchCartListAPI();
            initializeCart(data ?? []);
        };
        getDataFromCart();
    }, []);

    // Fetch food details based on the `id`
    useEffect(() => {
        if (!id) return; // If id is undefined, exit the effect
        if (!currentUser) {
            return console.warn("User ID is not available");
        }

        const fetchFoodDetail = async () => {
            try {
                if (existingCartItem) {
                    setFood(existingCartItem.food);
                    setQuantity(existingCartItem.qty);
                } else {
                    const data = await fetchFoodsAPI();
                    const selectedFood = data.find((item) => item.id.toString() === id);
                    if (selectedFood) {
                        setFood(selectedFood);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch food details", error);
            }
        };

        fetchFoodDetail();
    }, [id, addFood, currentUser, existingCartItem]);

    // Handle quantity change
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!food) return;
        // Ensure the userId is defined
        if (!currentUser?.id) {
            alert("User is not logged in.");
            return;
        }

        if (existingCartItem) {
            // If the item exists in the cart, update the quantity
            updateCartDataAPI(existingCartItem.id ?? "", { ...existingCartItem, qty: quantity });
            updateCartData(existingCartItem.id ?? "", { ...existingCartItem, qty: quantity });
        } else {
            // If the item does not exist in the cart, add to the cart
            const newCartItem = await addToCartAPI({
                food,
                qty: quantity,
                userId: currentUser.id.toString(), // Ensure it's a valid string
            });
            addToCart(newCartItem);
        }
    };

    useEffect(() => {
        const fetchReviewData = async () => {
            if (currentUser?.id) {
                // Fetch reviews based on foodId
                const reviews = await fetchReviewByQueryAPI(`foodId=${id}`);
                initializeReviews(reviews);

                // Check if any review was made by the current user
                const hasReviewed = reviews.some(
                    (review) => review.userId === currentUser.id?.toString()
                );
                if (hasReviewed) {
                    setIsDisabled(true); // Disable the review button if user has already reviewed
                }

                // Fetch user reviews based on userId
                const userReviewPromises = reviews.map(async (review) => {
                    const userData = await fetchUserByIdApi(review.userId);
                    return { ...review, name: userData?.name ?? "Anonymous" };
                });

                const userReviewsData = await Promise.all(userReviewPromises);
                setUserReviews(userReviewsData);
            }
        };

        fetchReviewData();
    }, [id, currentUser?.id, initializeReviews]); // Add necessary dependencies

    // Open/Close review dialog
    const openReviewDialog = () => setIsDialogOpen(true);
    const closeReviewDialog = () => setIsDialogOpen(false);

    // Handle review submission
    const handleReviewSubmit = async () => {
        if (!currentUser?.id) {
            alert("User is not logged in. Please log in to submit a review.");
            return;
        }

        if (!reviewMessage || reviewRating < 1 || reviewRating > 5) {
            alert("Please provide a valid rating (1-5) and a message.");
            return;
        }

        const reviewData = {
            foodId: food?.id.toString() ?? "", // Ensure food id is properly converted to string
            userId: currentUser.id.toString(), // Ensure it's a valid string
            rating: reviewRating,
            review: reviewMessage,
        };

        try {
            const result = await addReviewAPI(reviewData);
            addReview(result);
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("There was an error submitting your review.");
        }

        closeReviewDialog();
    };

    return (
        <div className="w-5/6 m-auto">
            <Button
                className="border m-2 cursor-pointer"
                onClick={() => navigate(-1)}
                variant="ghost"
            >
                <FaArrowLeft />
                Back
            </Button>

            <div className="py-8">
                <div className="container-custom">
                    {food ? (
                        <div className="relative mb-8 bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                                <div className="p-6 lg:p-8 flex flex-col justify-center">
                                    <span className="inline-block px-3 py-1 rounded-full bg-red-300 text-xs font-medium mb-4">
                                        {food.mealType}
                                    </span>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                        {food.name}
                                    </h1>
                                    <ul className="grid grid-cols-2 gap-4 mb-4">
                                        {food.ingredients.map((ingredient, index) => (
                                            <li key={index} className="list-disc list-inside">
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1">
                                            <MdOutlineCurrencyRupee
                                                size={20}
                                                className="text-muted-foreground"
                                            />
                                            <span className="text-md">{food.price}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <FaStar />
                                            <span className="text-sm">{food.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 border rounded-lg p-2">
                                            <Button className="px-4" onClick={decreaseQuantity}>
                                                -
                                            </Button>
                                            <p className="text-lg font-semibold">{quantity}</p>
                                            <Button className="px-4" onClick={increaseQuantity}>
                                                +
                                            </Button>

                                            <Button
                                                className="bg-gray-300 hover:bg-gray-200 text-black cursor-pointer"
                                                onClick={handleAddToCart}
                                            >
                                                Add To Cart
                                            </Button>
                                        </div>
                                    </div>

                                    <Button
                                        className="mt-4"
                                        onClick={openReviewDialog}
                                        disabled={isDisabled}
                                    >
                                        Leave a Review
                                    </Button>
                                </div>

                                <div className="relative">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Food not found</p>
                        </div>
                    )}

                    {userReviews.length > 0 &&
                        userReviews.map((user, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm font-semibold mb-2">
                                    {user?.name ?? "Anonymous"}
                                </p>
                                <p className="text-sm">{user?.review}</p>
                                <p className="text-sm">Rating: {user?.rating}</p>
                            </div>
                        ))}
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Rating (1-5)</label>
                            <input
                                type="number"
                                value={reviewRating}
                                onChange={(e) => setReviewRating(Number(e.target.value))}
                                min="1"
                                max="5"
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Message</label>
                            <textarea
                                value={reviewMessage}
                                onChange={(e) => setReviewMessage(e.target.value)}
                                className="border p-2 w-full rounded"
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={closeReviewDialog} variant="outline">
                                Cancel
                            </Button>
                            <Button onClick={handleReviewSubmit} className="bg-blue-500 text-white">
                                Submit Review
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetail;

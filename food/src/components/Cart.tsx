import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Cart } from "@/Types"; // Import your Cart Type
import useCartStore from "@/store/cartStore";
import useUserStore from "@/store/userStore";
import { fetchCartListByUserIdAPI, removeFromCartAPI, updateCartDataAPI } from "@/api/cartApi";

const CartPage = () => {
    const { cart, initializeCart, removeFromCart, updateCartData } = useCartStore();
    const { currentUser } = useUserStore(); // Get logged-in user from your user store
    const [totalBill] = useState<number>(
        cart.reduce((total: number, item) => total + item.food.price * item.qty, 0)
    );

    // Initialize the cart when the component mounts and the user is logged in
    useEffect(() => {
        const loadCartData = async () => {
            if (currentUser?.id) {
                // Fetch cart data using the current user ID
                const cartAllData = await fetchCartListByUserIdAPI(currentUser.id?.toString());

                // Check if cart data exists and initialize it
                if (cartAllData) {
                    initializeCart(cartAllData); // Pass cartAllData directly, without wrapping it in an array
                }
            }
        };

        loadCartData();
    }, [currentUser, initializeCart]);

    const handleMinus = (ele: Cart) => {
        if (ele.qty <= 1) {
            alert("Quantity cannot be less than 1.");
            removeFromCartAPI(ele.id ?? ""); // Remove from cart if quantity is less than 1
            removeFromCart(ele.id ?? ""); // Remove from cart if quantity is 1
            return;
        }
        updateCartDataAPI(ele.id ?? "", { ...ele, qty: ele.qty - 1 });
        updateCartData(ele.id ?? "", { ...ele, qty: ele.qty - 1 });
    };

    const handlePlus = (ele: Cart) => {
        updateCartDataAPI(ele.id ?? "", { ...ele, qty: ele.qty + 1 });
        updateCartData(ele.id ?? "", { ...ele, qty: ele.qty + 1 });
    };

    const deleteDataFromCart = (ele: Cart) => {
        removeFromCartAPI(ele.id ?? "");
        removeFromCart(ele.id ?? "");
    };

    return (
        <div className="text-center">
            <h2>Cart List</h2>
            <div className="sm:flex sm:flex-row text-center">
                <div className="sm:w-10/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 rounded-lg">
                    {cart.length > 0 ? (
                        cart.map((ele, index: number) => (
                            <Card key={index}>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg font-semibold">
                                        {ele.food.name}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col items-center gap-2">
                                    <img
                                        src={ele.food.image}
                                        alt={`Delicious ${ele.food.name}`}
                                        className="w-36 h-36 rounded-md"
                                    />
                                    <CardDescription className="text-sm text-gray-600">
                                        Price: ₹{ele.food.price}
                                    </CardDescription>
                                </CardContent>

                                <CardFooter className="flex flex-col gap-2 justify-center">
                                    <div className="flex flex-row items-center gap-2 border rounded-2xl overflow-hidden">
                                        <Button variant="ghost" onClick={() => handleMinus(ele)}>
                                            -
                                        </Button>
                                        <p>{ele.qty}</p>
                                        <Button variant="ghost" onClick={() => handlePlus(ele)}>
                                            +
                                        </Button>
                                    </div>
                                    <Button
                                        className="text-white hover:bg-pink-200"
                                        onClick={() => deleteDataFromCart(ele)}
                                    >
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No items in the cart.</p>
                    )}
                </div>
                <div className="mb-2">
                    <p className="align-middle">
                        Total Price:{" "}
                        <span className="bg-black text-white px-4 py-1 rounded-lg">
                            ₹{totalBill}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

import React, { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Menu } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useUserStore from "@/store/userStore";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access global state from Zustand stores
    const { cart } = useCartStore();
    const { currentUser, logoutUser } = useUserStore((state) => state);

    const cartLength = cart.length;

    // Check if the link is active
    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    // Logout handler
    const handleLogout = useCallback(() => {
        logoutUser(); // Call store action to logout the user
        navigate("/login"); // Redirect to login page after logout
    }, [logoutUser, navigate]);

    // Render Cart Button
    const renderCartButton = useCallback(
        () => (
            <div className="relative">
                {cartLength > 0 && (
                    <span className="absolute bg-red-600 rounded-full text-center w-5 h-5 text-sm text-black right-0">
                        {cartLength}
                    </span>
                )}
                <Link to="/cart">
                    <Button variant="ghost" className="cursor-pointer">
                        <BsFillCartCheckFill size={20} />
                    </Button>
                </Link>
            </div>
        ),
        [cartLength]
    );

    // Render Auth Button (Login/Logout)
    const renderAuthButton = useCallback(() => {
        if (currentUser) {
            return <Button onClick={handleLogout}>Logout</Button>;
        }
        return (
            <>
                <Link to="/login">
                    <Button className="bg-red-400 hover:bg-gray-200 cursor-pointer text-black">
                        Login
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button className="bg-green-400 hover:bg-gray-200 cursor-pointer text-black ml-2">
                        Sign Up
                    </Button>
                </Link>
            </>
        );
    }, [currentUser, handleLogout]);

    // Render the navigation links conditionally based on whether the user is logged in
    const renderNavLinks = useCallback(() => {
        if (currentUser) {
            return (
                <>
                    <Link
                        to="/"
                        className={`${
                            isActive("/") ? "text-red-500" : "text-foreground hover:text-food-red"
                        } font-medium transition-colors`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/foods"
                        className={`${
                            isActive("/foods")
                                ? "text-red-500"
                                : "text-foreground hover:text-food-red"
                        } font-medium transition-colors`}
                    >
                        Foods
                    </Link>
                    <Link
                        to="/categories"
                        className={`${
                            isActive("/categories")
                                ? "text-red-500"
                                : "text-foreground hover:text-food-red"
                        } font-medium transition-colors`}
                    >
                        Categories
                    </Link>
                    <Link
                        to="/cart"
                        className={`${
                            isActive("/cart")
                                ? "text-red-500"
                                : "text-foreground hover:text-food-red"
                        } font-medium transition-colors py-2`}
                    >
                        Cart
                    </Link>
                </>
            );
        } else {
            return null; // Don't render navigation links if the user is not logged in
        }
    }, [currentUser, isActive]);

    return (
        <div className="mx-2">
            <nav className="bg-white sticky top-0 z-50 shadow-sm">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center">
                                <span className="text-2xl font-serif font-bold text-food-red">
                                    Tasty<span className="text-food-teal">Bites</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {renderNavLinks()}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {currentUser && renderCartButton()}
                            {renderAuthButton()}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu size={24} />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-4">{renderNavLinks()}</div>

                        <div className="flex items-center space-x-4 mt-4">
                            {currentUser && renderCartButton()}
                            {renderAuthButton()}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default React.memo(Navbar);
